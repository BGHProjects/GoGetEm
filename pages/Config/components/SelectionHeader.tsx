import React from "react";
import { View, StyleSheet } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";

interface SelectionHeaderProps {
  label: string;
}

const SelectionHeader = ({ label }: SelectionHeaderProps) => {
  return (
    <View style={styles.container}>
      <AutoSizeText
        fontSize={30}
        numberOfLines={1}
        mode={ResizeTextMode.max_lines}
        style={styles.labelStyle}
      >
        {label}
      </AutoSizeText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { height: 60, width: "100%" },
  labelStyle: {
    color: "white",
    marginLeft: 15,
    fontFamily: "Main-Bold",
  },
});

export default SelectionHeader;
