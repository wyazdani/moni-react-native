import BackButton from "@/components/back-button";
import { router } from "expo-router";
import React, { FC, ReactNode } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
type From = "login" | "signup";

interface Props {
  children: ReactNode;
  from?: From;
  title?: string;
  heading?: string;
  subHeading?: string;
  backBtn?: boolean;
}

const AppLayout: FC<Props> = ({
  children,
  from,
  title,
  heading,
  subHeading,
  backBtn = true,
}) => {
  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      {backBtn && <BackButton />}
      <KeyboardAwareScrollView className="grow">
        {title && <Text>{title}</Text>}
        {from == "login" && (
          <Image
            source={require("../assets/images/logo.png")}
            className="w-32 h-14 mt-4"
            resizeMode="contain"
          />
        )}
        {heading && (
          <Text className={"text-black text-3xl font-poppins-semibold mt-7"}>
            {heading}
          </Text>
        )}
        {subHeading && (
          <View className="flex-row items-center mt-2">
            <Text className={"text-gray text-base font-inter-medium "}>
              {subHeading}{" "}
            </Text>
            <TouchableOpacity
              hitSlop={5}
              onPress={() =>
                from == "signup" ? router.back() : router.push("/auth/signup")
              }
            >
              <Text
                className="text-primary text-base font-inter-medium"
                onPress={() =>
                  from == "signup" ? router.back() : router.push("/auth/signup")
                }
              >
                {from == "signup" ? "Login" : "Sign up"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AppLayout;
