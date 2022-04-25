import { Colors } from "../../../constants/Colors";
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

const CONTENTSIZE = 150;
const PLAYERSIZE = 25;
const FULL = 100;
const OFFSET = 3;
const fadeSpeed = 500;
const animSpeed = 700;
const rotateDelay = fadeSpeed * 3;
const animTop = CONTENTSIZE * 0.65;
const animFullLength = CONTENTSIZE * 0.75;
const animHalfLength = animFullLength / 2;

const ClassicContent = () => {
  const topOpacity = useSharedValue(0);
  const topX = useSharedValue(0);
  const topY = useSharedValue(0);

  const leftOpacity = useSharedValue(0);
  const leftX = useSharedValue(0);
  const leftY = useSharedValue(0);

  const rightOpacity = useSharedValue(0);
  const rightY = useSharedValue(0);
  const rightX = useSharedValue(0);

  const topAnimation = useAnimatedStyle(() => {
    return {
      opacity: topOpacity.value,
      transform: [{ translateX: topX.value }, { translateY: topY.value }],
    };
  });

  const rightAnimation = useAnimatedStyle(() => {
    return {
      opacity: rightOpacity.value,
      transform: [{ translateX: rightX.value }, { translateY: rightY.value }],
    };
  });
  const leftAnimation = useAnimatedStyle(() => {
    return {
      opacity: leftOpacity.value,
      transform: [{ translateX: leftX.value }, { translateY: leftY.value }],
    };
  });

  const fadeIn = () => {
    topOpacity.value = withTiming(1, { duration: fadeSpeed });
    leftOpacity.value = withDelay(
      fadeSpeed,
      withTiming(1, { duration: fadeSpeed })
    );
    rightOpacity.value = withDelay(
      fadeSpeed * 2,
      withTiming(1, { duration: fadeSpeed })
    );
  };

  const rotate = () => {
    topX.value = withDelay(
      rotateDelay,
      withRepeat(
        withSequence(
          withTiming(-animHalfLength, { duration: animSpeed }),
          withTiming(animHalfLength, { duration: animSpeed }),
          withTiming(0, { duration: animSpeed })
        ),
        -1,
        true
      )
    );

    topY.value = withDelay(
      rotateDelay,
      withRepeat(
        withSequence(
          withTiming(animTop, { duration: animSpeed }),
          withTiming(animTop, { duration: animSpeed }),
          withTiming(0, { duration: animSpeed })
        ),
        -1,
        true
      )
    );

    leftX.value = withDelay(
      rotateDelay,
      withRepeat(
        withSequence(
          withTiming(animFullLength, { duration: animSpeed }),
          withTiming(animHalfLength, { duration: animSpeed }),
          withTiming(0, { duration: animSpeed })
        ),
        -1,
        true
      )
    );

    leftY.value = withDelay(
      rotateDelay,
      withRepeat(
        withSequence(
          withTiming(0, { duration: animSpeed }),
          withTiming(-animTop, { duration: animSpeed }),
          withTiming(0, { duration: animSpeed })
        ),
        -1,
        true
      )
    );

    rightX.value = withDelay(
      rotateDelay,
      withRepeat(
        withSequence(
          withTiming(-animHalfLength, { duration: animSpeed }),
          withTiming(-animFullLength, { duration: animSpeed }),
          withTiming(0, { duration: animSpeed })
        ),
        -1,
        true
      )
    );

    rightY.value = withDelay(
      rotateDelay,
      withRepeat(
        withSequence(
          withTiming(-animTop, { duration: animSpeed }),
          withTiming(0, { duration: animSpeed }),
          withTiming(0, { duration: animSpeed })
        ),
        -1,
        true
      )
    );
  };

  useEffect(() => {
    fadeIn();
    rotate();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.playerRepresentation, styles.topPlayer, topAnimation]}
      />
      <Animated.View
        style={[styles.playerRepresentation, styles.leftPlayer, leftAnimation]}
      />
      <Animated.View
        style={[
          styles.playerRepresentation,
          styles.rightPlayer,
          rightAnimation,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: CONTENTSIZE,
    width: CONTENTSIZE,
    position: "relative",
  },
  playerRepresentation: {
    height: `${PLAYERSIZE}%`,
    width: `${PLAYERSIZE}%`,
    borderRadius: 90,
    position: "absolute",
  },
  topPlayer: {
    backgroundColor: Colors.gold,
    top: `${OFFSET}%`,
    left: `${FULL / 2 - PLAYERSIZE / 2}%`,
  },
  leftPlayer: {
    backgroundColor: Colors.fluroBlue,
    top: `${FULL - PLAYERSIZE - OFFSET}%`,
    left: `${-OFFSET}%`,
  },
  rightPlayer: {
    backgroundColor: Colors.orange,
    top: `${FULL - PLAYERSIZE - OFFSET}%`,
    left: `${FULL - PLAYERSIZE + OFFSET}%`,
  },
});

export default ClassicContent;
