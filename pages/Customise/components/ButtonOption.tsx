import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../../../constants/Colors";
import _ from "lodash";

import {
  TopShard,
  TopPointer,
  Circle,
  TopLetter,
  TopTriangle,
  Square,
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

interface ButtonOptionProps {
  level: number;
  variant: string | unknown;
}

interface SelectionProps {
  variant: string;
}

const ButtonOption = ({ level, variant }: ButtonOptionProps) => {
  const Selection = ({ variant }: SelectionProps) => {
    //console.log("variant", variant);
    let parts = _.split(variant, "-");
    let colour = parts[1];
    let button;
    switch (parts[2]) {
      case "circle":
        button = <Circle colour={Colors[`${colour}`]} />;
        break;
      case "square":
        button = <Square colour={Colors[`${colour}`]} />;
        break;
      case "triangle":
        switch (parts[0]) {
          case "top":
            button = <TopTriangle colour={Colors[`${colour}`]} />;
            break;
          case "right":
            button = <RightTriangle colour={Colors[`${colour}`]} />;
            break;
          case "down":
            button = <DownTriangle colour={Colors[`${colour}`]} />;
            break;
          case "left":
            button = <LeftTriangle colour={Colors[`${colour}`]} />;
            break;
          default:
            button = <TopTriangle colour={Colors[`${colour}`]} />;
            break;
        }
        break;
      case "shard":
        switch (parts[0]) {
          case "top":
            button = <TopShard colour={Colors[`${colour}`]} />;
            break;
          case "right":
            button = <RightShard colour={Colors[`${colour}`]} />;
            break;
          case "down":
            button = <DownShard colour={Colors[`${colour}`]} />;
            break;
          case "left":
            button = <LeftShard colour={Colors[`${colour}`]} />;
            break;
          default:
            button = <TopShard colour={Colors[`${colour}`]} />;
            break;
        }
        break;
      case "letter":
      case "top":
        button = (
          <TopLetter
            colour={Colors[`${colour}`]}
            letter={_.capitalize(parts[3])}
          />
        );
        break;
      case "pointer":
        switch (parts[0]) {
          case "top":
            button = <TopPointer colour={Colors[`${colour}`]} />;
            break;
          case "right":
            button = <RightPointer colour={Colors[`${colour}`]} />;
            break;
          case "down":
            button = <DownPointer colour={Colors[`${colour}`]} />;
            break;
          case "left":
            button = <LeftPointer colour={Colors[`${colour}`]} />;
            break;
          default:
            button = <TopPointer colour={Colors[`${colour}`]} />;
            break;
        }
        break;
      default:
        button = <Circle colour={Colors.fluroPink} />;
        break;
    }

    return button;
  };

  return (
    <View style={styles.optionContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.levelLabel}>{level}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Selection variant={variant} />
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
