import { LinearGradient } from "expo-linear-gradient";
import { cssInterop } from "nativewind";
import React, { FC } from "react";
import { Text } from "react-native";

cssInterop(LinearGradient, {
  className: "style",
});

interface Props {
  title: string;
  className?: string;
}

const CustomButton: FC<Props> = ({ title, className }) => {
  return (
    <LinearGradient
      colors={["rgba(155, 0, 255, 1)", "rgba(0, 255, 255, 1)"]}
      className={`h-14 rounded-2xl justify-center items-center overflow-hidden ${
        className || ""
      }`}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <Text className="text-[white] text-lg font-inter-medium">{title}</Text>
    </LinearGradient>
  );
};

export default CustomButton;
