import React from "react";
import { View, StyleSheet } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";

interface WorkNameProps {
  label: string;
}

// TODO Check if I am still using this, otherwise delete
const WorkName = ({ label }: WorkNameProps) => {
  return (
    <View style={styles.detailsContainer}>
      <AutoSizeText
        fontSize={16}
        numberOfLines={2}
        mode={ResizeTextMode.max_lines}
        style={styles.selectionLabel}
      >
        {label}
      </AutoSizeText>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    alignSelf: "flex-start",
    width: "90%",
    marginLeft: 20,
  },
  selectionLabel: {
    fontFamily: "Main-Bold",
    color: "white",
    textAlign: "left",
  },
});

export default WorkName;
