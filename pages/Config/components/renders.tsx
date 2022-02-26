import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { selectionWidth } from "../values";

export const renderColour = ({ item }: any) => {
  return (
    <View style={{ ...styles.renderColourLabel, backgroundColor: `${item}` }} />
  );
};

export const renderNumber = ({ item }: any) => {
  return <Text style={styles.renderNumberLabel}>{item}</Text>;
};

export const renderDifficulty = ({ item }: any) => {
  return <Text style={styles.renderDifficultyLabel}>{item}</Text>;
};

const styles = StyleSheet.create({
  renderNumberLabel: {
    alignSelf: "center",
    color: "white",
    fontSize: 36,
    fontFamily: "Main-Bold",
  },
  renderDifficultyLabel: {
    alignSelf: "center",
    color: "white",
    fontSize: 36,
    textAlign: "center",
    fontFamily: "Main-Bold",
  },
  renderColourLabel: {
    width: selectionWidth,
    height: selectionWidth,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
