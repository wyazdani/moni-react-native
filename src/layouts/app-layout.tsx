import BackButton from "@/components/back-button";
import { router } from "expo-router";
import React, { FC, ReactNode } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const { top, bottom } = useSafeAreaInsets();

  return (
    <KeyboardAwareScrollView
      className="bg-white"
      contentContainerClassName="grow p-5"
      style={{ paddingTop: top, paddingBottom: bottom }}
    >
      {backBtn && <BackButton />}
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
      <View className="grow">{children}</View>
      <View className="flex-row justify-center gap-4 mt-4">
        <TouchableOpacity hitSlop={5}>
          <Text className="font-inter-medium text-gray text-sm">
            Terms of use
          </Text>
        </TouchableOpacity>
        <View className="w-px h-full bg-gray" />
        <TouchableOpacity hitSlop={5}>
          <Text className="font-inter-medium text-gray text-sm">
            Privacy policy
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default AppLayout;
