import React from "react";
import { View, StyleSheet } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";

interface InGameTitleProps {
  label: string;
}

const InGameTitle = ({ label }: InGameTitleProps) => {
  return (
    <View style={styles.inGameNameContainer}>
      <AutoSizeText
        fontSize={16}
        numberOfLines={1}
        mode={ResizeTextMode.max_lines}
        style={styles.modeLabel}
      >
        {label}
      </AutoSizeText>
    </View>
  );
};

const styles = StyleSheet.create({
  inGameNameContainer: {
    alignSelf: "flex-start",
    width: "100%",
    alignItems: "center",
  },
  modeLabel: {
    fontFamily: "Main",
    color: "white",
    marginLeft: 10,
  },
});

export default InGameTitle;
