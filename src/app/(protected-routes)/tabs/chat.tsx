import { getMessagesApi } from "@/api/messages";
import AppLoader from "@/components/app-loader";
import Message from "@/components/message";
import SuggestionMessage from "@/components/suggestion-message";
import { BASE_URL } from "@/constants";
import { COLORS } from "@/constants/styles";
import { usePaddingBottomForKeyboard } from "@/hooks/usePaddingBottomForKeyboard";
import AppLayout from "@/layouts/app-layout";
import { useAppSelector } from "@/redux/store";
import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { GiftedChat, IMessage, MessageProps } from "react-native-gifted-chat";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-simple-toast";
import { io, Socket } from "socket.io-client";

const SUGGESSTION_MESSAGES = [
  "How much did I spend on food last week?",
  "What’s my balance?",
  "Give me a savings tip.",
  "I have €10000, what do I do with this?",
];

const Chat = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [socket, setSocket] = useState<Socket>();
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  const { top } = useSafeAreaInsets();
  const paddingBottom = usePaddingBottomForKeyboard(8);
  const isFocused = useIsFocused();

  const getMessages = async () => {
    setLoader(true);
    const res = await getMessagesApi();
    if (res?.status == 200) setMessages(res.data || []);
    setLoader(false);
  };

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    if (!user || !isFocused) return;
    const socket = io(BASE_URL, {
      extraHeaders: {
        authorization: `Bearer ${user.token}`,
      },
    });
    setSocket(socket);

    let responseMessage = "";
    socket.on("receive-message", (message: any) => {
      responseMessage += message;
      setMessages((prev: any[]) => {
        // If first message is loader, update it immutably
        if (prev[0]?.loader) {
          const updated = {
            ...prev[0],
            text: responseMessage,
          };

          return [updated, ...prev.slice(1)];
        }
        return prev;
      });
      console.log("Received message:", responseMessage);
    });
    socket.on("message-response-completed", () => {
      setIsPending(false);
    });
    socket.on("error", (error: any) => {
      console.log("Socket error:", error);
      setIsPending(false);
      Toast.show(error, Toast.SHORT);
    });

    return () => {
      socket?.disconnect();
      setMessages((prev: any[]) => {
        const { loader, text } = prev[0] || {};
        if (loader && !text) {
          return [...prev.slice(1)];
        }
        return prev;
      });
      setIsPending(false);
    };
  }, [user, isFocused]);

  const renderMessage = useCallback(
    (message: MessageProps<IMessage>) => <Message message={message} />,
    []
  );

  const onSend = (txt?: string) => {
    txt = txt?.trim() || text.trim();
    if (!txt) return;
    setIsPending(true);

    const newMessage = {
      _id: Date.now(),
      text: txt,
      createdAt: new Date(),
      user: { _id: user._id },
    };
    const tempMessage = {
      _id: Date.now() + "loader",
      text: "",
      loader: true,
      createdAt: new Date(),
      user: { _id: "assistant" },
    };
    setMessages((prev: any) =>
      GiftedChat.append(prev, [tempMessage, newMessage])
    );
    setText("");
    socket?.emit("send-message", txt);
  };

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
        <TouchableOpacity
          disabled={!text || isPending}
          activeOpacity={0.6}
          onPress={() => onSend()}
        >
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
  }, [text, isPending, paddingBottom, onSend]);

  const renderFooter = useCallback(() => {
    const onPress = (text: string) => onSend(text);
    return (
      messages.length <= 0 && (
        <View className="gap-4 mb-2 mt-20">
          {SUGGESSTION_MESSAGES.map((message, index) => (
            <SuggestionMessage
              key={index}
              text={message}
              onPress={onPress}
              disabled={isPending}
            />
          ))}
        </View>
      )
    );
  }, [onSend, isPending, messages]);

  return (
    user && (
      <AppLayout from="chat" showFooter={false} scrollEnabled={false}>
        <GiftedChat
          messages={messages}
          user={{
            _id: user._id,
          }}
          renderMessage={renderMessage}
          renderInputToolbar={renderInputToolbar}
          renderFooter={renderFooter}
          renderDay={() => <View />}
          keyboardShouldPersistTaps="handled"
          messagesContainerStyle={{ marginTop: top + 45 }}
          handleOnScroll={() => Keyboard.dismiss()}
        />
        <AppLoader visible={isFocused && (!socket || loader)} />
      </AppLayout>
    )
  );
};

export default Chat;
