import React from "react";
import { Circle } from "react-native-svg";
import { Dimensions } from "react-native";

const height = Dimensions.get("window").height;

interface ButtonProps {
  buttonFunction: Function;
  colour: string;
  position: string;
}

const CircleButton: React.FC<ButtonProps> = ({
  buttonFunction,
  colour,
  position,
}) => {
  const positionOption: Record<string, any> = {
    top: { cx: "50%", cy: "17.5%" },
    left: { cx: "17.5%", cy: "50%" },
    down: { cx: "50%", cy: "82.5%" },
    right: { cx: "82.5%", cy: "50%" },
  };

  return (
    <Circle
      cx={positionOption[position].cx}
      cy={positionOption[position].cy}
      r={height / 52}
      onPress={() => buttonFunction()}
      stroke={colour}
      strokeWidth="2"
      fill="transparent"
    />
  );
};

export default CircleButton;
