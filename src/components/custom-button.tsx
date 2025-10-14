import { COLORS } from "@/constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import { cssInterop } from "nativewind";
import React, { FC } from "react";
import {
  ActivityIndicator,
  ColorValue,
  Text,
  TouchableOpacity,
} from "react-native";

const CustomizedLinearGradient = cssInterop(LinearGradient, {
  className: "style",
});

interface Props {
  title: string;
  onPress?: () => void;
  className?: string;
  loader?: boolean;
  linearGradientColors?: [ColorValue, ColorValue, ...ColorValue[]];
}

const CustomButton: FC<Props> = ({
  title,
  onPress,
  className,
  loader,
  linearGradientColors,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className={className}
      onPress={onPress}
    >
      <CustomizedLinearGradient
        colors={linearGradientColors || [COLORS.secondary, COLORS.primary]}
        className={
          "h-12 rounded-2xl justify-center items-center overflow-hidden"
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        {loader ? (
          <ActivityIndicator color={"white"} size={"small"} />
        ) : (
          <Text className="text-[white] text-base font-inter-medium">
            {title}
          </Text>
        )}
      </CustomizedLinearGradient>
    </TouchableOpacity>
  );
};

export default CustomButton;
