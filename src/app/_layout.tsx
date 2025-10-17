import { persistor, store } from "@/redux/store";
import "@/styles/global.scss";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { MenuProvider } from "react-native-popup-menu";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function RootLayout() {
  useFonts({
    InterRegular: require("@/assets/fonts/Inter-Regular.ttf"),
    InterMedium: require("@/assets/fonts/Inter-Medium.ttf"),
    InterSemiBold: require("@/assets/fonts/Inter-SemiBold.ttf"),
    InterItalic: require("@/assets/fonts/Inter-Italic.ttf"),
    PoppinsMedium: require("@/assets/fonts/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("@/assets/fonts/Poppins-SemiBold.ttf"),
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <KeyboardProvider>
            <MenuProvider>
              <Stack screenOptions={{ headerShown: false }} />
              <StatusBar style="dark" />
            </MenuProvider>
          </KeyboardProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
