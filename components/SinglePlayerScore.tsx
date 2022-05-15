import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { Colors, XYEnd, XYStart } from "../constants/Colors";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface SinglePlayerScoreProps {
  colour: any[];
  score: number;
}

const animDuration = 300;

export const SinglePlayerScore = ({
  colour,
  score,
}: SinglePlayerScoreProps) => {
  const scoreOpacity = useSharedValue(1);

  const fadeStyle = useAnimatedStyle(() => {
    return {
      opacity: scoreOpacity.value,
    };
  }, []);

  useEffect(() => {
    scoreOpacity.value = withSequence(
      withTiming(0, { duration: animDuration / 2 }),
      withTiming(1, { duration: animDuration / 2 })
    );
  }, [score]);

  return (
    <LinearGradient
      style={styles.scoreGradientContainer}
      colors={colour}
      start={XYStart}
      end={XYEnd}
    >
      <Animated.View style={[styles.scoreContentContainer, fadeStyle]}>
        <AutoSizeText
          fontSize={24}
          numberOfLines={1}
          mode={ResizeTextMode.max_lines}
          style={styles.scoreLabel}
        >
          {score}
        </AutoSizeText>
      </Animated.View>
    </LinearGradient>
  );
};

export default SinglePlayerScore;

const styles = StyleSheet.create({
  scoreGradientContainer: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  scoreContentContainer: {
    height: "95%",
    width: "95%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.darkTransparentBlack,
  },
  scoreLabel: {
    color: "white",
    fontFamily: "Main",
    textAlign: "center",
    marginTop: -5,
  },
});
