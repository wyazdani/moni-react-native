import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const SocialLoginBtns = () => {
  return (
    <View>
      <View className="flex-row items-center my-8">
        <View className="flex-1 h-px bg-border" />
        <Text className="font-inter-medium text-gray text-sm mx-5">
          Or login with
        </Text>
        <View className="flex-1 h-px bg-border" />
      </View>
      <View className="gap-5 flex-row justify-center items-center">
        <TouchableOpacity className="w-12 aspect-square bg-[rgba(122,122,122,0.15)] p-3 rounded-2xl">
          <Image
            source={require("../assets/icons/google.png")}
            resizeMode="contain"
            className="h-full w-full"
          />
        </TouchableOpacity>
        <TouchableOpacity className="w-12 aspect-square bg-[rgba(122,122,122,0.15)] p-3 rounded-2xl">
          <Image
            source={require("../assets/icons/facebook.png")}
            resizeMode="contain"
            className="h-full w-full"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SocialLoginBtns;
