import React from "react";
import { Colors } from "../../../constants/Colors";

import { Svg } from "react-native-svg";

import PointerButton from "../../../components/Controller/PointerButton";
import ShardButton from "../../../components/Controller/ShardButton";
import LetterButton from "../../../components/Controller/LetterButton";
import SquareButton from "../../../components/Controller/SquareButton";
import TriangleButton from "../../../components/Controller/TriangleButton";
import CircleButton from "../../../components/Controller/CircleButton";

export const TopShard = () => (
  <Svg height="100%" width="100%" viewBox="23 0 50 50">
    <ShardButton
      buttonFunction={() => console.log("Choose this one")}
      colour={Colors.fluroPink}
      position="top"
    />
  </Svg>
);

export const TopPointer = () => (
  <Svg height="100%" width="100%" viewBox="23 -5 50 50">
    <PointerButton
      buttonFunction={() => console.log("Choose this one")}
      colour={Colors.fluroPink}
      position="top"
    />
  </Svg>
);

export const TopLetter = () => (
  <Svg height="180%" width="180%" viewBox="0 -30 100 100">
    <LetterButton
      buttonFunction={() => console.log("Select me")}
      colour={Colors.fluroPink}
      position="top"
      letter="A"
    />
  </Svg>
);

export const TopCircle = () => (
  <Svg height="100%" width="100%" viewBox="0 0 50 20">
    <CircleButton
      buttonFunction={() => console.log("Select me")}
      colour={Colors.fluroPink}
      position="top"
    />
  </Svg>
);

export const TopTriangle = () => (
  <Svg height="100%" width="100%" viewBox="23 -5 50 50">
    <TriangleButton
      buttonFunction={() => console.log("Select me")}
      colour={Colors.fluroPink}
      position="top"
    />
  </Svg>
);

export const TopSquare = () => (
  <Svg height="180%" width="180%" viewBox="22 -11 100 100">
    <SquareButton
      buttonFunction={() => console.log("Select me")}
      colour={Colors.fluroPink}
      position="top"
    />
  </Svg>
);
