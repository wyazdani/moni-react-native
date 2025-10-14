import React, { FC } from "react";
import { Text, View } from "react-native";

type Props = {
  message: any;
  user: any;
};

const Message: FC<Props> = ({ message, user }) => {
  const isCurrentUser = message.user._id === user._id;
  return (
    <View className={"mx-3 my-2 rounded"}>
      <Text className={`${isCurrentUser ? "text-" : "items-start"}`}>
        {message.text}
      </Text>
    </View>
  );
};

export default Message;
