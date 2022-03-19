import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
  cancelAnimation,
} from "react-native-reanimated";

interface PlayerRepresentationProps {
  colour: string;
  showFlag: boolean;
  score: number;
  whichAnimation?: string;
  delay: number;
  pulsateDelay?: number;
  pulsateDuration?: number;
  animationDuration: number;
}

const PlayerRepresentation = ({
  colour,
  showFlag,
  score,
  whichAnimation,
  delay,
  pulsateDelay = 0,
  pulsateDuration = 0,
  animationDuration,
}: PlayerRepresentationProps) => {
  const fade = useSharedValue(0); // Handles how the component initially fades in

  const fadeIn = useAnimatedStyle(() => {
    return {
      opacity: fade.value,
    };
  }, []);

  const animationOptions: Record<string, any> = {
    top: withDelay(
      pulsateDelay,
      withRepeat(withTiming(0, { duration: pulsateDuration }), -1, true)
    ),
    left: withDelay(
      pulsateDelay + pulsateDuration,
      withRepeat(withTiming(0, { duration: pulsateDuration }), -1, true)
    ),
  };

  // Runs both of the animations
  useEffect(() => {
    fade.value = withDelay(
      delay,
      withTiming(1, { duration: animationDuration })
    );
    if (whichAnimation !== undefined) {
      fade.value = animationOptions[whichAnimation];
    }
  }, []);

  return (
    <Animated.View
      style={[
        { backgroundColor: `${colour}` },
        styles.playerRepresentation,
        fadeIn,
      ]}
    >
      {showFlag && <Text style={styles.scoreText}>{score}</Text>}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  playerRepresentation: {
    height: 50,
    width: 50,
    borderRadius: 90,
    justifyContent: "center",
  },
  scoreText: {
    fontSize: 30,
    color: "black",
    alignSelf: "center",
  },
});

export default PlayerRepresentation;
