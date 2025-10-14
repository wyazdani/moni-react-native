import { COLORS } from "@/constants/styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React from "react";
import { Platform, TouchableOpacity } from "react-native";

const BackButton = ({}) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      className={`w-9 aspect-square rounded-full bg-white ${Platform.select({
        android: "shadow-lg shadow-gray",
        ios: "shadow",
      })} justify-center items-center`}
      onPress={() => router.canGoBack() && router.back()}
      activeOpacity={0.8}
    >
      <MaterialIcons name="chevron-left" size={25} color={COLORS.black} />
    </TouchableOpacity>
  );
};

export default BackButton;
