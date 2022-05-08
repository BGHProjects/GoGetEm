import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../../../constants/Colors";
import { Mode } from "../../../constants/types";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { useIsFocused } from "@react-navigation/native";
import EndGamePlayer from "./EndGamePlayer";

interface EndGameScoreCardProps {
  player: string[] | string[][];
  gameDetails: any;
  delay: number;
}

const animationDuration = 400;

const EndGameScoreCard = ({
  player,
  gameDetails,
  delay,
}: EndGameScoreCardProps) => {
  const isFocused = useIsFocused();
  const cardOpacity = useSharedValue(0);
  const cardScale = useSharedValue(0.7);

  const fadeStyle = useAnimatedStyle(() => {
    return {
      opacity: cardOpacity.value,
      transform: [{ scale: cardScale.value }],
    };
  }, []);

  useEffect(() => {
    cardOpacity.value = 0;
    cardScale.value = 0.7;
    if (isFocused) {
      cardOpacity.value = withDelay(
        delay,
        withTiming(1, { duration: animationDuration })
      );
      cardScale.value = withDelay(
        delay,
        withTiming(1, { duration: animationDuration })
      );
    }
  }, [isFocused]);

  return (
    <Animated.View
      key={player.toString()}
      style={[
        fadeStyle,
        styles.optionContainer,
        {
          borderColor:
            player[1] === gameDetails.colour ||
            player[1][0] === gameDetails.colour
              ? Colors.gold
              : Colors.fluroBlue,
        },
      ]}
    >
      {/**
       * If its a team game, display both members of the team
       */}
      {gameDetails.mode === Mode.TagTeam ? (
        <>
          <View style={styles.playerRow}>
            {player[1].map((player: any) => (
              <EndGamePlayer player={player[1][0]} key={player.toString()} />
            ))}
          </View>

          <Text style={styles.scoreLabel}>{player[0]}</Text>
        </>
      ) : (
        <>
          <EndGamePlayer
            player={player[1] as string[]}
            key={player.toString()}
          />
          <Text style={styles.scoreLabel}>{player[0]}</Text>
        </>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  playerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 90,
  },
  optionContainer: {
    width: "70%",
    height: 60,
    borderRadius: 5,
    borderWidth: 3,
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  scoreLabel: {
    color: "white",
    fontSize: 30,
    fontFamily: "Main-Bold",
    marginTop: -5,
  },
});

export default EndGameScoreCard;
