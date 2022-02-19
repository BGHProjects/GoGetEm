import React from "react";
import { Colors } from "../../../constants/Colors";
import { split, capitalize } from "lodash";

import {
  TopShard,
  TopPointer,
  Circle,
  TopLetter,
  TopTriangle,
  Square,
  LeftShard,
  RightShard,
  DownShard,
  LeftPointer,
  RightPointer,
  DownPointer,
  DownTriangle,
  RightTriangle,
  LeftTriangle,
} from "./Buttons";

interface SelectionProps {
  variant: string;
}

const Selection = ({ variant }: SelectionProps) => {
  let parts = split(variant, "-");
  let colour = parts[1];
  let button;

  if (parts[0] === "outline") {
    button = <Circle colour={Colors[`${colour}`]} />;
  } else {
    switch (parts[2]) {
      case "circle":
        button = <Circle colour={Colors[`${colour}`]} />;
        break;
      case "square":
        button = <Square colour={Colors[`${colour}`]} />;
        break;
      case "triangle":
        switch (parts[0]) {
          case "top":
            button = <TopTriangle colour={Colors[`${colour}`]} />;
            break;
          case "right":
            button = <RightTriangle colour={Colors[`${colour}`]} />;
            break;
          case "down":
            button = <DownTriangle colour={Colors[`${colour}`]} />;
            break;
          case "left":
            button = <LeftTriangle colour={Colors[`${colour}`]} />;
            break;
          default:
            button = <TopTriangle colour={Colors[`${colour}`]} />;
            break;
        }
        break;
      case "shard":
        switch (parts[0]) {
          case "top":
            button = <TopShard colour={Colors[`${colour}`]} />;
            break;
          case "right":
            button = <RightShard colour={Colors[`${colour}`]} />;
            break;
          case "down":
            button = <DownShard colour={Colors[`${colour}`]} />;
            break;
          case "left":
            button = <LeftShard colour={Colors[`${colour}`]} />;
            break;
          default:
            button = <TopShard colour={Colors[`${colour}`]} />;
            break;
        }
        break;
      case "letter":
      case "top":
        button = (
          <TopLetter
            colour={Colors[`${colour}`]}
            letter={capitalize(parts[3])}
          />
        );
        break;
      case "pointer":
        switch (parts[0]) {
          case "top":
            button = <TopPointer colour={Colors[`${colour}`]} />;
            break;
          case "right":
            button = <RightPointer colour={Colors[`${colour}`]} />;
            break;
          case "down":
            button = <DownPointer colour={Colors[`${colour}`]} />;
            break;
          case "left":
            button = <LeftPointer colour={Colors[`${colour}`]} />;
            break;
          default:
            button = <TopPointer colour={Colors[`${colour}`]} />;
            break;
        }
        break;
      default:
        button = <Circle colour={Colors.fluroPink} />;
        break;
    }
  }

  return button;
};

export default Selection;
