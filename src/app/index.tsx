import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, Image, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Splash() {
  const translateX1 = useSharedValue(0);
  const translateX2 = useSharedValue(0);
  const translateX3 = useSharedValue(0);
  const router = useRouter();
  const { width, height } = Dimensions.get("screen");

  React.useEffect(() => {
    // Third dot
    translateX3.value = withTiming(Math.max(width, height)/1.6, {
      duration: 2500,
      easing: Easing.out(Easing.exp),
    });

    // Second dot (delayed)
    setTimeout(() => {
      translateX2.value = withTiming(Math.max(width, height)/1.6, {
        duration: 2500,
        easing: Easing.out(Easing.exp),
      });
    }, 500);

    // Third dot (delayed more)
    setTimeout(() => {
      translateX1.value = withTiming(Math.max(width, height)/1.6, {
        duration: 2500,
        easing: Easing.out(Easing.exp),
      });
    }, 1000);

    // navigate
    setTimeout(() => {
      router.replace("/tabs");
    }, 1600);
  }, []);

  const style1 = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX1.value }],
  }));

  const style2 = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX2.value }],
  }));

  const style3 = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX3.value }],
  }));

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <Image
        source={require("@/assets/images/logo.png")}
        className="w-52 h-40"
        resizeMode="contain"
      />
      <View className="flex-row gap-3">
        <Animated.View
          className="w-3 aspect-square bg-primary rounded-full"
          style={style1}
        />
        <Animated.View
          className="w-3 aspect-square bg-primary rounded-full"
          style={style2}
        />
        <Animated.View
          className="w-3 aspect-square bg-primary rounded-full"
          style={style3}
        />
      </View>
    </SafeAreaView>
  );
}
