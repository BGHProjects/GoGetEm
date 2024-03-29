import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withRepeat,
} from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";

interface ArrowProps {
  rotation: number;
  delay: number;
  animated?: boolean;
  pulsateDelay?: number;
  pulsateDuration?: number;
  animationDuration: number;
}

const Arrow = ({
  rotation,
  delay,
  animated = false,
  pulsateDelay = 0,
  pulsateDuration = 0,
  animationDuration,
}: ArrowProps) => {
  const fade = useSharedValue(0);
  const isFocused = useIsFocused();

  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fade.value,
    };
  }, []);

  useEffect(() => {
    if (isFocused) {
      fade.value = withDelay(
        delay,
        withTiming(1, { duration: animationDuration })
      );
      if (animated) {
        fade.value = withDelay(
          pulsateDelay + pulsateDuration / 2,
          withRepeat(withTiming(0, { duration: pulsateDuration }), -1, true)
        );
      }
    } else {
      fade.value = 0;
    }
  }, [isFocused]);

  return (
    <Animated.View style={reanimatedStyle}>
      <Ionicons
        name="arrow-down"
        size={40}
        color={"white"}
        style={{
          alignSelf: "center",
          transform: [{ rotate: `${rotation}deg` }],
        }}
      />
    </Animated.View>
  );
};

export default Arrow;
