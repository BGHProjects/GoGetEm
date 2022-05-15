import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { Colors, XYEnd, XYStart } from "../constants/Colors";
import globalStyles from "../constants/GlobalStyles";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from "react-native-reanimated";

interface SingleTeamScoreProps {
  colour1: any[];
  colour2: any[];
  score: number;
}

const animDuration = 300;

const SingleTeamScore = ({ colour1, colour2, score }: SingleTeamScoreProps) => {
  const players = [colour1, colour2];
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
    <Animated.View style={[styles.teamContentContainer, fadeStyle]}>
      {players.map((player) => (
        <View style={styles.teamItemContainer} key={player.toString()}>
          <View style={[globalStyles().playerAvatar]}>
            <LinearGradient
              style={globalStyles().gradientFill}
              colors={player}
              start={XYStart}
              end={XYEnd}
            />
          </View>
        </View>
      ))}

      <View style={styles.teamItemContainer}>
        <AutoSizeText
          fontSize={24}
          numberOfLines={1}
          mode={ResizeTextMode.max_lines}
          style={styles.scoreLabel}
        >
          {score}
        </AutoSizeText>
      </View>
    </Animated.View>
  );
};

export default SingleTeamScore;

const styles = StyleSheet.create({
  scoreLabel: {
    color: "white",
    fontFamily: "Main",
    textAlign: "center",
    marginTop: -5,
  },
  teamItemContainer: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  teamContentContainer: {
    height: 40,
    width: 110,
    borderWidth: 2,
    borderColor: Colors.white,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
});
