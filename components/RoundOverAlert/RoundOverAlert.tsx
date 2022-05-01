import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
} from "react-native-reanimated";
import { XYStart, XYEnd, Colors } from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import globalStyles from "../../constants/GlobalStyles";

interface RoundOverAlertProps {
  begin: boolean;
  gameOver: boolean;
  details?: {
    chaser?: string[] | undefined;
    caught?: string[] | undefined;
    survivor?: string[] | undefined;
  };
}

const RoundOverAlert = ({ begin, gameOver, details }: RoundOverAlertProps) => {
  const gameLabel = gameOver ? "GAME OVER" : "ROUND OVER";

  const xPos = useSharedValue(0);
  const opacity = useSharedValue(1);
  const alertXPos = useSharedValue(-500);

  const survivorXPos = useSharedValue(0);

  const moveAcross = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: xPos.value }],
    };
  });

  const fadeOut = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const slideInLeft = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: alertXPos.value }],
    };
  });

  const survivorShuffle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: survivorXPos.value }],
    };
  });

  useEffect(() => {
    if (begin) {
      // Whole alert component
      alertXPos.value = withTiming(0, { duration: 500 });

      if (details) {
        if (!details.survivor) {
          // Player representations
          xPos.value = withDelay(
            1000,
            withTiming(xPos.value + 99, { duration: 1000 })
          );
          opacity.value = withDelay(1500, withTiming(0, { duration: 500 }));
        } else {
          //   Chasedown survivor
          survivorXPos.value = withDelay(
            1000,
            // No idea how this makes sense, but it does
            withSequence(
              withTiming(survivorXPos.value + 60, { duration: 500 }),
              withTiming(survivorXPos.value - 60, { duration: 500 }),
              withTiming(survivorXPos.value + 5, { duration: 500 })
            )
          );
        }
      }
    }
  }, [begin]);

  return (
    <View style={styles.occlusion}>
      <Animated.View style={[styles.alert, slideInLeft]}>
        <Text style={styles.titleLabel}>{gameLabel}</Text>

        {/* The target in Chasedown won the round */}
        {details && (
          <>
            {!details.survivor && (
              <View style={styles.playerRow}>
                <Animated.View
                  style={[
                    { zIndex: 2 },
                    styles.playerRepresentation,
                    moveAcross,
                  ]}
                >
                  <LinearGradient
                    style={globalStyles().gradientFill}
                    colors={details.chaser}
                    start={XYStart}
                    end={XYEnd}
                  />
                </Animated.View>
                <Animated.View style={[styles.playerRepresentation, fadeOut]}>
                  <LinearGradient
                    style={globalStyles().gradientFill}
                    colors={details.caught}
                    start={XYStart}
                    end={XYEnd}
                  />
                </Animated.View>
              </View>
            )}
            {/* Basically all other situations */}
            {details.survivor && (
              <View style={styles.playerRow}>
                <Animated.View
                  style={[styles.playerRepresentation, survivorShuffle]}
                >
                  <LinearGradient
                    style={globalStyles().gradientFill}
                    colors={details.survivor ?? details.chaser}
                    start={XYStart}
                    end={XYEnd}
                  />
                </Animated.View>
              </View>
            )}
          </>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  occlusion: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: Colors.transparentBlack,
    alignItems: "center",
    justifyContent: "center",
  },
  alert: {
    height: 150,
    width: 250,
    backgroundColor: Colors.primaryBackground,
    borderRadius: 10,
    borderColor: Colors.fluroBlue,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  titleLabel: {
    textAlign: "center",
    fontFamily: "Main-Bold",
    fontSize: 30,
    color: Colors.white,
  },
  playerRow: {
    flexDirection: "row",
    marginTop: 20,
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  playerRepresentation: { height: 50, width: 50, borderRadius: 90 },
});

export default RoundOverAlert;
