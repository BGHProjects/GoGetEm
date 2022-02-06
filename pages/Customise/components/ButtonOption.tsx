import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../../../constants/Colors";

import {
  TopShard,
  TopPointer,
  TopCircle,
  TopLetter,
  TopTriangle,
  TopSquare,
  LeftShard,
  RightShard,
  DownShard,
  LeftPointer,
  RightPointer,
  DownPointer,
  DownTriangle,
  RightTriangle,
  LeftTriangle,
} from "./Buttons";

const ButtonOption = ({}) => {
  return (
    <View style={styles.optionContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.levelLabel}>100</Text>
      </View>
      <View style={styles.buttonContainer}>
        <LeftTriangle />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  labelContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    position: "absolute",
  },
  levelLabel: {
    color: "white",
    fontFamily: "Main",
    fontSize: 12,
    marginLeft: 5,
  },
  optionContainer: {
    borderColor: Colors.fluroBlue,
    height: 80,
    width: 80,
    borderWidth: 2,
    borderRadius: 5,
    position: "relative",
    margin: 5,
  },
});

export default ButtonOption;
