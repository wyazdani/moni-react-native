import type { From } from "@/layouts/app-layout";
import { BlurView } from "expo-blur";
import React, { FC } from "react";
import { Image, Platform, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackButton from "./back-button";

interface Props {
  title?: string;
  from?: From;
}

const Header: FC<Props> = ({ title, from }) => {
  const { top, right, left } = useSafeAreaInsets();

  return (
    <BlurView
      intensity={Platform.select({ android: 100, ios: 50 })}
      className={`w-full absolute z-10 flex-row items-center bg-white px-5 pb-2 ${
        from == "chat" ? "justify-between" : "justify-start"
      }`}
      style={{
        paddingTop: top || 8,
        paddingLeft: Math.max(left, right) || 20,
        paddingRight: Math.max(left, right) || 20,
      }}
    >
      {from != "login" && <BackButton />}
      {title && (
        <Text className="text-black text-base font-poppins-semibold ml-4">
          {title}
        </Text>
      )}
      {from == "chat" && (
        <>
          <Image
            source={require("../assets/images/logo.png")}
            className="h-8 w-20"
            resizeMode="contain"
          />
          <View className="w-9" />
        </>
      )}
    </BlurView>
  );
};

export default Header;
