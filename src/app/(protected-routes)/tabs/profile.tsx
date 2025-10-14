import CustomButton from "@/components/custom-button";
import { COLORS } from "@/constants/styles";
import AppLayout from "@/layouts/app-layout";
import { LinearGradient } from "expo-linear-gradient";
import { FC } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface InfoFieldProps {
  title: string;
  value: string;
}

const InfoField: FC<InfoFieldProps> = ({ title, value }) => {
  return (
    <View
      className={
        "flex-row justify-between items-center py-4 border-b border-border"
      }
    >
      <Text className="font-poppins-medium text-base text-black">{title}</Text>
      <Text className="font-inter-regular text-base text-gray">{value}</Text>
    </View>
  );
};

export default function Profile() {
  return (
    <AppLayout title="General Information">
      {/* Profile Section */}
      <View className="items-center">
        {/* Profile Picture */}
        <View className="bg-primary rounded-full">
          <Image
            source={require("../../../assets/images/temp/profile.png")}
            className="w-28 h-28 rounded-full border-4 border-[white]"
          />
          {/* Edit Icon */}
          <TouchableOpacity
            activeOpacity={0.6}
            className="absolute bottom-2 right-2 rounded-full"
          >
            <LinearGradient
              colors={[COLORS.secondary, COLORS.primary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="w-8 h-8 rounded-full items-center justify-center border-2 border-white"
            >
              <Image
                source={require("../../../assets/icons/pen.png")}
                className="h-4 w-4"
                resizeMode="contain"
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Name */}
        <Text className="font-poppins-semibold text-lg text-black mt-4">
          John Doe
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
            source={require("../../../assets/icons/gem.png")}
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
        <InfoField title="First Name" value="John" />
        <InfoField title="Last Name" value="Doe" />
        <InfoField title="Email" value="johndoe@gmail.com" />
        <InfoField title="Country" value="Belgium" />
        <InfoField title="State" value="Flemish" />
      </View>

      <CustomButton title="Save" className="mt-10" />
    </AppLayout>
  );
}
