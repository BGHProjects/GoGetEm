import React from "react";
import { StyleSheet } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";

interface StatFractionProps {
  winValue: number | string;
  totalValue: number | string;
}

const StatFraction = ({ winValue, totalValue }: StatFractionProps) => (
  <AutoSizeText
    fontSize={20}
    numberOfLines={1}
    mode={ResizeTextMode.max_lines}
    style={styles.text}
  >
    ({winValue}/{totalValue})
  </AutoSizeText>
);

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontFamily: "Main-Bold",
    marginLeft: 30,
    marginTop: 10,
  },
});

export default StatFraction;
