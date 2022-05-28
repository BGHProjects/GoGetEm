import React from "react";

import { Svg } from "react-native-svg";

import PointerButton from "../../../components/Controller/PointerButton";
import ShardButton from "../../../components/Controller/ShardButton";
import LetterButton, {
  LetterOption,
} from "../../../components/Controller/LetterButton";
import SquareButton from "../../../components/Controller/SquareButton";
import TriangleButton from "../../../components/Controller/TriangleButton";
import CircleButton from "../../../components/Controller/CircleButton";

interface ShapeProps {
  colour: string;
}

interface LetterProps extends ShapeProps {
  letter: string;
}

export const TopShard = ({ colour }: ShapeProps) => (
  <Svg height="100%" width="100%" viewBox="23 0 50 50">
    <ShardButton
      buttonFunction={() => {
        return;
      }}
      colour={colour}
      position="top"
    />
  </Svg>
);

export const LeftShard = ({ colour }: ShapeProps) => (
  <Svg height="100%" width="100%" viewBox="0 22 50 50">
    <ShardButton
      buttonFunction={() => {
        return;
      }}
      colour={colour}
      position="left"
    />
  </Svg>
);

export const RightShard = ({ colour }: ShapeProps) => (
  <Svg height="100%" width="100%" viewBox="50 22 50 50">
    <ShardButton
      buttonFunction={() => {
        return;
      }}
      colour={colour}
      position="right"
    />
  </Svg>
);

export const DownShard = ({ colour }: ShapeProps) => (
  <Svg height="100%" width="100%" viewBox="22 50 50 50">
    <ShardButton
      buttonFunction={() => {
        return;
      }}
      colour={colour}
      position="down"
    />
  </Svg>
);

export const TopPointer = ({ colour }: ShapeProps) => (
  <Svg height="100%" width="100%" viewBox="23 -5 50 50">
    <PointerButton
      buttonFunction={() => {
        return;
      }}
      colour={colour}
      position="top"
    />
  </Svg>
);

export const LeftPointer = ({ colour }: ShapeProps) => (
  <Svg height="100%" width="100%" viewBox="-5 22 50 50">
    <PointerButton
      buttonFunction={() => {
        return;
      }}
      colour={colour}
      position="left"
    />
  </Svg>
);

export const RightPointer = ({ colour }: ShapeProps) => (
  <Svg height="100%" width="100%" viewBox="55 22 50 50">
    <PointerButton
      buttonFunction={() => {
        return;
      }}
      colour={colour}
      position="right"
    />
  </Svg>
);

export const DownPointer = ({ colour }: ShapeProps) => (
  <Svg height="100%" width="100%" viewBox="22 55 50 50">
    <PointerButton
      buttonFunction={() => {
        return;
      }}
      colour={colour}
      position="down"
    />
  </Svg>
);

export const TopLetter = ({ colour, letter }: LetterProps) => (
  <Svg height="120%" width="100%" viewBox="0 0 50 20">
    <LetterButton
      buttonFunction={() => {
        return;
      }}
      colour={colour}
      position="top"
      letter={letter}
      which={LetterOption.Selection}
    />
  </Svg>
);

export const Circle = ({ colour }: ShapeProps) => (
  <Svg height="100%" width="100%" viewBox="0 0 50 20">
    <CircleButton
      buttonFunction={() => {
        return;
      }}
      colour={colour}
      position="top"
    />
  </Svg>
);

export const TopTriangle = ({ colour }: ShapeProps) => (
  <Svg height="100%" width="100%" viewBox="23 -5 50 50">
    <TriangleButton
      buttonFunction={() => {
        return;
      }}
      colour={colour}
      position="top"
    />
  </Svg>
);

export const LeftTriangle = ({ colour }: ShapeProps) => (
  <Svg height="100%" width="100%" viewBox="-5 22 50 50">
    <TriangleButton
      buttonFunction={() => {
        return;
      }}
      colour={colour}
      position="left"
    />
  </Svg>
);

export const RightTriangle = ({ colour }: ShapeProps) => (
  <Svg height="100%" width="100%" viewBox="55 22 50 50">
    <TriangleButton
      buttonFunction={() => {
        return;
      }}
      colour={colour}
      position="right"
    />
  </Svg>
);

export const DownTriangle = ({ colour }: ShapeProps) => (
  <Svg height="100%" width="100%" viewBox="22 55 50 50">
    <TriangleButton
      buttonFunction={() => {
        return;
      }}
      colour={colour}
      position="down"
    />
  </Svg>
);

export const Square = ({ colour }: ShapeProps) => (
  <Svg height="250%" width="250%" viewBox="0 -33 100 100">
    <SquareButton
      buttonFunction={() => {
        return;
      }}
      colour={colour}
      position="top"
    />
  </Svg>
);
