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
const fadeSpeed = 500;
const animSpeed = 700;
const chaseDelay = fadeSpeed * 3;
const animFullLength = CONTENTSIZE * 0.75;
const animHalfLength = animFullLength / 2;

const HuntContent = () => {
  const topOpacity = useSharedValue(0);
  const topX = useSharedValue(0);
  const topY = useSharedValue(0);

  const middleTargetOpacity = useSharedValue(0);
  const TLTargetOpacity = useSharedValue(0);
  const TRTargetOpacity = useSharedValue(0);
  const BLTargetOpacity = useSharedValue(0);
  const BRTargetOpacity = useSharedValue(0);

  const bottomOpacity = useSharedValue(0);
  const bottomX = useSharedValue(0);
  const bottomY = useSharedValue(0);

  const topAnimation = useAnimatedStyle(() => {
    return {
      opacity: topOpacity.value,
      transform: [{ translateX: topX.value }, { translateY: topY.value }],
    };
  });

  const middleTargetAnimation = useAnimatedStyle(() => {
    return {
      opacity: middleTargetOpacity.value,
    };
  });
  const TLTargetAnimation = useAnimatedStyle(() => {
    return {
      opacity: TLTargetOpacity.value,
    };
  });
  const TRTargetAnimation = useAnimatedStyle(() => {
    return {
      opacity: TRTargetOpacity.value,
    };
  });
  const BLTargetAnimation = useAnimatedStyle(() => {
    return {
      opacity: BLTargetOpacity.value,
    };
  });
  const BRTargetAnimation = useAnimatedStyle(() => {
    return {
      opacity: BRTargetOpacity.value,
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
    middleTargetOpacity.value = withDelay(
      fadeSpeed,
      withTiming(1, { duration: fadeSpeed })
    );
    bottomOpacity.value = withTiming(1, { duration: fadeSpeed });
  };

  const chase = () => {
    topX.value = withDelay(
      chaseDelay,
      withRepeat(
        withSequence(
          withTiming(animHalfLength, { duration: animSpeed }),
          withTiming(animHalfLength, { duration: animSpeed }),
          withTiming(animFullLength, { duration: animSpeed }),
          withTiming(animFullLength, { duration: animSpeed }),
          withTiming(0, { duration: animSpeed }),
          withTiming(0, { duration: animSpeed }),
          withTiming(0, { duration: animSpeed })
        ),
        -1,
        true
      )
    );

    topY.value = withDelay(
      chaseDelay,
      withRepeat(
        withSequence(
          withTiming(animHalfLength, { duration: animSpeed }),
          withTiming(animHalfLength, { duration: animSpeed }),
          withTiming(0, { duration: animSpeed }),
          withTiming(0, { duration: animSpeed }),
          withTiming(animFullLength, { duration: animSpeed }),
          withTiming(animFullLength, { duration: animSpeed }),
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
          withTiming(-animFullLength, { duration: animSpeed }),
          withTiming(0, { duration: animSpeed }),
          withTiming(0, { duration: animSpeed })
        ),
        -1,
        true
      )
    );

    const targetPattern = withRepeat(
      withSequence(
        withDelay(animSpeed * 0.5, withTiming(0, { duration: animSpeed / 2 })),
        withDelay(
          animSpeed * 5 + animSpeed / 2,
          withTiming(1, { duration: animSpeed / 2 })
        )
      ),
      -1,
      true
    );

    middleTargetOpacity.value = withDelay(chaseDelay, targetPattern);

    BLTargetOpacity.value = withDelay(
      chaseDelay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: animSpeed / 2 }),
          withTiming(1, { duration: animSpeed / 2 }),
          withDelay(
            animSpeed * 0.5,
            withTiming(0, { duration: animSpeed / 2 })
          ),
          withTiming(0, { duration: animSpeed }),
          withTiming(0, { duration: animSpeed }),
          withTiming(1, { duration: animSpeed / 2 }),
          withTiming(1, { duration: animSpeed / 2 }),
          withDelay(
            animSpeed * 0.5,
            withTiming(0, { duration: animSpeed / 2 })
          ),
          withTiming(0, { duration: animSpeed })
        ),
        -1,
        true
      )
    );

    TRTargetOpacity.value = withDelay(
      chaseDelay + animSpeed * 2,
      targetPattern
    );

    TLTargetOpacity.value = withDelay(
      chaseDelay,
      withRepeat(
        withSequence(
          withTiming(0, { duration: animSpeed }),
          withTiming(0, { duration: animSpeed }),
          withTiming(0, { duration: animSpeed }),
          withTiming(1, { duration: animSpeed / 2 }),
          withTiming(1, { duration: animSpeed / 2 }),
          withDelay(
            animSpeed * 0.5,
            withTiming(0, { duration: animSpeed / 2 })
          ),
          withTiming(0, { duration: animSpeed }),
          withTiming(1, { duration: animSpeed / 2 }),
          withTiming(1, { duration: animSpeed / 2 })
        ),
        -1,
        true
      )
    );

    BRTargetOpacity.value = withDelay(
      chaseDelay + animSpeed * 5,
      targetPattern
    );
  };

  useEffect(() => {
    fadeIn();
    chase();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.playerRepresentation,
          styles.TLTarget,
          TLTargetAnimation,
        ]}
      />
      <Animated.View
        style={[
          styles.playerRepresentation,
          styles.TRTarget,
          TRTargetAnimation,
        ]}
      />
      <Animated.View
        style={[
          styles.playerRepresentation,
          styles.middleTarget,
          middleTargetAnimation,
        ]}
      />
      <Animated.View
        style={[
          styles.playerRepresentation,
          styles.BLTarget,
          BLTargetAnimation,
        ]}
      />
      <Animated.View
        style={[
          styles.playerRepresentation,
          styles.BRTarget,
          BRTargetAnimation,
        ]}
      />
      <Animated.View
        style={[styles.playerRepresentation, styles.topPlayer, topAnimation]}
      />
      <Animated.View
        style={[
          styles.playerRepresentation,
          styles.bottomPlayer,
          bottomAnimation,
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
  topPlayer: { backgroundColor: Colors.gold },
  middleTarget: {
    backgroundColor: Colors.white,
    left: `${FULL / 2 - PLAYERSIZE / 2}%`,
    top: `${FULL / 2 - PLAYERSIZE / 2}%`,
  },
  TLTarget: {
    backgroundColor: Colors.white,
  },
  TRTarget: {
    backgroundColor: Colors.white,
    left: `${FULL - PLAYERSIZE}%`,
  },
  bottomPlayer: {
    backgroundColor: Colors.purple,
    left: `${FULL - PLAYERSIZE}%`,
    top: `${FULL - PLAYERSIZE}%`,
  },
  BRTarget: {
    backgroundColor: Colors.white,
    left: `${FULL - PLAYERSIZE}%`,
    top: `${FULL - PLAYERSIZE}%`,
  },
  BLTarget: {
    backgroundColor: Colors.white,
    top: `${FULL - PLAYERSIZE}%`,
  },
});

export default HuntContent;
