import { COLORS } from "@/constants/styles";
import { hp } from "@/utils";
import { cssInterop } from "nativewind";
import React, { FC } from "react";
import { Platform, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";

const COMMON_TEXT_CLASSES = "text-base font-inter-regular";

interface Props extends DropdownProps<any> {
  className?: string;
  error?: boolean | string;
}

const CustomizedDropdown = cssInterop(Dropdown, {
  className: "style",
  placeholderClassName: "placeholderStyle",
  selectedTextClassName: "selectedTextStyle",
  containerClassName: "containerStyle",
  itemContainerClassName: "itemContainerStyle",
  itemTextClassName: "itemTextStyle",
  inputSearchClassName: "inputSearchStyle",
});

const CustomDropdown: FC<Props> = ({ className, error, ...props }) => {
  return (
    <View className={`mt-5 ${className}`}>
      <CustomizedDropdown
        className={`border border-border rounded-2xl pr-4 ${
          error && "border-error"
        }`}
        placeholderClassName={`${COMMON_TEXT_CLASSES} text-gray p-4`}
        selectedTextClassName={`${COMMON_TEXT_CLASSES} text-black p-4`}
        inputSearchClassName={`${COMMON_TEXT_CLASSES} text-black rounded-2xl ${Platform.select(
          {
            android: "leading-7",
            ios: "leading-[0]",
          }
        )}`}
        // iconStyle={styles.iconStyle}
        containerClassName={"rounded-2xl overflow-hidden border border-border"}
        itemTextClassName={`${COMMON_TEXT_CLASSES} text-black`}
        activeColor={"rgba(122, 122, 122, 0.2)"}
        searchPlaceholderTextColor={COLORS.gray}
        search
        maxHeight={hp(35)}
        searchPlaceholder={"Search..."}
        {...props}
      />
      {error && (
        <Text className="mx-4 mt-1 font-inter-italic color-error text-sm">
          {error}
        </Text>
      )}
    </View>
  );
};

export default CustomDropdown;

// const styles = StyleSheet.create({
//   dropdown: {
//     width: wp(90),
//     height: wp(12),
//     backgroundColor: Colors.white,
//     borderColor: Colors.gray,
//     borderWidth: 0.5,
//     borderRadius: wp(6),
//   },
//   placeholderStyle: {
//     color: Colors.placeholder,
//     fontSize: FontSize.m,
//     fontFamily: FontFamily.InterRegular,
//   },
//   textStyle: {
//     color: Colors.black,
//     fontSize: FontSize.m,
//     fontFamily: FontFamily.InterRegular,
//   },
//   iconStyle: {
//     width: wp(6),
//     height: wp(6),
//     tintColor: Colors.black,
//   },
//   inputSearchStyle: {
//     height: wp(10),
//     borderRadius: wp(5),
//   },
//   itemContainerStyle: {
//     borderRadius: wp(6),
//   },
//   containerStyle: {
//     borderRadius: wp(5),
//   },
// });
