import { BOTTOM_TAB_HEIGHT } from "@/app/(protected-routes)/tabs/_layout";
import CustomButton from "@/components/custom-button";
import CustomInput from "@/components/custom-input";
import { COLORS } from "@/constants/styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { FC, RefObject, useCallback, useState } from "react";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { useKeyboardState } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  ref: RefObject<BottomSheet | null>;
  title: string;
  isBottomTabScreen?: boolean;
  onSubmit: (value: number) => void;
}

const EntryBottomSheet: FC<Props> = ({
  ref,
  title,
  isBottomTabScreen,
  onSubmit,
}) => {
  const [value, setValue] = useState<string>("");
  const keyboardState = useKeyboardState();
  const { bottom } = useSafeAreaInsets();

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        onPress={() => {
          Keyboard.dismiss();
        }}
      />
    ),
    []
  );

  const handleClose = () => {
    Keyboard.isVisible() && Keyboard.dismiss();
    ref?.current?.close();
  };

  const handleSubmit = () => {
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      onSubmit(numericValue);
      setValue("");
      handleClose();
    }
  };

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={[1]}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView className="flex-1 px-5">
        <View className="flex-row justify-between items-center mt-5">
          <View className="w-[25]" />
          <Text className="font-poppins-semibold text-base text-black">
            {title}
          </Text>
          <TouchableOpacity onPress={handleClose}>
            <MaterialIcons name="close" size={25} />
          </TouchableOpacity>
        </View>
        <CustomInput
          value={value}
          onChangeText={setValue}
          className="mt-7"
          placeholder="Enter Amount"
          keyboardType="numeric"
        />
        <View
          className="flex-row gap-5 mt-5"
          style={{
            marginBottom: keyboardState.isVisible
              ? keyboardState.height + 40
              : (isBottomTabScreen ? BOTTOM_TAB_HEIGHT : 0) + 20 + bottom,
          }}
        >
          <CustomButton
            title="Cancel"
            className="flex-1"
            linearGradientColors={[COLORS.border, COLORS.border]}
            textClassName="text-black"
            onPress={handleClose}
          />
          <CustomButton
            title="Confirm"
            className="flex-1"
            onPress={handleSubmit}
          />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default EntryBottomSheet;
