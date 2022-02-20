import React from "react";
import { View, StyleSheet } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";

interface AuthorNameProps {
  label: string;
}

const AuthorName = ({ label }: AuthorNameProps) => {
  return (
    <View style={[styles.detailsContainer, { marginLeft: 40 }]}>
      <AutoSizeText
        fontSize={16}
        numberOfLines={2}
        mode={ResizeTextMode.max_lines}
        style={styles.selectionLabel}
      >
        by {label}
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

export default AuthorName;
