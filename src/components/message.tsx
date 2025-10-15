import React, { FC } from "react";
import { Text, View } from "react-native";
import { IMessage, MessageProps } from "react-native-gifted-chat";

type Props = {
  message: MessageProps<IMessage>;
};

const Message: FC<Props> = ({ message }) => {
  const { currentMessage, user } = message;
  const isCurrentUser = user._id == currentMessage.user._id;

  return (
    <View
      className={`max-w-[80%] mx-5 my-2 py-2 px-5 ${
        isCurrentUser
          ? "self-end bg-primary"
          : "self-start border border-border"
      }`}
      style={{
        borderRadius: 20,
        borderTopLeftRadius: !isCurrentUser ? 0 : 20,
        borderBottomRightRadius: isCurrentUser ? 0 : 20,
      }}
    >
      <Text
        className={`font-inter-regular text-sm ${
          isCurrentUser ? "text-[white]" : "text-gray"
        }`}
      >
        {currentMessage.text}
      </Text>
    </View>
  );
};

export default Message;
