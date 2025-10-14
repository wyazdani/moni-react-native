import AppLayout from "@/layouts/app-layout";
import moment from "moment";
import React, { FC } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface NotificationItemProps {
  data: any;
  hideBorder?: boolean;
}

const NotificationItem: FC<NotificationItemProps> = ({ data, hideBorder }) => {
  const { content, created_at, seen } = data;
  return (
    <View className="flex-row">
      {/* Notification Icon */}
      <View className="w-12 h-12 bg-[rgba(155,0,255,0.1)] rounded-full items-center justify-center mt-4 mr-4">
        <Image
          source={require("../../assets/icons/notification.png")}
          className="h-7 w-7"
        />
      </View>

      {/* Content */}
      <View
        className="flex-1 py-4 border-border"
        style={{ borderBottomWidth: hideBorder ? 0 : 1 }}
      >
        <Text className="font-poppins-medium text-sm text-black">
          {content}
        </Text>
        <Text className="font-inter-regular text-sm text-gray mt-1">
          {moment(created_at).format("h:mma")}
        </Text>
      </View>
    </View>
  );
};

const Notifications = () => {
  const notifications = [
    {
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      created_at: new Date(),
      seen: false,
    },
    {
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      created_at: new Date(),
      seen: false,
    },
    {
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      created_at: new Date(),
      seen: true,
    },
    {
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      created_at: new Date(),
      seen: true,
    },
    {
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      created_at: new Date(),
      seen: true,
    },
  ];

  const handleMarkAllRead = () => {
    // Handle mark all as read logic
    console.log("Mark all as read pressed");
  };

  return (
    <AppLayout title="Notifications">
      {/* Today Section */}
      <View className="flex-row justify-between items-center py-2">
        <Text className="font-inter-medium text-sm text-gray">Today</Text>
        <TouchableOpacity onPress={handleMarkAllRead} hitSlop={5}>
          <Text className="font-inter-medium text-sm text-primary underline">
            Mark all as read
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <View>
        {notifications.map((notification, index) => (
          <NotificationItem
            key={index}
            data={notification}
            hideBorder={index + 1 == notifications.length}
          />
        ))}
      </View>
    </AppLayout>
  );
};

export default Notifications;
