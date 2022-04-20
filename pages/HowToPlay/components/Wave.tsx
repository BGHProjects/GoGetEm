import React, { ReactElement, ReactNode } from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { Vector } from "react-native-redash";

// import { SlideProps } from "./Slide";

export const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");
export const MIN_LEDGE = 25;
export const MARGIN_WIDTH = MIN_LEDGE + 50;

const AnimatedPath = Animated.createAnimatedComponent(Path);

export enum Side {
  LEFT,
  RIGHT,
  NONE,
}

interface WaveProps {
  side: Side;
  children: ReactNode;
  position: Vector<Animated.SharedValue<number>>;
}

const Wave = ({ side, children, position }: WaveProps) => {
  const animatedProps = useAnimatedProps(() => {
    const d = ["M 0 0", ` H ${position.x.value}`, `V ${HEIGHT}`, `H 0`, "Z"];
    return {
      d: d.join(" "),
    };
  });

  return (
    <MaskedView
      style={StyleSheet.absoluteFill}
      maskElement={
        <Svg
          style={[
            StyleSheet.absoluteFill,
            {
              transform: [{ rotateY: side === Side.RIGHT ? "180deg" : "0deg" }],
            },
          ]}
        >
          <AnimatedPath animatedProps={animatedProps} fill="black" />
        </Svg>
      }
    >
      {children}
    </MaskedView>
  );
};

export default Wave;
