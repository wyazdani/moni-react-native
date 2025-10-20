import { COLORS } from "@/constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import { router, Tabs } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

export const BOTTOM_TAB_HEIGHT = 80

export default function TabLayout() {
  return (
    <Tabs
      backBehavior={"history"}
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        headerShown: false,
        tabBarStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: "white",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../../assets/icons/home.png")}
              className="w-5 h-5"
              resizeMode="contain"
              style={{ tintColor: focused ? COLORS.primary : COLORS.gray }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarStyle: { display: "none" },
          tabBarButton: (props) => (
            // @ts-ignore
            <TouchableOpacity
              // {...props}
              activeOpacity={0.8}
              style={styles.chatIconContainer}
              onPress={() => router.push('/tabs/chat')}
            >
              <LinearGradient
                colors={["rgba(0, 255, 255, 0.3)", "rgba(155, 0, 255, 0.3)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.chatIconContainerInner1}
              >
                <LinearGradient
                  colors={[COLORS.secondary, COLORS.primary]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.chatIconContainerInner2}
                >
                  <Image
                    source={require("../../../assets/icons/chat.png")}
                    style={{ height: 40, width: 40 }}
                    resizeMode="contain"
                  />
                </LinearGradient>
              </LinearGradient>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../../assets/icons/profile.png")}
              className="w-5 h-5"
              resizeMode="contain"
              style={{ tintColor: focused ? COLORS.primary : COLORS.gray }}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  chatIconContainer: {
    width: 84,
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
  },
  chatIconContainerInner1: {
    width: 70,
    aspectRatio: 1,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  chatIconContainerInner2: {
    width: 63,
    aspectRatio: 1,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
