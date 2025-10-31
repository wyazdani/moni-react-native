import { COLORS } from "@/constants/styles";
import React, { FC } from "react";
import { ActivityIndicator, Modal, View } from "react-native";

interface Props {
  visible: boolean;
}

const AppLoader: FC<Props> = ({ visible }) => {
  return (
    <Modal transparent animationType="fade" visible={visible} statusBarTranslucent>
      <View className="flex-1 bg-black/50 justify-center items-center">
        <ActivityIndicator size={"large"} color={COLORS.primary} />
      </View>
    </Modal>
  );
};

export default AppLoader;
