import { COLORS } from "@/constants/styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { FC } from "react";
import { Platform, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {}

const BackButton: FC<Props> = ({}) => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();

  return (
    <TouchableOpacity
      className={`w-9 aspect-square absolute left-5 z-10 rounded-full bg-white ${Platform.select(
        { android: "shadow-lg shadow-gray", ios: "shadow" }
      )} justify-center items-center lg:translate-y-2 `}
      style={{ top }}
      onPress={() => router.canGoBack() && router.back()}
      activeOpacity={0.8}
    >
      <MaterialIcons name="chevron-left" size={25} color={COLORS.black} />
    </TouchableOpacity>
  );
};

export default BackButton;
