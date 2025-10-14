import Header from "@/components/header";
import { router } from "expo-router";
import React, { FC, ReactNode } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type From = "login" | "signup" | "chat";

interface Props {
  children: ReactNode;
  from?: From;
  title?: string;
  heading?: string;
  subHeading?: string;
  backBtn?: boolean;
  className?: string;
  footerClassName?: string;
  scrollEnabled?: boolean;
  showFooter?: boolean;
}

const AppLayout: FC<Props> = ({
  children,
  from,
  title,
  heading,
  subHeading,
  className,
  footerClassName,
  scrollEnabled = true,
  showFooter = true,
}) => {
  const { top, bottom, left, right } = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-white">
      <Header title={title} from={from} />
      {from == "chat" ? (
        children
      ) : (
        <KeyboardAwareScrollView
          className="grow"
          contentContainerClassName="grow"
          contentContainerStyle={{
            paddingTop: from == "login" ? top : top + 60,
            paddingLeft: Math.max(right, left) || 20,
            paddingRight: Math.max(right, left) || 20,
            paddingBottom: bottom + 20,
          }}
          keyboardShouldPersistTaps={"handled"}
          bottomOffset={100}
          showsVerticalScrollIndicator={false}
          scrollEnabled={scrollEnabled}
        >
          {from == "login" && (
            <Image
              source={require("../assets/images/logo.png")}
              className="w-28 h-12 mt-8"
              resizeMode="contain"
            />
          )}
          {heading && (
            <Text
              className={`text-black text-lg font-poppins-semibold ${
                from == "login" ? "mt-5" : "mt-0"
              }`}
            >
              {heading}
            </Text>
          )}
          {subHeading && (
            <View className="flex-row items-center mt-1">
              <Text className={"text-gray text-sm font-inter-medium"}>
                {subHeading}{" "}
              </Text>
              {from && ["login", "signup"].includes(from) && (
                <TouchableOpacity
                  hitSlop={5}
                  onPress={() =>
                    from == "signup"
                      ? router.back()
                      : router.push("/auth/signup")
                  }
                >
                  <Text className="text-primary text-sm font-inter-medium">
                    {from == "signup" ? "Login" : "Sign up"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          <View className={`grow ${className}`}>{children}</View>
          {showFooter && (
            <View
              className={
                footerClassName || "flex-row justify-center gap-4 mt-8"
              }
            >
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
          )}
        </KeyboardAwareScrollView>
      )}
    </View>
  );
};

export default AppLayout;
