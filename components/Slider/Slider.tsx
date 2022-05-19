import React, { ReactElement, useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { snapPoint, useVector } from "react-native-redash";
import Wave, { HEIGHT, MARGIN_WIDTH, Side, WIDTH } from "../Wave";
import Button from "../../pages/GameModes/components/Button";
import { SlideProps } from "../../constants/liquidSwipeConstants";
import { NotInBetween } from "../../constants/types";
import onStartValue from "./helpers/onStartValue";
import onActiveValue from "./helpers/onActiveValue";

const PREV = WIDTH;
const NEXT = 0;
const LEFT_SNAP_POINTS = [MARGIN_WIDTH, PREV];
const RIGHT_SNAP_POINTS = [NEXT, WIDTH - MARGIN_WIDTH];

interface SliderProps {
  index: number;
  setIndex: (value: number) => void;
  children: ReactElement<SlideProps>;
  prev?: ReactElement<SlideProps>;
  next?: ReactElement<SlideProps>;
}

const Slider = ({
  index,
  children: current,
  prev,
  next,
  setIndex,
}: SliderProps) => {
  const hasPrev = !!prev;
  const hasNext = !!next;
  const zIndex = useSharedValue(0);
  const left = useVector(0, HEIGHT / 2);
  const right = useVector(0, HEIGHT / 2);
  const activeSide = useSharedValue(Side.NONE);
  const isTransitioningLeft = useSharedValue(false);
  const isTransitioningRight = useSharedValue(false);

  const endValueOptions: Record<NotInBetween, any> = {
    [Side.LEFT]: {
      snapPoints: LEFT_SNAP_POINTS,
      transCheck: PREV,
      sideVal: left,
      transval: isTransitioningLeft.value,
    },
    [Side.RIGHT]: {
      snapPoints: RIGHT_SNAP_POINTS,
      transCheck: NEXT,
      sideVal: right,
      transval: isTransitioningRight.value,
    },
  };

  // Abbreviations for human readability
  const asv = activeSide.value;
  const evo = endValueOptions[asv as NotInBetween];

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: ({ x }) => {
      [activeSide.value, zIndex.value] = onStartValue(x, hasPrev, hasNext);
    },
    onActive: ({ x, y }) => {
      evo.sideVal.x.value = onActiveValue(x, asv);
      evo.sideVal.y.value = y;
    },
    onEnd: ({ velocityX, velocityY, x }) => {
      const dest = snapPoint(x, velocityX, evo.snapPoints);
      const endVal = asv === Side.LEFT ? dest : WIDTH - dest;
      const indexChange = asv === Side.LEFT ? -1 : 1;

      evo.transval = dest === evo.transCheck;
      evo.sideVal.x.value = withSpring(
        endVal,
        {
          velocity: velocityX,
          overshootClamping: evo.transval ? true : false,
          restSpeedThreshold: evo.transval ? 100 : 0.01,
          restDisplacementThreshold: evo.transval ? 100 : 0.01,
        },
        () => {
          if (evo.transVal) {
            runOnJS(setIndex)(index + indexChange);
          } else {
            if (asv === Side.LEFT) zIndex.value = 0;
            activeSide.value = Side.NONE;
          }
        }
      );
      evo.sideVal.y.value = withSpring(HEIGHT / 2, { velocity: velocityY });
    },
  });

  const leftStyle = useAnimatedStyle(() => ({
    zIndex: zIndex.value,
  }));

  useEffect(() => {
    left.x.value = withSpring(MARGIN_WIDTH);
    right.x.value = withSpring(MARGIN_WIDTH);
  }, [index, left, right]);

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={{ flex: 1 }}>
        {current}
        {prev && (
          <Animated.View
            style={[StyleSheet.absoluteFill, leftStyle]}
            pointerEvents="none"
          >
            <Wave
              position={left}
              side={Side.LEFT}
              isTransitioning={isTransitioningLeft}
            >
              {prev}
            </Wave>
            <Button
              position={left}
              side={Side.LEFT}
              activeSide={activeSide}
              image={prev.props.slide.image}
            />
          </Animated.View>
        )}
        {next && (
          <Animated.View style={StyleSheet.absoluteFill} pointerEvents="none">
            <Wave
              position={right}
              side={Side.RIGHT}
              isTransitioning={isTransitioningRight}
            >
              {next}
            </Wave>
            <Button
              position={right}
              side={Side.RIGHT}
              activeSide={activeSide}
              image={next.props.slide.image}
            />
          </Animated.View>
        )}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default Slider;
