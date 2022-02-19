import React from "react";
import CircleButton from "./CircleButton";
import SquareButton from "./SquareButton";
import TriangleButton from "./TriangleButton";
import ShardButton from "./ShardButton";
import PointerButton from "./PointerButton";
import LetterButton from "./LetterButton";
import { split, capitalize } from "lodash";
import { Colors } from "../../constants/Colors";

interface ButtonProps {
  whichButton: string;
  operation: Function;
}

const ControllerButton = ({ whichButton, operation }: ButtonProps) => {
  const parts = split(whichButton, "-");
  let button;

  switch (parts[2]) {
    case "circle":
      button = (
        <CircleButton
          colour={Colors[`${parts[1]}`]}
          position={parts[0]}
          buttonFunction={() => operation()}
        />
      );
      break;
    case "square":
      button = (
        <SquareButton
          colour={Colors[`${parts[1]}`]}
          position={parts[0]}
          buttonFunction={() => operation()}
        />
      );
      break;
    case "triangle":
      button = (
        <TriangleButton
          colour={Colors[`${parts[1]}`]}
          position={parts[0]}
          buttonFunction={() => operation()}
        />
      );
      break;
    case "shard":
      button = (
        <ShardButton
          colour={Colors[`${parts[1]}`]}
          position={parts[0]}
          buttonFunction={() => operation()}
        />
      );
      break;
    case "pointer":
      button = (
        <PointerButton
          colour={Colors[`${parts[1]}`]}
          position={parts[0]}
          buttonFunction={() => operation()}
        />
      );
      break;
    case "letter":
      button = (
        <LetterButton
          colour={Colors[`${parts[1]}`]}
          position={parts[0]}
          letter={capitalize(parts[3])}
          buttonFunction={() => operation()}
        />
      );
      break;
    default:
      button = (
        <CircleButton
          colour={Colors[`${parts[1]}`]}
          position={parts[0]}
          buttonFunction={() => operation()}
        />
      );
      break;
  }
  return button;
};

export default ControllerButton;
