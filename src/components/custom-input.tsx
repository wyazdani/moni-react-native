import { COLORS } from "@/constants/styles";
import Feather from "@expo/vector-icons/Feather";
import React, {
  FC,
  ForwardedRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Platform,
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

interface Props extends TextInputProps {
  ref?: ForwardedRef<TextInput>;
  containerClass?: string;
  inputClass?: string;
  password?: boolean;
  error?: boolean | String;
  onPress?: () => void;
}

const CustomInput: FC<Props> = ({
  ref,
  className,
  inputClass,
  password,
  error,
  editable,
  onPress,
  ...props
}) => {
  const [secure, setSecure] = useState(password ? true : false);
  const inputRef = useRef<TextInput>(null);

  useImperativeHandle(ref, () => inputRef.current as TextInput);

  return (
    <View className={`${className || "mt-4"}`}>
      <Pressable
        className={`justify-center border border-border rounded-2xl p-4 ${
          error && "border-error"
        }`}
        onPress={onPress || (() => inputRef.current?.focus())}
      >
        <TextInput
          ref={inputRef}
          className={`p-0 m-0 ${
            password && "mr-8"
          } text-base text-black font-inter-regular ${Platform.select({
            android: "leading-7",
            ios: "leading-[0]",
          })}`}
          placeholderTextColor={COLORS.gray}
          selectionColor={"rgba(155, 0, 255, 0.3)"}
          secureTextEntry={secure}
          editable={editable}
          onPress={!editable && onPress ? onPress : undefined}
          {...props}
        />
        {password && (
          <Feather
            name={secure ? "eye-off" : "eye"}
            color={COLORS.gray}
            onPress={() => setSecure((prev) => !prev)}
            size={20}
            className="absolute right-4"
          />
        )}
      </Pressable>
      {error && (
        <Text className="mx-4 mt-1 font-inter-italic color-error text-sm">
          {error}
        </Text>
      )}
    </View>
  );
};

export default CustomInput;
