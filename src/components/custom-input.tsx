import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, {
    FC,
    ForwardedRef,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";

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
    <View className={`mb-5 ${className || ""}`}>
      <Pressable
        className={`flex-row justify-between items-center border border-border rounded-2xl p-4 ${
          error && "border-error"
        }`}
        onPress={onPress || (() => inputRef.current?.focus())}
      >
        <TextInput
          ref={inputRef}
          className="p-0 m-0 flex-1 text-lg leading-5 font-inter-regular"
          style={{ textAlignVertical: "center" }}
          placeholderTextColor={"rgba(122, 122, 122, 1)"}
          selectionColor={"rgba(155, 0, 255, 0.3)"}
          secureTextEntry={secure}
          editable={editable}
          onPress={!editable && onPress ? onPress : undefined}
          {...props}
        />
        {password && (
          <MaterialIcons
            name={secure ? "visibility-off" : "visibility"}
            color={"rgba(122, 122, 122, 1)"}
            onPress={() => setSecure((prev) => !prev)}
            size={20}
            className="ml-4"
          />
        )}
      </Pressable>
      {error ? (
        <Text className="mx-4 mt-1 font-inter-italic color-error text-sm">
          {error}
        </Text>
      ) : null}
    </View>
  );
};

export default CustomInput;
