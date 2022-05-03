import React from "react";
import { StyleSheet } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";

interface StatValueProps {
  label: number | string;
}

const StatValue = ({ label }: StatValueProps) => (
  <AutoSizeText
    fontSize={24}
    numberOfLines={1}
    mode={ResizeTextMode.max_lines}
    style={styles.label}
  >
    {label}
  </AutoSizeText>
);

const styles = StyleSheet.create({
  label: {
    color: "white",
    fontFamily: "Main-Bold",
    marginLeft: 10,
    marginTop: 10,
  },
});

export default StatValue;
