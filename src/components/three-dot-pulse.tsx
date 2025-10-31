// ThreeDotPulse.tsx
import { COLORS } from "@/constants/styles";
import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type Props = {
  size?: number;          // diameter of each dot
  color?: string;         // dot color
  spacing?: number;       // gap between dots
  duration?: number;      // full pulse cycle per dot (ms)
  className?: string;
};

const ThreeDotPulse: React.FC<Props> = ({
  size = 10,
  color = COLORS.primary,
  spacing = 5,
  duration = 600,
  className,
}) => {
  // Each shared value controls scale for a dot.
  const s1 = useSharedValue(0.6);
  const s2 = useSharedValue(0.6);
  const s3 = useSharedValue(0.6);

  useEffect(() => {
    // Helper to create a repeating pulse: 0.6 -> 1 -> 0.6 ...
    const startPulse = (shared: SharedValue<number>, delay = 0) => {
      shared.value = withDelay(
        delay,
        withRepeat(
          withTiming(1, { duration: duration / 2, easing: Easing.inOut(Easing.ease) }, () => {
            // after reaching 1, it will animate back with the next withTiming in the sequence
          }),
          -1,
          true
        )
      );
      // Note: withRepeat with "reverse = true" creates the up/down effect
    };

    // Staggered start delays for the three dots
    startPulse(s1, 0);
    startPulse(s2, duration / 3);
    startPulse(s3, (duration / 3) * 2);

    // no cleanup necessary for shared values - animations are managed by reanimated
  }, [duration, s1, s2, s3]);

  const dotStyle = (shared: SharedValue<number>) =>
    useAnimatedStyle(() => {
      return {
        transform: [{ scale: shared.value }],
        opacity: shared.value, // subtle opacity change with scale
      };
    }, []);

  return (
    <View className={`flex-row items-center ${className}`} >
      <Animated.View
        style={[
          { width: size, height: size, borderRadius: size / 2, marginRight: spacing / 2, backgroundColor: color },
          dotStyle(s1),
        ]}
      />
      <Animated.View
        style={[
          { width: size, height: size, borderRadius: size / 2, marginHorizontal: spacing / 2, backgroundColor: color },
          dotStyle(s2),
        ]}
      />
      <Animated.View
        style={[
          { width: size, height: size, borderRadius: size / 2, marginLeft: spacing / 2, backgroundColor: color },
          dotStyle(s3),
        ]}
      />
    </View>
  );
};

export default ThreeDotPulse;
