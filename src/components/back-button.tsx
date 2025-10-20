import { COLORS } from "@/constants/styles";
import { From } from "@/layouts/app-layout";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { FC } from "react";
import { Keyboard, Platform, TouchableOpacity } from "react-native";

interface Props {
  from?: From;
}

const BackButton: FC<Props> = ({ from }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      className={`w-9 aspect-square rounded-full z-10 bg-white ${Platform.select({
        android: "shadow-lg shadow-gray",
        ios: "shadow",
      })} justify-center items-center`}
      onPress={() => {
        if (from == "chat") {
          Keyboard.isVisible() && Keyboard.dismiss();
          setTimeout(() => {
            router.canGoBack() && router.back();
          }, 300);
        } else router.canGoBack() && router.back();
      }}
      activeOpacity={0.8}
    >
      <MaterialIcons name="chevron-left" size={25} color={COLORS.black} />
    </TouchableOpacity>
  );
};

export default BackButton;
