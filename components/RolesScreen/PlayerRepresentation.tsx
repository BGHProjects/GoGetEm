import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
} from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { XYStart, XYEnd, Colors } from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import globalStyles from "../../constants/GlobalStyles";

interface PlayerRepresentationProps {
  colour: any;
  showFlag?: boolean;
  score?: number | null;
  whichAnimation?: string;
  delay: number;
  pulsateDelay?: number;
  pulsateDuration?: number;
  animationDuration: number;
  rotation?: number;
  noBorder?: boolean;
}

const PlayerRepresentation = ({
  colour,
  showFlag,
  score = null,
  whichAnimation,
  delay,
  pulsateDelay = 0,
  pulsateDuration = 0,
  animationDuration,
  rotation = 0,
  noBorder = false,
}: PlayerRepresentationProps) => {
  const fade = useSharedValue(0); // Handles how the component initially fades in
  const isFocused = useIsFocused();

  const fadeIn = useAnimatedStyle(() => {
    return {
      opacity: fade.value,
    };
  }, []);

  const animationOptions: Record<string, any> = {
    // Used for Classic
    top: withDelay(
      pulsateDelay,
      withRepeat(withTiming(0, { duration: pulsateDuration }), -1, true)
    ),
    left: withDelay(
      pulsateDelay + pulsateDuration,
      withRepeat(withTiming(0, { duration: pulsateDuration }), -1, true)
    ),
    // Used for Chasedown
    target: withDelay(
      pulsateDelay + 500,
      withRepeat(withTiming(0, { duration: pulsateDuration }), -1, true)
    ),
  };

  // Runs both of the animations
  useEffect(() => {
    if (isFocused) {
      fade.value = withDelay(
        delay,
        withTiming(1, { duration: animationDuration })
      );
      if (whichAnimation !== undefined) {
        fade.value = animationOptions[whichAnimation];
      }
    } else {
      fade.value = 0;
    }
  }, [isFocused]);

  return (
    <Animated.View
      style={[
        { transform: [{ rotate: `${rotation}deg` }] },
        styles.playerRepresentation,
        fadeIn,
        !noBorder && { borderColor: Colors.white, borderWidth: 3 },
      ]}
    >
      <LinearGradient
        style={[globalStyles().gradientFill, { position: "absolute" }]}
        colors={colour}
        start={XYStart}
        end={XYEnd}
      />
      {showFlag && score !== null && (
        <AutoSizeText
          fontSize={30}
          numberOfLines={1}
          mode={ResizeTextMode.max_lines}
          style={styles.scoreText}
        >
          {score}
        </AutoSizeText>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  playerRepresentation: {
    height: 50,
    width: 50,
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  scoreText: {
    position: "absolute",
    fontFamily: "Main-Bold",
    fontSize: 30,
    color: Colors.white,
    alignSelf: "center",
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    top: 0,
  },
});

export default PlayerRepresentation;
