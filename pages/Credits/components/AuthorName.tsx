import React from "react";
import { View, StyleSheet } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";

interface AuthorNameProps {
  label: string;
  prefix?: string;
}

const AuthorName = ({ label, prefix }: AuthorNameProps) => {
  return (
    <View style={[styles.detailsContainer]}>
      <AutoSizeText
        fontSize={14}
        numberOfLines={4}
        mode={ResizeTextMode.max_lines}
        style={styles.selectionLabel}
      >
        {prefix}
        {label}
      </AutoSizeText>
    </View>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    alignSelf: "center",
    justifyContent: "center",
    width: "90%",
  },
  selectionLabel: {
    fontFamily: "Main-Bold",
    color: "white",
    textAlign: "center",
  },
});

export default AuthorName;
