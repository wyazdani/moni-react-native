import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { FC } from "react";
import { TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {}

const BackButton: FC<Props> = ({}) => {
  const { top } = useSafeAreaInsets();
  const router = useRouter();

  return (
    <TouchableOpacity
      className={`w-10 aspect-square absolute left-5 z-10 rounded-full bg-white shadow-lg shadow-gray justify-center items-center `}
      style={{ top: top + 10 }}
      onPress={() => router.canGoBack() && router.back()}
      activeOpacity={0.8}
    >
      <MaterialIcons
        name="chevron-left"
        size={25}
        color={"rgba(47, 47, 47, 1)"}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
