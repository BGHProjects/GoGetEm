import React from "react";
import { Circle } from "react-native-svg";
import { Dimensions } from "react-native";

const height = Dimensions.get("window").height;

interface ButtonProps {
  buttonFunction: Function;
  colour: string;
  position: string;
}

const CircleButtonTop: React.FC<ButtonProps> = ({
  buttonFunction,
  colour,
  position,
}) => {
  {
    switch (position) {
      case "top":
        return (
          <Circle
            cx="50%"
            cy="17.5%"
            r={height / 52}
            onPress={() => buttonFunction()}
            stroke={colour}
            strokeWidth="2"
            fill="transparent"
          />
        );
      case "left":
        return (
          <Circle
            cx="17.5%"
            cy="50%"
            r={height / 52}
            onPress={() => buttonFunction()}
            stroke={colour}
            strokeWidth="2"
            fill="transparent"
          />
        );
      case "down":
        return (
          <Circle
            cx="50%"
            cy="82.5%"
            r={height / 52}
            onPress={() => buttonFunction()}
            stroke={colour}
            strokeWidth="2"
            fill="transparent"
          />
        );
      case "right":
        return (
          <Circle
            cx="82.5%"
            cy="50%"
            r={height / 52}
            onPress={() => buttonFunction()}
            stroke={colour}
            strokeWidth="2"
            fill="transparent"
          />
        );
      default:
        return (
          <Circle
            cx="50%"
            cy="50%"
            r={height / 52}
            onPress={() => buttonFunction()}
            stroke={colour}
            strokeWidth="2"
            fill="transparent"
          />
        );
    }
  }
};

export default CircleButtonTop;
