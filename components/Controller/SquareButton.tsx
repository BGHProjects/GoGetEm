import React from "react";
import { Rect } from "react-native-svg";
import { Dimensions } from "react-native";

const height = Dimensions.get("window").height;

interface ButtonProps {
  buttonFunction?: Function;
  colour: string;
  position: string;
}

const SquareButton: React.FC<ButtonProps> = ({
  buttonFunction,
  colour,
  position,
}) => {
  {
    switch (position) {
      case "top":
        return (
          <Rect
            x="40%"
            y="7.5%"
            width={height / 32}
            height={height / 32}
            onPress={() => buttonFunction()}
            stroke={colour}
            strokeWidth="2"
            fill="transparent"
          />
        );
      case "left":
        return (
          <Rect
            x="7.5%"
            y="40%"
            width={height / 32}
            height={height / 32}
            onPress={() => buttonFunction()}
            stroke={colour}
            strokeWidth="2"
            fill="transparent"
          />
        );
      case "down":
        return (
          <Rect
            x="40%"
            y="72.5%"
            width={height / 32}
            height={height / 32}
            onPress={() => buttonFunction()}
            stroke={colour}
            strokeWidth="2"
            fill="transparent"
          />
        );
      case "right":
        return (
          <Rect
            x="72.5%"
            y="40%"
            width={height / 32}
            height={height / 32}
            onPress={() => buttonFunction()}
            stroke={colour}
            strokeWidth="2"
            fill="transparent"
          />
        );
      default:
        return (
          <Rect
            x="72.5%"
            y="40%"
            width={height / 32}
            height={height / 32}
            onPress={() => buttonFunction()}
            stroke={colour}
            strokeWidth="2"
            fill="transparent"
          />
        );
    }
  }
};

export default SquareButton;
