import { COLORS } from "@/constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  text: string;
  onPress: (text: string) => void;
}

const SuggestionMessage: FC<Props> = ({ text, onPress }) => {
  return (
    <TouchableOpacity
      className="max-w-[90%] rounded-full self-end mx-5"
      onPress={() => onPress(text)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[COLORS.secondary, COLORS.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="p-[1] rounded-full items-center justify-center overflow-hidden"
      >
        <View className="bg-white rounded-full px-6 py-2 overflow-hidden">
          <Text className="font-inter-medium text-sm text-gray">{text}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default SuggestionMessage;
