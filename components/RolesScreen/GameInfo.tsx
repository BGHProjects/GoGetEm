import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { convertTime } from "./helpers";

interface GameInfoProps {
  rounds: string;
  difficulty: string;
  currentRound: number;
  timeLimit?: number;
}

const GameInfo = ({
  rounds,
  difficulty,
  currentRound,
  timeLimit,
}: GameInfoProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelColumn}>
        <Text style={styles.detailsLabel}>
          {currentRound === 1 ? "Rounds" : "Round"}
        </Text>
        <Text style={styles.detailsLabel}>Difficulty</Text>
        {timeLimit && <Text style={styles.detailsLabel}>Time Limit</Text>}
      </View>
      <View style={styles.valueColumn}>
        <Text style={styles.detailsLabel}>
          {currentRound === 1 ? rounds : currentRound + "/" + rounds}
        </Text>
        <Text style={styles.detailsLabel}>{difficulty}</Text>
        {timeLimit && (
          <Text style={styles.detailsLabel}>{convertTime(timeLimit)}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 300,
    justifyContent: "space-evenly",
    marginBottom: 50,
  },
  labelColumn: { alignItems: "flex-end" },
  valueColumn: { alignItems: "flex-start" },
  detailsLabel: { color: "white", fontFamily: "Main", fontSize: 20 },
});

export default GameInfo;
