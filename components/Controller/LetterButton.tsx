import React, { useState } from "react";
import { Circle, Text } from "react-native-svg";
import { Dimensions } from "react-native";
import { animation } from "./buttonAnimation";

const height = Dimensions.get("window").height;

interface ButtonProps {
  buttonFunction?: Function;
  colour: string;
  position: string;
  letter: string;
}

const LetterButton: React.FC<ButtonProps> = ({
  buttonFunction,
  colour,
  position,
  letter,
}) => {
  const positionOption: Record<string, any> = {
    top: { cx: "50%", cy: "17.5%", tx: "50%", ty: "23.5%" },
    left: { cx: "17.5%", cy: "50%", tx: "17.5%", ty: "56%" },
    down: { cx: "50%", cy: "82.5%", tx: "50%", ty: "88.5%" },
    right: { cx: "82.5%", cy: "50%", tx: "82.5%", ty: "57%" },
  };

  const [buttonOpacity, setButtonOpacity] = useState(1);

  const handleButtonPressed = () => {
    animation(setButtonOpacity);
    buttonFunction();
  };

  return (
    <>
      <Text
        x={positionOption[position].tx}
        y={positionOption[position].ty}
        fontSize="18"
        fill={colour}
        textAnchor="middle"
        onPress={() => handleButtonPressed()}
        opacity={buttonOpacity}
      >
        {letter}
      </Text>
      <Circle
        cx={positionOption[position].cx}
        cy={positionOption[position].cx}
        r={height / 52}
        onPress={() => handleButtonPressed()}
        stroke={colour}
        strokeWidth="2"
        fill="transparent"
        opacity={buttonOpacity}
      />
    </>
  );
};

export default LetterButton;
