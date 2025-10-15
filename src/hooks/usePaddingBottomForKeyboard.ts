import { useEffect, useState } from "react";
import { Keyboard, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const usePaddingBottomForKeyboard = (
  baseValue: number = 0,
) => {
  const { bottom } = useSafeAreaInsets();
  const [spaceBottom, setSpaceBottom] = useState(bottom + baseValue);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS == "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => {
        setSpaceBottom(baseValue);
      }
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS == "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setSpaceBottom(bottom + baseValue);
      }
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return spaceBottom;
};
