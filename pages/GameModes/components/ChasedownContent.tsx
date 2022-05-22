import { XYStart, XYEnd, ColorGradients } from "../../../constants/Colors";
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
import { LinearGradient } from "expo-linear-gradient";

const CONTENTSIZE = 150;
const PLAYERSIZE = 25;
const FULL = 100;
const fadeSpeed = 500;
const animSpeed = 700;
const chaseDelay = fadeSpeed * 3;
const animFullLength = CONTENTSIZE * 0.75;
const animHalfLength = animFullLength / 2;
const animValue = 500;

const ChasedownContent = () => {
  const topOpacity = useSharedValue(0);
  const topX = useSharedValue(0);
  const topY = useSharedValue(0);

  const middleOpacity = useSharedValue(0);
  const middleX = useSharedValue(0);
  const middleY = useSharedValue(0);

  const bottomOpacity = useSharedValue(0);
  const bottomX = useSharedValue(0);
  const bottomY = useSharedValue(0);

  const topAnimation = useAnimatedStyle(() => {
    return {
      opacity: topOpacity.value,
      transform: [{ translateX: topX.value }, { translateY: topY.value }],
    };
  });
  const middleAnimation = useAnimatedStyle(() => {
    return {
      opacity: middleOpacity.value,
      transform: [{ translateX: middleX.value }, { translateY: middleY.value }],
    };
  });
  const bottomAnimation = useAnimatedStyle(() => {
    return {
      opacity: bottomOpacity.value,
      transform: [{ translateX: bottomX.value }, { translateY: bottomY.value }],
    };
  });

  const fadeIn = () => {
    topOpacity.value = withTiming(1, { duration: fadeSpeed });
    middleOpacity.value = withDelay(
      fadeSpeed,
      withTiming(1, { duration: fadeSpeed })
    );
    bottomOpacity.value = withTiming(1, { duration: fadeSpeed });
  };

  const topChaseSequence = withDelay(
    chaseDelay,
    withRepeat(
      withSequence(
        withTiming(animHalfLength, { duration: animSpeed }),
        withTiming(animHalfLength, { duration: animSpeed }),
        withTiming(0, { duration: animSpeed }),
        withTiming(0, { duration: animSpeed }),
        withTiming(0, { duration: animSpeed })
      ),
      -1,
      true
    )
  );

  const chase = () => {
    topX.value = topChaseSequence;
    topY.value = topChaseSequence;

    middleX.value = withDelay(
      chaseDelay,
      withRepeat(
        withSequence(
          withTiming(-animHalfLength, { duration: animSpeed }),
          withTiming(-animHalfLength, { duration: animSpeed }),
          withTiming(animHalfLength, { duration: animSpeed }),
          withTiming(animHalfLength, { duration: animSpeed }),
          withTiming(0, { duration: animSpeed })
        ),
        -1,
        true
      )
    );

    middleY.value = withDelay(
      chaseDelay,
      withRepeat(
        withSequence(
          withTiming(animHalfLength, { duration: animSpeed }),
          withTiming(-animHalfLength, { duration: animSpeed }),
          withTiming(-animHalfLength, { duration: animSpeed }),
          withTiming(animHalfLength, { duration: animSpeed }),
          withTiming(0, { duration: animSpeed })
        ),
        -1,
        true
      )
    );

    bottomX.value = withDelay(
      chaseDelay,
      withRepeat(
        withSequence(
          withTiming(0, { duration: animSpeed }),
          withTiming(-animFullLength, { duration: animSpeed }),
          withTiming(-animFullLength, { duration: animSpeed }),
          withTiming(0, { duration: animSpeed }),
          withTiming(0, { duration: animSpeed })
        ),
        -1,
        true
      )
    );

    bottomY.value = withDelay(
      chaseDelay,
      withRepeat(
        withSequence(
          withTiming(0, { duration: animSpeed }),
          withTiming(0, { duration: animSpeed }),
          withTiming(0, { duration: animSpeed }),
          withTiming(-animFullLength, { duration: animSpeed }),
          withTiming(0, { duration: animSpeed })
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
      fadeIn();
      chase();
    }, animValue);
  }, []);

  return (
    <Animated.View style={[fadeStyle, styles.container]}>
      <Animated.View style={[styles.playerRepresentation, topAnimation]}>
        <LinearGradient
          style={styles.gradientFill}
          colors={ColorGradients.yellow}
          start={XYStart}
          end={XYEnd}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.playerRepresentation,
          styles.middlePlayer,
          middleAnimation,
        ]}
      >
        <LinearGradient
          style={styles.gradientFill}
          colors={ColorGradients.green}
          start={XYStart}
          end={XYEnd}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.playerRepresentation,
          styles.bottomPlayer,
          bottomAnimation,
        ]}
      >
        <LinearGradient
          style={styles.gradientFill}
          colors={ColorGradients.purple}
          start={XYStart}
          end={XYEnd}
        />
      </Animated.View>
    </Animated.View>
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
  middlePlayer: {
    left: `${FULL / 2 - PLAYERSIZE / 2}%`,
    top: `${FULL / 2 - PLAYERSIZE / 2}%`,
  },
  bottomPlayer: {
    left: `${FULL - PLAYERSIZE}%`,
    top: `${FULL - PLAYERSIZE}%`,
  },
  gradientFill: {
    height: "100%",
    width: "100%",
    borderRadius: 90,
  },
});

export default ChasedownContent;
