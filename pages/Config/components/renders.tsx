import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { selectionWidth } from "../values";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, XYEnd, XYStart } from "../../../constants/Colors";
import globalStyles from "../../../constants/GlobalStyles";

export const renderColour = ({ item }: any) => {
  return (
    <View style={{ ...styles.renderColourLabel }}>
      <LinearGradient
        style={globalStyles().gradientFill}
        colors={item}
        start={XYStart}
        end={XYEnd}
      />
    </View>
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
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Main-Bold",
  },
  renderColourLabel: {
    width: selectionWidth,
    height: selectionWidth,
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.white,
    borderWidth: 3,
  },
});
