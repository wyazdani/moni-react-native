import "@/styles/global.scss";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  useFonts({
    InterRegular: require("@/assets/fonts/Inter-Regular.ttf"),
    InterMedium: require("@/assets/fonts/Inter-Medium.ttf"),
    InterItalic: require("@/assets/fonts/Inter-Italic.ttf"),
    PoppinsMedium: require("@/assets/fonts/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("@/assets/fonts/Poppins-SemiBold.ttf"),
  });

  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <StatusBar style="auto" />
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}
