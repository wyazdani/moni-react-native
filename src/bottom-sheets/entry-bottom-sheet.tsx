import { BOTTOM_TAB_HEIGHT } from "@/app/(protected-routes)/tabs/_layout";
import CustomButton from "@/components/custom-button";
import CustomInput from "@/components/custom-input";
import { COLORS } from "@/constants/styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useFormik } from "formik";
import React, { FC, RefObject, useCallback } from "react";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { useKeyboardState } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Yup from "yup";

interface Props {
  ref: RefObject<BottomSheet | null>;
  title: string;
  isBottomTabScreen?: boolean;
  amount?: number;
  onSubmit: (value: string) => void;
}

type Values = {
  amount: string;
};

const EntryBottomSheet: FC<Props> = ({
  ref,
  title,
  isBottomTabScreen,
  amount,
  onSubmit,
}) => {
  const keyboardState = useKeyboardState();
  const { bottom } = useSafeAreaInsets();

  const handleClose = () => {
    Keyboard.isVisible() && Keyboard.dismiss();
    ref?.current?.close();
  };

  const handleConfirm = (values: Values) => {
    onSubmit(values.amount);
    handleClose();
  };

  let ValidationSchema = Yup.object().shape({
    amount: Yup.number().required("Amount Required"),
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    resetForm,
  } = useFormik<Values>({
    initialValues: {
      amount: amount?.toString() || "",
    },
    validationSchema: ValidationSchema,
    onSubmit: handleConfirm,
    enableReinitialize: true,
  });

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

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={[1]}
      backdropComponent={renderBackdrop}
      onChange={(index) => {
        if (index === -1) {
          resetForm();
        }
      }}
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
          value={values.amount}
          onChangeText={handleChange("amount")}
          onBlur={handleBlur("amount")}
          className="mt-7"
          placeholder="Enter Amount"
          keyboardType="numeric"
          error={touched.amount && errors.amount}
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
