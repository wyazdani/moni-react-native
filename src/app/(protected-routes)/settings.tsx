import CustomButton from "@/components/custom-button";
import { COLORS } from "@/constants/styles";
import AppLayout from "@/layouts/app-layout";
import { router } from "expo-router";
import React, { FC, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import ToggleSwitch from "toggle-switch-react-native";

interface SettingItemProps {
  title: string;
  type: "navigation" | "premium" | "toggle";
  onPress?: () => void;
  toggleValue?: boolean;
  onToggleChange?: (value: boolean) => void;
}

const SettingItem: FC<SettingItemProps> = ({
  title,
  type,
  onPress,
  toggleValue = false,
  onToggleChange,
}) => {
  const renderRightContent = () => {
    switch (type) {
      case "navigation":
        return (
          <Image
            source={require("../../assets/icons/arrow-up-right.png")}
            className="w-4 h-4"
            resizeMode="contain"
          />
        );
      case "premium":
        return (
          <View className="bg-gray px-3 py-1 rounded-full">
            <Text className="font-poppins-semibold text-sm text-white">
              Premium
            </Text>
          </View>
        );
      case "toggle":
        return (
          <ToggleSwitch
            isOn={toggleValue}
            onColor={COLORS.primary}
            offColor={COLORS.border}
            onToggle={onToggleChange}
            size="small"
          />
        );
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      className="flex-row justify-between items-center py-4 border-b border-border"
      onPress={onPress}
      activeOpacity={type === "navigation" ? 0.6 : 1}
    >
      <Text className="font-inter-semibold text-base text-black">{title}</Text>
      {renderRightContent()}
    </TouchableOpacity>
  );
};

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logout pressed");
  };

  return (
    <AppLayout
      title="Profile & Settings"
      footerClassName="flex-row justify-center gap-4 mt-5"
    >
      {/* Settings Options */}
      <View className="flex-1 pb-5">
        <SettingItem
          title="General Information"
          type="navigation"
          onPress={() => router.push("/tabs/profile")}
        />
        <SettingItem
          title="Subscription"
          type="premium"
          onPress={() => router.push("/subscription")}
        />
        <SettingItem
          title="Change Password"
          type="navigation"
          onPress={() => router.push("/change-password")}
        />
        <SettingItem
          title="Notifications"
          type="toggle"
          toggleValue={notificationsEnabled}
          onToggleChange={setNotificationsEnabled}
        />
      </View>

      {/* Logout Button */}
      <CustomButton
        title="Logout"
        linearGradientColors={[COLORS.error, COLORS.error]}
        onPress={handleLogout}
      />

      <Text className="font-inter-medium text-sm text-gray mt-5 text-center">
        Version 2.01.12
      </Text>
    </AppLayout>
  );
};

export default Settings;
