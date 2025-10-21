import CustomButton from "@/components/custom-button";
import { COUNTRIES } from "@/constants";
import { COLORS } from "@/constants/styles";
import AppLayout from "@/layouts/app-layout";
import { useAppSelector } from "@/redux/store";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { FC } from "react";
import { Image, Text, View } from "react-native";

interface InfoFieldProps {
  title: string;
  value: string;
  isEmail?: boolean;
}

const InfoField: FC<InfoFieldProps> = ({ title, value, isEmail }) => {
  return (
    <View
      className={
        "flex-row justify-between items-center py-4 border-b border-border"
      }
    >
      <Text className="font-poppins-medium text-base text-black capitalize">
        {title}
      </Text>
      <Text
        className={`font-inter-regular text-base text-gray ${
          isEmail ? "" : "capitalize"
        }`}
      >
        {value}
      </Text>
    </View>
  );
};

export default function Profile() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    user && (
      <AppLayout title="General Information">
        {/* Profile Section */}
        <View className="items-center">
          {/* Profile Picture */}
          <View className="bg-primary rounded-full border-4 border-[white]">
            <Image
              source={require("@/assets/images/dummy-profile.jpg")}
              className="w-24 h-24 rounded-full"
            />
          </View>

          {/* Name */}
          <Text className="font-poppins-semibold text-lg text-black mt-4">
            {`${user.first_name} ${user.last_name}`.trim()}
          </Text>

          {/* Premium Status */}
          <Text className="font-inter-regular text-sm text-gray text-center">
            278 days until the end of the premium account
          </Text>

          {/* Premium Account Button */}
          <LinearGradient
            colors={[COLORS.secondary, COLORS.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="px-6 py-2 rounded-full flex-row items-center mt-4"
          >
            <Image
              source={require("@/assets/icons/gem.png")}
              className="h-4 w-4"
              resizeMode="contain"
            />
            <Text className="font-poppins-semibold text-sm text-white ml-2">
              Premium Account
            </Text>
          </LinearGradient>
        </View>

        {/* Information Fields */}
        <View className="mt-6">
          <InfoField title="First Name" value={user.first_name || "N/A"} />
          <InfoField title="Last Name" value={user.last_name || "N/A"} />
          <InfoField title="Email" value={user.email || "N/A"} isEmail />
          <InfoField
            title="Country"
            value={
              COUNTRIES.find((country) => country.code == user.country)?.name ||
              "N/A"
            }
          />
          <InfoField title="State" value={user.state || "N/A"} />
        </View>

        <CustomButton
          title="Edit"
          className="mt-10"
          onPress={() => router.push("/(protected-routes)/edit-profile")}
        />
      </AppLayout>
    )
  );
}
