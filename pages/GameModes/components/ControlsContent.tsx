import {
  XYStart,
  XYEnd,
  Colors,
  ColorGradients,
} from "../../../constants/Colors";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withRepeat,
  withDelay,
} from "react-native-reanimated";
import globalStyles from "../../../constants/GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";

const FULL = 100;
const BUTTONSIZE = 27.5;
const BUTTONPADDING = 3;
const MOVEMENT = 30;
const MOVEMENTDURATION = 700;
const PLAYERSIZE = 37.5;
const animValue = 500;

const ControlsContent = () => {
  const button = [styles.basicCircle, styles.buttonStyle];

  const playerXPos = useSharedValue(-30);
  const playerYPos = useSharedValue(-30);
  const topOpacity = useSharedValue(1);
  const downOpacity = useSharedValue(1);
  const rightOpacity = useSharedValue(1);
  const leftOpacity = useSharedValue(1);

  const playerAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: playerYPos.value },
        { translateX: playerXPos.value },
      ],
    };
  });

  const topAnimation = useAnimatedStyle(() => {
    return {
      opacity: topOpacity.value,
    };
  });
  const downAnimation = useAnimatedStyle(() => {
    return {
      opacity: downOpacity.value,
    };
  });
  const rightAnimation = useAnimatedStyle(() => {
    return {
      opacity: rightOpacity.value,
    };
  });
  const leftAnimation = useAnimatedStyle(() => {
    return {
      opacity: leftOpacity.value,
    };
  });

  const buttonAnimation = withRepeat(
    withSequence(
      withTiming(0, { duration: MOVEMENTDURATION / 2 }),
      withTiming(1, { duration: MOVEMENTDURATION / 2 }),
      withTiming(1, { duration: MOVEMENTDURATION * 3 }) // Pauses for other button presses
    ),
    -1,
    true
  );

  const pressButtons = () => {
    rightOpacity.value = withDelay(
      MOVEMENTDURATION,
      withRepeat(buttonAnimation)
    );

    downOpacity.value = withDelay(
      MOVEMENTDURATION * 2,
      withRepeat(buttonAnimation)
    );

    leftOpacity.value = withDelay(
      MOVEMENTDURATION * 3,
      withRepeat(buttonAnimation)
    );

    topOpacity.value = withDelay(
      MOVEMENTDURATION * 4,
      withRepeat(buttonAnimation)
    );
  };

  const movePlayer = () => {
    playerXPos.value = withRepeat(
      withSequence(
        withDelay(
          MOVEMENTDURATION,
          withTiming(MOVEMENT, { duration: MOVEMENTDURATION })
        ),
        withDelay(
          MOVEMENTDURATION,
          withTiming(-MOVEMENT, { duration: MOVEMENTDURATION })
        )
      ),
      -1,
      true
    );

    playerYPos.value = withDelay(
      MOVEMENTDURATION,
      withRepeat(
        withSequence(
          withDelay(
            MOVEMENTDURATION,
            withTiming(MOVEMENT, { duration: MOVEMENTDURATION })
          ),
          withDelay(
            MOVEMENTDURATION,
            withTiming(-MOVEMENT, { duration: MOVEMENTDURATION })
          )
        ),
        -1,
        true
      )
    );
  };

  const contentOpacity = useSharedValue(0);

  const fadeStyle = useAnimatedStyle(() => {
    return {
      opacity: contentOpacity.value,
    };
  });

  useEffect(() => {
    contentOpacity.value = withDelay(
      animValue,
      withTiming(1, { duration: animValue })
    );
    setTimeout(() => {
      movePlayer();
      pressButtons();
    }, animValue);
  }, []);

  return (
    <Animated.View style={fadeStyle}>
      <View style={globalStyles().featureContainer}>
        <Animated.View style={playerAnimation}>
          <LinearGradient
            style={styles.playerRepresentation}
            colors={ColorGradients.ice}
            start={XYStart}
            end={XYEnd}
          />
        </Animated.View>
      </View>
      <View style={globalStyles().featureContainer}>
        <View style={[styles.basicCircle, styles.outerCircle]}>
          <Animated.View style={[button, styles.topButton, topAnimation]} />
          <Animated.View style={[button, styles.downButton, downAnimation]} />
          <Animated.View style={[button, styles.rightButton, rightAnimation]} />
          <Animated.View style={[button, styles.leftButton, leftAnimation]} />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: 75,
    paddingTop: 125,
    alignItems: "center",
  },
  basicCircle: {
    borderColor: Colors.white,
    borderWidth: 3,
    borderRadius: 90,
  },
  outerCircle: {
    backgroundColor: Colors.transparentBlack,
    height: `${FULL}%`,
    width: `${FULL}%`,
    position: "relative",
  },
  buttonStyle: {
    height: `${BUTTONSIZE}%`,
    width: `${BUTTONSIZE}%`,
    position: "absolute",
  },
  topButton: {
    top: `${BUTTONPADDING}%`,
    left: `${FULL / 2 - BUTTONSIZE / 2}%`,
  },
  downButton: {
    bottom: `${BUTTONPADDING}%`,
    left: `${FULL / 2 - BUTTONSIZE / 2}%`,
  },
  rightButton: {
    bottom: `${FULL / 2 - BUTTONSIZE / 2}%`,
    left: `${FULL - BUTTONSIZE - BUTTONPADDING}%`,
  },
  leftButton: {
    bottom: `${FULL / 2 - BUTTONSIZE / 2}%`,
    right: `${FULL - BUTTONSIZE - BUTTONPADDING}%`,
  },
  playerRepresentation: {
    height: PLAYERSIZE,
    width: PLAYERSIZE,
    borderRadius: 90,
  },
});

export default ControlsContent;
