import React from "react";

let index = 0;
let increment = -0.2;
let timeout;

export enum Direction {
  Up = "Up",
  Down = "Down",
}

const transition = (
  whichWay: Direction,
  setFunction: React.Dispatch<React.SetStateAction<number>>
) => {
  let change = increment;
  if (whichWay === Direction.Up) change = -increment;

  setFunction((old) => old + change);
  index++;
  animation(setFunction);
};

export const animation = (
  setFunction: React.Dispatch<React.SetStateAction<number>>
) => {
  if (index < 5) {
    timeout = setTimeout(() => {
      transition(Direction.Down, setFunction);
    }, 5);
  } else if (index < 10) {
    timeout = setTimeout(() => {
      transition(Direction.Up, setFunction);
    }, 5);
  } else {
    index = 0;
  }
};
