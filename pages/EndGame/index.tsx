import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import MenuButton from "../../components/MenuButton";
import { Colors } from "../../constants/Colors";
import { determineThreePlayer, threePlayerWinnerColour } from "./helpers";
import { handlePostGame } from "../ExpChange/helpers/handlePostGame";
import { UserContext } from "../../tools/UserContext";
import * as firebase from "firebase";

const EndGame = ({ navigation, route }) => {
  const userContext = useContext(UserContext);
  const user = firebase.database().ref("users/" + userContext.username);
  const gameDetails = route.params;
  const [prevExp, setPrevExp] = useState<number | null>(null);
  const [newExp, setNewExp] = useState<number | null>(null);

  const stringResult: Record<string, string> = {
    Classic: determineThreePlayer(
      gameDetails.player1Score,
      gameDetails.player2Score,
      gameDetails.player3Score
    ),
    Chasedown: determineThreePlayer(
      gameDetails.player1Score,
      gameDetails.player2Score,
      gameDetails.player3Score
    ),
  };

  const scoreResult: Record<string, string[][]> = {
    Classic: threePlayerWinnerColour(
      gameDetails.player1Score,
      gameDetails.player2Score,
      gameDetails.player3Score,
      gameDetails.colour,
      gameDetails.player2Colour,
      gameDetails.player3Colour
    ),
    Chasedown: threePlayerWinnerColour(
      gameDetails.player1Score,
      gameDetails.player2Score,
      gameDetails.player3Score,
      gameDetails.colour,
      gameDetails.player2Colour,
      gameDetails.player3Colour
    ),
  };

  // Ensures that this happens only initially
  if (prevExp === null && newExp === null) {
    const { currentExp, newExp, updates, increment } = handlePostGame(
      userContext.totalExp,
      gameDetails
    );

    // Maps the 'updates' entry to the firebase database call
    const firebaseUpdates: Record<string, any> = {
      TotalGames: user.update({ totalGames: userContext.totalGames + 1 }),
      TotalWins: user.update({ totalWins: userContext.totalWins + 1 }),
      TotalClassicGames: user.update({
        totalClassicGames: userContext.totalClassicGames + 1,
      }),
      TotalClassicWins: user.update({
        totalClassicWins: userContext.totalClassicWins + 1,
      }),
      TotalChasedownGames: user.update({
        totalChasedownGames: userContext.totalChasedownGames + 1,
      }),
      TotalChasedownWins: user.update({
        totalChasedownWins: userContext.totalChasedownWins + 1,
      }),
      TotalDiff1Games: user.update({
        totalDiff1Games: userContext.totalDiff1Games + 1,
      }),
      TotalDiff1Wins: user.update({
        totalDiff1Wins: userContext.totalDiff1Wins + 1,
      }),
      TotalDiff2Games: user.update({
        totalDiff2Games: userContext.totalDiff2Games + 1,
      }),
      TotalDiff2Wins: user.update({
        totalDiff2Wins: userContext.totalDiff2Wins + 1,
      }),
      TotalDiff3Games: user.update({
        totalDiff3Games: userContext.totalDiff3Games + 1,
      }),
      TotalDiff3Wins: user.update({
        totalDiff3Wins: userContext.totalDiff3Wins + 1,
      }),
      TotalDiff4Games: user.update({
        totalDiff4Games: userContext.totalDiff4Games + 1,
      }),
      TotalDiff4Wins: user.update({
        totalDiff4Wins: userContext.totalDiff4Wins + 1,
      }),
    };

    // Makes all the backend calls
    updates.map((update) => {
      if (update == "TotalExp") {
        // Updates Firebase
        user.update({ totalExp: userContext.totalExp + increment });
        // Updates local state
        userContext.setTotalExp((oldExp) => oldExp + increment);
      } else {
        // Updates Firebase
        firebaseUpdates[update];
        // Updates local state
        userContext[`set${update}`]((old) => old + 1);
      }
    });

    setPrevExp(currentExp);
    setNewExp(newExp);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.resultLabel}>{stringResult[gameDetails.mode]}</Text>
      {scoreResult[gameDetails.mode].map((player) => (
        <View
          key={player.toString()}
          style={[
            styles.optionContainer,
            {
              borderColor:
                player[1] === gameDetails.colour
                  ? Colors.yellow
                  : Colors.fluroBlue,
            },
          ]}
        >
          <View
            style={[
              styles.playerRepresentation,
              {
                backgroundColor: player[1],
              },
            ]}
          />
          <Text style={styles.scoreLabel}>{player[0]}</Text>
        </View>
      ))}

      <MenuButton
        text="Continue"
        shadowColour="red"
        operation={() => navigation.navigate("ExpChange", [prevExp, newExp])}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  optionContainer: {
    width: "70%",
    height: 60,
    borderRadius: 5,
    borderWidth: 2,
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  resultLabel: {
    color: "white",
    fontFamily: "Main-Bold",
    fontSize: 40,
    marginBottom: 40,
  },
  playerRepresentation: {
    height: 40,
    width: 40,
    borderRadius: 90,
    alignSelf: "center",
  },
  scoreLabel: {
    color: "white",
    fontSize: 30,
    fontFamily: "Main-Bold",
    marginTop: -5,
  },
});

export default EndGame;
