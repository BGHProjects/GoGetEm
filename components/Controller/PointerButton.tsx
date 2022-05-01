import React from "react";
import { Polygon } from "react-native-svg";

interface ButtonProps {
  buttonFunction: Function;
  colour: string;
  position: string;
}

const PointerButton: React.FC<ButtonProps> = ({
  buttonFunction,
  colour,
  position,
}) => {
  const positionOption: Record<string, string> = {
    top: "50,7 36,30 50,24 63,30",
    left: "30,36 7,50 30,63 24,50",
    down: "50,93 36,69 50,75 63,69",
    right: "69,36 93,50 69,63 75,50",
  };

  return (
    <Polygon
      points={positionOption[position]}
      onPress={() => buttonFunction()}
      stroke={colour}
      strokeWidth="2"
      fill="transparent"
    />
  );
};

export default PointerButton;
