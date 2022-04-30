import React, { useState } from "react";
import { Rect } from "react-native-svg";
import { Dimensions } from "react-native";
import { animation } from "./buttonAnimation";

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
  const positionOption: Record<string, any> = {
    top: { x: "40%", y: "7.5%" },
    left: { x: "7.5%", y: "40%" },
    down: { x: "40%", y: "72.5%" },
    right: { x: "72.5%", y: "40%" },
  };

  const [buttonOpacity, setButtonOpacity] = useState(1);

  const handleButtonPressed = () => {
    animation(setButtonOpacity);
    buttonFunction();
  };

  return (
    <Rect
      x={positionOption[position].x}
      y={positionOption[position].y}
      width={height / 32}
      height={height / 32}
      onPress={() => handleButtonPressed()}
      stroke={colour}
      strokeWidth="2"
      fill="transparent"
      opacity={buttonOpacity}
    />
  );
};

export default SquareButton;
