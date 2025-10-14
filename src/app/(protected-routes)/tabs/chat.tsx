import AppLayout from "@/layouts/app-layout";
import React, { useCallback, useEffect, useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";

const Chat = () => {
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello",
        user: {
          _id: 2,
        },
      },
      {
        _id: 2,
        text: "Hello developer",
        user: {
          _id: 1,
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages: any = []) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);
  return (
    <AppLayout from="chat" showFooter={false} scrollEnabled={false}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </AppLayout>
  );
};

export default Chat;
