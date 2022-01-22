import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";

interface TitleTextProps {
  text: string;
  style?: ViewStyle;
}

const TitleText = ({ text, style }: TitleTextProps) => {
  return (
    <AutoSizeText
      fontSize={50}
      numberOfLines={2}
      mode={ResizeTextMode.max_lines}
      style={[{ ...style }, styles.titleLabel]}
    >
      {text}
    </AutoSizeText>
  );
};

const styles = StyleSheet.create({
  titleLabel: {
    color: "white",
    fontFamily: "Main-Bold",
    width: "100%",
    textAlign: "center",
    marginTop: 80,
  },
});

export default TitleText;
