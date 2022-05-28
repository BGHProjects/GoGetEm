import React from "react";
import { Circle, Text } from "react-native-svg";
import { circleButtonRadius } from "../../constants/controllerButtons";

export enum LetterOption {
  Controller = 0,
  Selection = 1,
}

interface LetterButtonProps {
  buttonFunction: Function;
  colour: string;
  position: string;
  letter: string;
  which: LetterOption;
}

const LetterButton: React.FC<LetterButtonProps> = ({
  buttonFunction,
  colour,
  position,
  letter,
  which,
}) => {
  const positionOption: Record<string, any> = {
    top: { cx: "50%", cy: "17.5%", tx: "50.5%", ty: "24%" },
    left: { cx: "17.5%", cy: "50%", tx: "17.5%", ty: "56.5%" },
    down: { cx: "50%", cy: "82.5%", tx: "50.5%", ty: "89%" },
    right: { cx: "82.5%", cy: "50%", tx: "82.5%", ty: "56.5%" },
  };

  return (
    <>
      <Text
        x={positionOption[position].tx}
        y={positionOption[position].ty}
        fontSize={which === LetterOption.Controller ? "18" : "14"}
        fill={colour}
        textAnchor="middle"
      >
        {letter}
      </Text>
      <Circle
        cx={positionOption[position].cx}
        cy={positionOption[position].cy}
        r={circleButtonRadius}
        stroke={colour}
        strokeWidth="2"
        fill="transparent"
        onPress={() => buttonFunction()}
      />
    </>
  );
};

export default LetterButton;
