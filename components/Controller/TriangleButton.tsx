import React, { useState } from "react";
import { Polygon } from "react-native-svg";
import { animation } from "./buttonAnimation";

interface ButtonProps {
  buttonFunction?: Function;
  colour: string;
  position: string;
}

const TriangleButton: React.FC<ButtonProps> = ({
  buttonFunction,
  colour,
  position,
}) => {
  const positionOption: Record<string, string> = {
    top: "50,7 36,30 63,30",
    left: "30,36 7,50 30,63",
    down: "50,93 36,69 63,69",
    right: "69,36 93,50 69,63",
  };

  const [buttonOpacity, setButtonOpacity] = useState(1);

  const handleButtonPressed = () => {
    animation(setButtonOpacity);
    buttonFunction();
  };

  return (
    <Polygon
      points={positionOption[position]}
      onPress={() => handleButtonPressed()}
      stroke={colour}
      strokeWidth="2"
      fill="transparent"
      opacity={buttonOpacity}
    />
  );
};

export default TriangleButton;
