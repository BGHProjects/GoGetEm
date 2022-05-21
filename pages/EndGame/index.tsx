import React, { useContext, useState } from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";
import MenuButton from "../../components/MenuButton";
import {
  determineThreePlayer,
  threePlayerWinnerColour,
  determineTwoPlayer,
  twoPlayerWinnerColour,
} from "./helpers";
import { handlePostGame } from "../ExpChange/helpers/handlePostGame";
import { UserContext } from "../../tools/UserContext";
import { Data, Mode, Screens } from "../../constants/types";
import { updateStorageValue } from "../../tools/updateStorageValue";
import EndGameScoreCard from "./components/EndGameScoreCard";
import Unlockables from "../../constants/Unlockables";
import { Colors } from "../../constants/Colors";

const animationDuration = 400;

const EndGame = ({ navigation, route }: any) => {
  const userContext = useContext(UserContext);
  const gameDetails = route.params;
  const [prevExp, setPrevExp] = useState<number | null>(null);
  const [newExp, setNewExp] = useState<number | null>(null);

  const stringResult: Record<Mode, string> = {
    [Mode.Classic]: determineThreePlayer(
      gameDetails.player1Score,
      gameDetails.player2Score,
      gameDetails.player3Score
    ),
    [Mode.Chasedown]: determineThreePlayer(
      gameDetails.player1Score,
      gameDetails.player2Score,
      gameDetails.player3Score
    ),
    [Mode.Hunt]: determineTwoPlayer(
      gameDetails.player1Score,
      gameDetails.player2Score
    ),
    [Mode.TagTeam]: determineTwoPlayer(
      gameDetails.team1Score,
      gameDetails.team2Score
    ),
  };

  const scoreResult: Record<Mode, string[][]> = {
    [Mode.Classic]: threePlayerWinnerColour(
      gameDetails.player1Score,
      gameDetails.player2Score,
      gameDetails.player3Score,
      gameDetails.colour,
      gameDetails.player2Colour,
      gameDetails.player3Colour
    ),
    [Mode.Chasedown]: threePlayerWinnerColour(
      gameDetails.player1Score,
      gameDetails.player2Score,
      gameDetails.player3Score,
      gameDetails.colour,
      gameDetails.player2Colour,
      gameDetails.player3Colour
    ),
    [Mode.Hunt]: twoPlayerWinnerColour(
      gameDetails.player1Score,
      gameDetails.player2Score,
      gameDetails.colour,
      gameDetails.player2Colour
    ),
    [Mode.TagTeam]: twoPlayerWinnerColour(
      gameDetails.team1Score,
      gameDetails.team2Score,
      gameDetails.team1,
      gameDetails.team2
    ),
  };

  // Ensures that this happens only initially, and doesn't happen if the user is at the maximum level
  if (
    prevExp === null &&
    newExp === null &&
    userContext.level < Object.keys(Unlockables).length
  ) {
    const { currentExp, newExp, updates, increment } = handlePostGame(
      userContext.totalExp,
      gameDetails
    );

    // Makes all the backend calls
    updates.map(async (update) => {
      if (update == "TotalExp") {
        userContext.setTotalExp((oldExp) => oldExp + increment);
        updateStorageValue(Data.TotalExp, increment);
      } else {
        userContext[`set${update}`]((old: number) => old + 1);
        updateStorageValue(Data[update as keyof typeof Data], 1);
      }
    });

    setPrevExp(currentExp);
    setNewExp(newExp);
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <Text style={styles.resultLabel}>
        {stringResult[gameDetails.mode as Mode]}
      </Text>
      {scoreResult[gameDetails.mode as Mode].map((player, index) => (
        <EndGameScoreCard
          key={player.toString()}
          player={player}
          gameDetails={gameDetails}
          delay={index * animationDuration}
        />
      ))}

      <MenuButton
        text="Continue"
        operation={() =>
          navigation.navigate(Screens.ExpChange, [
            prevExp,
            newExp,
            gameDetails.mode,
          ])
        }
        delay={scoreResult[gameDetails.mode as Mode].length * animationDuration}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryBackground,
  },
  resultLabel: {
    color: "white",
    fontFamily: "Main-Bold",
    fontSize: 40,
    marginBottom: 40,
  },
});

export default EndGame;
