import React from "react";
import { Circle, Text } from "react-native-svg";
import { Dimensions, View, TouchableWithoutFeedback } from "react-native";

const height = Dimensions.get("window").height;

interface ButtonProps {
  buttonFunction: Function;
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
    top: { cx: "50%", cy: "17.5%", tx: "50%", ty: "30%" },
    left: { cx: "17.5%", cy: "50%", tx: "17.5%", ty: "62%" },
    down: { cx: "50%", cy: "82.5%", tx: "50%", ty: "94%" },
    right: { cx: "82.5%", cy: "50%", tx: "82.5%", ty: "62%" },
  };

  return (
    <>
      <Text
        x={positionOption[position].tx}
        y={positionOption[position].ty}
        fontSize="18"
        fill={colour}
        textAnchor="middle"
      >
        {letter}
      </Text>
      <Circle
        cx={positionOption[position].cx}
        cy={positionOption[position].cy}
        r={height / 52}
        stroke={colour}
        strokeWidth="2"
        fill="transparent"
        onPress={() => buttonFunction()}
      />
    </>
  );
};

export default LetterButton;
