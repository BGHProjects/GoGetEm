import React from "react";
import { Polygon } from "react-native-svg";
import { Dimensions } from "react-native";

const height = Dimensions.get("window").height;

interface ButtonProps {
  buttonFunction?: Function;
  colour: string;
  position: string;
}

const PointerButton: React.FC<ButtonProps> = ({
  buttonFunction,
  colour,
  position,
}) => {
  {
    switch (position) {
      case "top":
        return (
          <Polygon
            points="50,7 36,30 50,24 63,30"
            onPress={() => buttonFunction()}
            stroke={colour}
            strokeWidth="2"
            fill="transparent"
          />
        );
      case "left":
        return (
          <Polygon
            points="30,36 7,50 30,63 24,50"
            onPress={() => buttonFunction()}
            stroke={colour}
            strokeWidth="2"
            fill="transparent"
          />
        );
      case "down":
        return (
          <Polygon
            points="50,93 36,69 50,75 63,69"
            onPress={() => buttonFunction()}
            stroke={colour}
            strokeWidth="2"
            fill="transparent"
          />
        );
      case "right":
        return (
          <Polygon
            points="69,36 93,50 69,63 75,50"
            onPress={() => buttonFunction()}
            stroke={colour}
            strokeWidth="2"
            fill="transparent"
          />
        );
      default:
        return (
          <Polygon
            points="69,36 93,50 69,63"
            onPress={() => buttonFunction()}
            stroke={colour}
            strokeWidth="2"
            fill="transparent"
          />
        );
    }
  }
};

export default PointerButton;
