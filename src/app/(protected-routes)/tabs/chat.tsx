import Message from "@/components/message";
import SuggestionMessage from "@/components/suggestion-message";
import { COLORS } from "@/constants/styles";
import { usePaddingBottomForKeyboard } from "@/hooks/usePaddingBottomForKeyboard";
import AppLayout from "@/layouts/app-layout";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  Platform,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { GiftedChat, IMessage, MessageProps } from "react-native-gifted-chat";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const SUGGESSTION_MESSAGES = [
  "How much did I spend on food last week?",
  "What’s my balance?",
  "Give me a savings tip.",
  "I have €10000, what do I do with this?",
];

const Chat = () => {
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<any>([]);
  const {top} = useSafeAreaInsets();
  const paddingBottom = usePaddingBottomForKeyboard(8);

  useEffect(() => {
    setMessages([
      {
        _id: 9,
        text: "Interactive Brokers — strong in many countries; good tools, lots of products, usually low fees.",
        user: {
          _id: 0,
        },
      },
      {
        _id: 8,
        text: "Which is the best broker?",
        user: {
          _id: 1,
        },
      },
      {
        _id: 7,
        text: "Interactive Brokers — strong in many countries; good tools, lots of products, usually low fees.",
        user: {
          _id: 0,
        },
      },
      {
        _id: 6,
        text: "Which is the best broker?",
        user: {
          _id: 1,
        },
      },
      {
        _id: 5,
        text: "Interactive Brokers — strong in many countries; good tools, lots of products, usually low fees.",
        user: {
          _id: 0,
        },
      },
      {
        _id: 4,
        text: "Which is the best broker?",
        user: {
          _id: 1,
        },
      },
      {
        _id: 3,
        text: "Transfer of Billing (telecom/IT services) when ownership or responsibility for billing is moved from one account holder to another.",
        user: {
          _id: 0,
        },
      },
      {
        _id: 2,
        text: " What is TOB?",
        user: {
          _id: 1,
        },
      },
      {
        _id: 1,
        text: "How can I help you?",
        user: {
          _id: 0,
        },
      },
    ]);
  }, []);

  const renderMessage = useCallback(
    (message: MessageProps<IMessage>) => <Message message={message} />,
    []
  );

  const onSend = useCallback((txt?:string) => {
    txt = text.trim() || txt?.trim();
    if (!txt) return;
    const newMessage = {
      _id: Date.now(),
      text: txt,
      createdAt: new Date(),
      user: { _id: 1 },
    };
    setMessages((prev: any) => GiftedChat.append(prev, [newMessage]));
    setText("");
  }, [text]);

  const renderInputToolbar = useCallback(() => {
    return (
      <View
        className={"flex-row w-full px-5 gap-4 py-2"}
        style={{ paddingBottom }}
      >
        <View className="flex-1 flex-row border border-border rounded-2xl px-3 py-2">
          <TextInput
            className={`flex-1 p-0 m-0 text-base text-black font-inter-regular ${Platform.select(
              {
                android: "leading-7",
                ios: "leading-[0]",
              }
            )}`}
            placeholder="Write anything..."
            placeholderTextColor={COLORS.gray}
            selectionColor={"rgba(155, 0, 255, 0.3)"}
            value={text}
            onChangeText={setText}
            onSubmitEditing={() => onSend()}
          />
        </View>
        <TouchableOpacity disabled={!text} activeOpacity={0.6} onPress={() => onSend()}>
          <LinearGradient
            colors={[COLORS.secondary, COLORS.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="p-4 rounded-2xl"
          >
            <Image
              source={require("../../../assets/icons/send.png")}
              className="h-5 w-5"
              resizeMode="contain"
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }, [text, paddingBottom]);

  const renderFooter = useCallback(() => {
    const onPress = (text: string) => onSend(text);
    return (
      <View className="gap-4 mb-2 mt-20">
        {SUGGESSTION_MESSAGES.map((message, index) => (
          <SuggestionMessage key={index} text={message} onPress={onPress} />
        ))}
      </View>
    );
  }, []);

  return (
    <AppLayout from="chat" showFooter={false} scrollEnabled={false}>
      <GiftedChat
        messages={messages}
        user={{
          _id: 1,
        }}
        renderMessage={renderMessage}
        renderInputToolbar={renderInputToolbar}
        renderFooter={renderFooter}
        renderDay={() => <View/>}
        keyboardShouldPersistTaps="handled"
        messagesContainerStyle={{ marginTop: top+45 }}
        handleOnScroll={() => Keyboard.dismiss()}
      />
    </AppLayout>
  );
};

export default Chat;
