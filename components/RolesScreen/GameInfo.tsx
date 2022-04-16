import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";

interface GameInfoProps {
  rounds: string;
  difficulty: string;
  currentRound: number;
}

const GameInfo = ({ rounds, difficulty, currentRound }: GameInfoProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelColumn}>
        <Text style={styles.detailsLabel}>
          {currentRound === 1 ? "Rounds" : "Round"}
        </Text>
        <Text style={styles.detailsLabel}>Difficulty</Text>
      </View>
      <View style={styles.valueColumn}>
        <Text style={styles.detailsLabel}>
          {currentRound === 1 ? rounds : currentRound + "/" + rounds}
        </Text>
        <Text style={styles.detailsLabel}>{difficulty}</Text>
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
