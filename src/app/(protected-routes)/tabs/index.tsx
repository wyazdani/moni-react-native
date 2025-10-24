import EntryBottomSheet from "@/bottom-sheets/entry-bottom-sheet";
import { COLORS } from "@/constants/styles";
import { useAppSelector } from "@/redux/store";
import { formatAmount } from "@/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomSheet from "@gorhom/bottom-sheet";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { FC, useLayoutEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PieChart } from "react-native-gifted-charts";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface RenderAmountProps {
  amount: number;
  color?: string;
  className?: string;
  textClassName?: string;
  amountClassName?: string;
}

const RenderAmount: FC<RenderAmountProps> = ({
  amount,
  color,
  className,
  textClassName,
  amountClassName,
}) => {
  const [bd, ad] = formatAmount(amount).split(".");
  const commonClassName = "font-poppins-medium text-base mb-1";

  return (
    <View className={`flex-row items-end ${className}`}>
      <Text
        className={`${textClassName || commonClassName}`}
        style={{ color: color || COLORS.primary }}
      >
        €
      </Text>
      <Text
        className={`${
          textClassName || "font-poppins-semibold text-lg"
        } ${amountClassName}`}
        style={{ color: color || COLORS.primary }}
      >
        {bd}
      </Text>
      <Text
        className={`${textClassName || commonClassName}`}
        style={{ color: color || COLORS.primary }}
      >
        .{ad}
      </Text>
    </View>
  );
};

const HomeHeader = () => {
  const { user } = useAppSelector((state) => state.auth);
  console.log("user home header: ", user);
  return (
    <View className="flex-row justify-between items-center mt-4">
      <Pressable
        className="flex-1 flex-row items-center"
        onPress={() => router.push("/settings")}
      >
        <Image
          source={
            user.profile_image
              ? { uri: user.profile_image }
              : require("@/assets/images/dummy-profile.jpg")
          }
          className="w-12 h-12 rounded-full border-2 border-white"
        />
        <View className="flex-1 mx-2">
          <Text
            className="font-inter-medium text-sm text-[white]"
            numberOfLines={1}
          >
            Hey, Welcome Back
          </Text>
          <Text
            className="font-poppins-semibold text-base text-[white]"
            numberOfLines={2}
          >
            {`${user.first_name} ${user.last_name}`.trim()}
          </Text>
        </View>
      </Pressable>

      <TouchableOpacity
        className="bg-[rgba(255,255,255,0.2)] p-2 rounded-full"
        onPress={() => router.push("/notifications")}
      >
        <Ionicons name="notifications-outline" size={22} color={"white"} />
      </TouchableOpacity>
    </View>
  );
};

const SpendingCard = () => {
  return (
    <View className="bg-white rounded-2xl p-4 mt-6 shadow-lg">
      {/* Header */}
      <Text className="font-inter-medium text-base text-black">Spending</Text>

      {/* Date Range */}
      <Text className="font-inter-regular text-sm text-gray mt-1">
        August 1 - August 30
      </Text>

      {/* Amount */}
      <RenderAmount amount={6408} className="mt-4" amountClassName="text-xl" />

      {/* Budget Info */}
      <View className="flex-row items-end">
        <Text className="font-inter-regular text-sm text-gray">Left of</Text>
        <RenderAmount
          amount={10000}
          color={COLORS.gray}
          className="ml-1"
          textClassName="font-inter-regular text-sm mb-0"
          amountClassName="font-inter-semibold"
        />
      </View>
      {/* Progress Bar */}
      <View className="bg-border rounded-full h-3 mt-3">
        <LinearGradient
          colors={["#00FFFF", "#9B00FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="h-full rounded-full"
          style={{ width: "64%" }}
        />
      </View>

      {/* Days Left */}
      <Text className="font-inter-regular text-sm text-gray text-center mt-3">
        10 days left
      </Text>
    </View>
  );
};

interface SmallCardProps {
  title: string;
  amount: number;
  onPress: () => void;
}

const SmallCard: FC<SmallCardProps> = ({ title, amount, onPress }) => {
  return (
    <Pressable
      className="bg-white rounded-2xl p-4 shadow-lg flex-1"
      onPress={onPress}
    >
      {/* Amount */}
      <RenderAmount amount={amount} />

      <View className="flex-row">
        <Text className="font-inter-medium text-sm text-gray flex-1">
          {title}
        </Text>
        <Image
          source={require("../../../assets/icons/arrow-up-right.png")}
          resizeMode="contain"
          className="w-4 h-4"
        />
      </View>
    </Pressable>
  );
};

const PIE_CHART_DATA = [
  {
    name: "Food",
    value: 20,
    color: "rgba(0, 255, 255, 1)",
  },
  {
    name: "Transport",
    value: 35,
    color: "rgba(155, 0, 255, 1)",
  },
  {
    name: "Entertainment",
    value: 45,
    color: "rgba(251, 188, 5, 1)",
  },
];
const MENU_ITEMS = ["Weekly", "Monthly", "Yearly"];

const InsightCard = () => {
  const [selectMenu, setSelectedMenu] = useState(MENU_ITEMS[0]);

  return (
    <View className="bg-white rounded-2xl p-4 pt-3 mt-5 shadow-lg">
      {/* Header */}
      <View className="flex-row justify-between items-center gap-5 pb-3 border-b border-border">
        <Text className="font-inter-medium text-base text-black">Insight</Text>
        <Menu>
          <MenuTrigger>
            <View className="border border-border rounded-full px-3 py-1 flex-row items-center">
              <Text className="font-inter-medium text-sm text-gray mr-1">
                {selectMenu}
              </Text>
              <Ionicons name="chevron-down" size={14} color="#6B7280" />
            </View>
          </MenuTrigger>

          <MenuOptions
            optionsContainerStyle={{
              marginTop: 30,
              borderRadius: 10,
              padding: 5,
              width: 150,
            }}
          >
            {MENU_ITEMS.map((item, index) => (
              <MenuOption key={index} onSelect={() => setSelectedMenu(item)}>
                <Text className="font-inter-medium text-sm text-gray">
                  {item}
                </Text>
              </MenuOption>
            ))}
          </MenuOptions>
        </Menu>
      </View>

      {/* Donut Chart */}
      <View className="items-center my-2">
        <PieChart
          data={PIE_CHART_DATA}
          donut
          strokeWidth={4}
          radius={80}
          strokeColor="white"
          innerRadius={50}
        />
      </View>

      {/* Legend */}
      <View className="flex-row pt-4 justify-center gap-5 border-t border-border">
        {PIE_CHART_DATA.map((item, index) => (
          <View key={index} className="flex-row items-center">
            <View
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <Text className="font-inter-medium text-sm text-gray-700 ml-1">
              {item.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const [bounces, setBounces] = useState(false);
  const incomeBottomSheetRef = useRef<BottomSheet>(null);
  const expenseBottomSheetRef = useRef<BottomSheet>(null);
  const [income, setIncome] = useState(7500);
  const [expense, setExpense] = useState(9800);
  const { top, left, right } = useSafeAreaInsets();
  const bottomTabBarHeight = useBottomTabBarHeight();
  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    if (isFocused) StatusBar.setBarStyle("light-content");
    else StatusBar.setBarStyle("dark-content");
  }, [isFocused]);

  return (
    <LinearGradient
      colors={[COLORS.secondary, COLORS.primary]}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
      className="flex-1 "
    >
      {/* background Image */}
      <Image
        source={require("../../../assets/images/bg-home.png")}
        className="w-full h-full"
        style={StyleSheet.absoluteFill}
      />
      <ScrollView
        contentContainerClassName="grow"
        contentContainerStyle={{
          paddingTop: top,
          paddingLeft: Math.max(right, left) || 20,
          paddingRight: Math.max(right, left) || 20,
          paddingBottom: bottomTabBarHeight + 60,
        }}
        showsVerticalScrollIndicator={false}
        bounces={bounces}
        onContentSizeChange={(_, contentHeight) => {
          // Enable bounce only when content exceeds screen height
          const windowHeight = Dimensions.get("window").height;
          setBounces(contentHeight > windowHeight);
        }}
      >
        <HomeHeader />
        <SpendingCard />
        <View className="flex-row gap-5 mt-5">
          <SmallCard
            title="Income"
            amount={income}
            onPress={() => incomeBottomSheetRef.current?.expand()}
          />
          <SmallCard
            title="Expense"
            amount={expense}
            onPress={() => expenseBottomSheetRef.current?.expand()}
          />
        </View>
        <InsightCard />
      </ScrollView>
      <EntryBottomSheet
        ref={incomeBottomSheetRef}
        title="Income"
        isBottomTabScreen={true}
        onSubmit={(value: number) => setIncome(value)}
      />
      <EntryBottomSheet
        ref={expenseBottomSheetRef}
        title="Expense"
        isBottomTabScreen={true}
        onSubmit={(value: number) => setExpense(value)}
      />
    </LinearGradient>
  );
}
