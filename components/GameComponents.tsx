import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { Colors, XYEnd, XYStart } from "../constants/Colors";
import globalStyles from "../constants/GlobalStyles";

interface ClockTextProps {
  remainingTime: number;
}

export const ClockText = ({ remainingTime }: ClockTextProps) => {
  return (
    <Text style={globalStyles().clockText}>
      {Math.floor(remainingTime / 60)}:
      {(remainingTime % 60).toString().length === 1 && remainingTime % 60 !== 0
        ? "0" + (remainingTime % 60)
        : remainingTime % 60}
      {remainingTime % 60 === 0 && 0}
    </Text>
  );
};

interface SinglePlayerScoreProps {
  colour: any[];
  score: number;
}

export const SinglePlayerScore = ({
  colour,
  score,
}: SinglePlayerScoreProps) => {
  return (
    <LinearGradient
      style={styles.scoreGradientContainer}
      colors={colour}
      start={XYStart}
      end={XYEnd}
    >
      <View style={styles.scoreContentContainer}>
        <AutoSizeText
          fontSize={24}
          numberOfLines={1}
          mode={ResizeTextMode.max_lines}
          style={styles.scoreLabel}
        >
          {score}
        </AutoSizeText>
      </View>
    </LinearGradient>
  );
};

interface SingleTeamScoreProps {
  colour1: any[];
  colour2: any[];
  score: number;
}

export const SingleTeamScore = ({
  colour1,
  colour2,
  score,
}: SingleTeamScoreProps) => {
  const players = [colour1, colour2];
  return (
    <View style={styles.teamContentContainer}>
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
    </View>
  );
};

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
