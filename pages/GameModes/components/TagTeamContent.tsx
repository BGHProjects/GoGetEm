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
const animFullLength = CONTENTSIZE * 0.8;
const animHalfLength = animFullLength / 2;
const animQuarterLength = animHalfLength / 1.5;
const positionOffset = 5;
const animValue = 500;

const TagTeamContent = () => {
  const team1ChaserOpacity = useSharedValue(0);
  const team1ChaserX = useSharedValue(0);
  const team1ChaserY = useSharedValue(0);

  const team1TargetOpacity = useSharedValue(0);
  const team1TargetX = useSharedValue(0);
  const team1TargetY = useSharedValue(0);

  const team2ChaserOpacity = useSharedValue(0);
  const team2ChaserX = useSharedValue(0);
  const team2ChaserY = useSharedValue(0);

  const team2TargetOpacity = useSharedValue(0);
  const team2TargetX = useSharedValue(0);
  const team2TargetY = useSharedValue(0);

  const team1Chaser = useAnimatedStyle(() => {
    return {
      opacity: team1ChaserOpacity.value,
      transform: [
        { translateX: team1ChaserX.value },
        { translateY: team1ChaserY.value },
      ],
    };
  });
  const team1Target = useAnimatedStyle(() => {
    return {
      opacity: team1TargetOpacity.value,
      transform: [
        { translateX: team1TargetX.value },
        { translateY: team1TargetY.value },
      ],
    };
  });
  const team2Chaser = useAnimatedStyle(() => {
    return {
      opacity: team2ChaserOpacity.value,
      transform: [
        { translateX: team2ChaserX.value },
        { translateY: team2ChaserY.value },
      ],
    };
  });
  const team2Target = useAnimatedStyle(() => {
    return {
      opacity: team2TargetOpacity.value,
      transform: [
        { translateX: team2TargetX.value },
        { translateY: team2TargetY.value },
      ],
    };
  });

  const fadeIn = () => {
    team1ChaserOpacity.value = withTiming(1, { duration: fadeSpeed });
    team2ChaserOpacity.value = withTiming(1, { duration: fadeSpeed });
    team1TargetOpacity.value = withDelay(
      fadeSpeed,
      withTiming(1, { duration: fadeSpeed })
    );
    team2TargetOpacity.value = withDelay(
      fadeSpeed,
      withTiming(1, { duration: fadeSpeed })
    );
  };

  const chase = () => {
    team1ChaserX.value = withDelay(
      chaseDelay,
      withRepeat(
        withSequence(
          withTiming(animFullLength - positionOffset, { duration: animSpeed }),
          withTiming(animFullLength - positionOffset, { duration: animSpeed }),
          withTiming(-positionOffset, { duration: animSpeed }),
          withTiming(-positionOffset, { duration: animSpeed })
        ),
        -1,
        true
      )
    );

    team1ChaserY.value = withDelay(
      chaseDelay,
      withRepeat(
        withSequence(
          withTiming(0, { duration: animSpeed }),
          withTiming(animQuarterLength + positionOffset * 2, {
            duration: animSpeed,
          }),
          withTiming(animQuarterLength + positionOffset * 2, {
            duration: animSpeed,
          }),
          withTiming(0, { duration: animSpeed })
        ),
        -1,
        true
      )
    );

    team2TargetX.value = withDelay(
      chaseDelay,
      withRepeat(
        withSequence(
          withTiming(0, { duration: animSpeed }),
          withTiming(-animFullLength, { duration: animSpeed }),
          withTiming(-animFullLength, { duration: animSpeed }),
          withTiming(0, { duration: animSpeed })
        ),
        -1,
        true
      )
    );

    team2TargetY.value = withDelay(
      chaseDelay,
      withRepeat(
        withSequence(
          withTiming(animQuarterLength + positionOffset * 2, {
            duration: animSpeed,
          }),
          withTiming(animQuarterLength + positionOffset * 2, {
            duration: animSpeed,
          }),
          withTiming(0, { duration: animSpeed }),
          withTiming(0, { duration: animSpeed })
        ),
        -1,
        true
      )
    );

    team2ChaserX.value = withDelay(
      chaseDelay,
      withRepeat(
        withSequence(
          withTiming(-animFullLength + positionOffset, { duration: animSpeed }),
          withTiming(-animFullLength + positionOffset, { duration: animSpeed }),
          withTiming(positionOffset, { duration: animSpeed }),
          withTiming(positionOffset, { duration: animSpeed })
        ),
        -1,
        true
      )
    );

    team2ChaserY.value = withDelay(
      chaseDelay,
      withRepeat(
        withSequence(
          withTiming(0, { duration: animSpeed }),
          withTiming(-animQuarterLength - positionOffset * 2, {
            duration: animSpeed,
          }),
          withTiming(-animQuarterLength - positionOffset * 2, {
            duration: animSpeed,
          }),
          withTiming(0, { duration: animSpeed })
        ),
        -1,
        true
      )
    );

    team1TargetX.value = withDelay(
      chaseDelay,
      withRepeat(
        withSequence(
          withTiming(0, { duration: animSpeed }),
          withTiming(animFullLength, { duration: animSpeed }),
          withTiming(animFullLength, { duration: animSpeed }),
          withTiming(0, { duration: animSpeed })
        ),
        -1,
        true
      )
    );

    team1TargetY.value = withDelay(
      chaseDelay,
      withRepeat(
        withSequence(
          withTiming(-animQuarterLength - positionOffset * 2, {
            duration: animSpeed,
          }),
          withTiming(-animQuarterLength - positionOffset * 2, {
            duration: animSpeed,
          }),
          withTiming(0, { duration: animSpeed }),
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
      <Animated.View style={[styles.playerRepresentation, team1Chaser]}>
        <LinearGradient
          style={styles.gradientFill}
          colors={ColorGradients.yellow}
          start={XYStart}
          end={XYEnd}
        />
      </Animated.View>
      <Animated.View
        style={[styles.playerRepresentation, styles.team1Target, team1Target]}
      >
        <LinearGradient
          style={styles.gradientFill}
          colors={ColorGradients.fire}
          start={XYStart}
          end={XYEnd}
        />
      </Animated.View>
      <Animated.View
        style={[styles.playerRepresentation, styles.team2Chaser, team2Chaser]}
      >
        <LinearGradient
          style={styles.gradientFill}
          colors={ColorGradients.green}
          start={XYStart}
          end={XYEnd}
        />
      </Animated.View>
      <Animated.View
        style={[styles.playerRepresentation, styles.team2Target, team2Target]}
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
  team1Target: {
    top: `${FULL - PLAYERSIZE + 20}%`,
  },
  team2Target: {
    left: `${FULL - PLAYERSIZE}%`,
  },
  team2Chaser: {
    left: `${FULL - PLAYERSIZE}%`,
    top: `${FULL - PLAYERSIZE + 20}%`,
  },
  gradientFill: {
    height: "100%",
    width: "100%",
    borderRadius: 90,
  },
});

export default TagTeamContent;
