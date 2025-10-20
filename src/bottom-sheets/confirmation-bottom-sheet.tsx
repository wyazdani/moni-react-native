import { BOTTOM_TAB_HEIGHT } from "@/app/(protected-routes)/tabs/_layout";
import CustomButton from "@/components/custom-button";
import { COLORS } from "@/constants/styles";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { FC, RefObject, useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  ref: RefObject<BottomSheet | null>;
  title: string;
  description: string;
  isBottomTabScreen?: boolean;
  onSubmit: () => void;
}

const ConfirmationBottomSheet: FC<Props> = ({
  ref,
  title,
  description,
  isBottomTabScreen,
  onSubmit,
}) => {
  const { bottom } = useSafeAreaInsets();

  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop {...props} />,
    []
  );

  const handleClose = () => {
    ref?.current?.close();
  };

  const handleSubmit = () => {
    handleClose();
    onSubmit();
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
        <Text className="font-inter-regular text-base text-gray mt-7">
          {description}
        </Text>
        <View
          className="flex-row gap-5 mt-5"
          style={{
            marginBottom:
              (isBottomTabScreen ? BOTTOM_TAB_HEIGHT : 0) + 20 + bottom,
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

export default ConfirmationBottomSheet;
