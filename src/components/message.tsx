import { COLORS } from "@/constants/styles";
import React, { FC } from "react";
import { View } from "react-native";
import { IMessage, MessageProps } from "react-native-gifted-chat";
import Markdown from "react-native-markdown-display";
import ThreeDotPulse from "./three-dot-pulse";

type Props = {
  message: MessageProps<IMessage & { loader?: boolean }>;
};

const Message: FC<Props> = ({ message }) => {
  const { currentMessage, user } = message;
  const isCurrentUser = user._id == currentMessage.user._id;

  return !currentMessage.text && currentMessage.loader ? (
    <ThreeDotPulse className="mx-5 my-2" />
  ) : (
    <View
      className={`max-w-[80%] mx-5 my-2 px-5 ${
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
      <Markdown
        style={{
          body:{
            color:isCurrentUser ? "white" : COLORS.gray,
            fontSize:14,
            fontFamily:'InterRegular'
          }
        }}
      >
        {currentMessage.text}
      </Markdown>
    </View>
  );
};

export default Message;
