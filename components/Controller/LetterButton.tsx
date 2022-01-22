import React from "react";
import { Circle, Text } from "react-native-svg";
import { Dimensions } from "react-native";

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
  {
    switch (position) {
      case "top":
        return (
          <>
            <Text
              x="50%"
              y="23.5%"
              fontSize="18"
              fill={colour}
              textAnchor="middle"
              onPress={() => buttonFunction()}
            >
              {letter}
            </Text>
            <Circle
              cx="50%"
              cy="17.5%"
              r={height / 52}
              onPress={() => buttonFunction()}
              stroke={colour}
              strokeWidth="2"
              fill="transparent"
            ></Circle>
          </>
        );
      case "left":
        return (
          <>
            <Text
              x="17.5%"
              y="56%"
              fontSize="18"
              fill={colour}
              textAnchor="middle"
              onPress={() => buttonFunction()}
            >
              {letter}
            </Text>
            <Circle
              cx="17.5%"
              cy="50%"
              r={height / 52}
              onPress={() => buttonFunction()}
              stroke={colour}
              strokeWidth="2"
              fill="transparent"
            />
          </>
        );
      case "down":
        return (
          <>
            <Text
              x="50%"
              y="88.5%"
              fontSize="18"
              fill={colour}
              textAnchor="middle"
              onPress={() => buttonFunction()}
            >
              {letter}
            </Text>
            <Circle
              cx="50%"
              cy="82.5%"
              r={height / 52}
              onPress={() => buttonFunction()}
              stroke={colour}
              strokeWidth="2"
              fill="transparent"
            />
          </>
        );
      case "right":
        return (
          <>
            <Text
              x="82.5%"
              y="56%"
              fontSize="18"
              fill={colour}
              textAnchor="middle"
              onPress={() => buttonFunction()}
            >
              {letter}
            </Text>
            <Circle
              cx="82.5%"
              cy="50%"
              r={height / 52}
              onPress={() => buttonFunction()}
              stroke={colour}
              strokeWidth="2"
              fill="transparent"
            />
          </>
        );
      default:
        return (
          <>
            <Text
              x="82.5%"
              y="56%"
              fontSize="18"
              fill={colour}
              textAnchor="middle"
              onPress={() => buttonFunction()}
            >
              {letter}
            </Text>
            <Circle
              cx="82.5%"
              cy="50%"
              r={height / 52}
              onPress={() => buttonFunction()}
              stroke={colour}
              strokeWidth="2"
              fill="transparent"
            />
          </>
        );
    }
  }
};

export default LetterButton;
