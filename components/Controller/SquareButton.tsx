import React from "react";
import { Rect } from "react-native-svg";
import { Dimensions } from "react-native";

const height = Dimensions.get("window").height;

interface ButtonProps {
  buttonFunction: Function;
  colour: string;
  position: string;
}

const SquareButton: React.FC<ButtonProps> = ({
  buttonFunction,
  colour,
  position,
}) => {
  const positionOption: Record<string, any> = {
    top: { x: "40%", y: "7.5%" },
    left: { x: "7.5%", y: "40%" },
    down: { x: "40%", y: "72.5%" },
    right: { x: "72.5%", y: "40%" },
  };

  return (
    <Rect
      x={positionOption[position].x}
      y={positionOption[position].y}
      width={height / 32}
      height={height / 32}
      onPress={() => buttonFunction()}
      stroke={colour}
      strokeWidth="2"
      fill="transparent"
    />
  );
};

export default SquareButton;
