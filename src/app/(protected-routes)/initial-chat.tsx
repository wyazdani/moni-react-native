import CustomButton from "@/components/custom-button";
import { COLORS } from "@/constants/styles";
import AppLayout from "@/layouts/app-layout";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { FC, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-simple-toast";

interface GoalButtonProps {
  title: string;
  isSelected: boolean;
  onPress: () => void;
}

const GoalButton: FC<GoalButtonProps> = ({ title, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      className="rounded-full"
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[COLORS.secondary, COLORS.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="p-[1] rounded-full items-center justify-center overflow-hidden"
      >
        <View
          className={`${
            isSelected ? "bg-transparent" : "bg-white"
          } rounded-full px-6 py-2 overflow-hidden`}
        >
          <Text
            className={`font-inter-medium text-sm ${
              isSelected ? "text-white" : "text-black"
            }`}
          >
            {title}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const goals = [
  { title: "Chat with Moni", value: "chat" },
  { title: "Budget Better", value: "budget" },
  { title: "Just Browsing", value: "browsing" },
  { title: "Boost my savings", value: "savings" },
];

const InitialChat = () => {
  const [selectedGoal, setSelectedGoal] = useState<string>("");

  const handleContinue = () => {
    if (selectedGoal) router.push("/tabs/chat");
    else Toast.show("Please select option", Toast.SHORT);
  };

  return (
    <AppLayout heading="What's your goal today?">
      {/* Goal Selection Grid */}
      <View className="flex-row justify-center gap-4 flex-wrap mt-8">
        {goals.map((item, index) => (
          <GoalButton
            key={index}
            title={item.title}
            isSelected={selectedGoal === item.value}
            onPress={() => setSelectedGoal(item.value)}
          />
        ))}
      </View>
      <CustomButton
        title={"Continue"}
        className="mt-10"
        onPress={handleContinue}
      />
    </AppLayout>
  );
};

export default InitialChat;
