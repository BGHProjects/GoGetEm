import React, { useContext, useState, useReducer } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import MenuButton from "../../components/MenuButton";
import { Colors } from "../../constants/Colors";
import { determineClassic, classicWinnerColour } from "./helpers";
import { handlePostGame } from "../ExpChange/helpers/handlePostGame";
import { useUpdateUser } from "../../tools/hooks/useUpdateUser";
import { UserContext, userReducer } from "../../tools/UserContext";
import * as firebase from "firebase";

const EndGame = ({ navigation, route }) => {
  const userContext = useContext(UserContext);
  const [state, dispatch] = useReducer(userReducer, userContext);
  const user = firebase.database().ref("users/" + userContext.username);
  const gameDetails = route.params;
  const [prevExp, setPrevExp] = useState<number | null>(null);
  const [newExp, setNewExp] = useState<number | null>(null);

  const stringResult: Record<string, string> = {
    Classic: determineClassic(
      gameDetails.player1Score,
      gameDetails.player2Score,
      gameDetails.player3Score
    ),
  };

  const scoreResult: Record<string, string[][]> = {
    Classic: classicWinnerColour(
      gameDetails.player1Score,
      gameDetails.player2Score,
      gameDetails.player3Score,
      gameDetails.colour,
      gameDetails.player2Colour,
      gameDetails.player3Colour
    ),
  };

  if (prevExp === null && newExp === null) {
    const [currentExp, nextLevelExp, updates, increment] = handlePostGame(
      userContext.totalExp,
      gameDetails
    );

    console.log("\nupdates", updates);

    const updateOptions: Record<string, any> = {
      increaseGames: user.update({
        totalGames: userContext.totalGames + 1,
      }),
      increaseWins: user.update({
        totalWins: userContext.totalWins + 1,
      }),
      increaseClassiGames: user.update({
        totalClassicGames: userContext.totalClassicGames + 1,
      }),
      increaseClassicWins: user.update({
        totalClassicWins: userContext.totalClassicWins + 1,
      }),
      increaseDiff1Games: user.update({
        totalDiff1Games: userContext.totalDiff1Games + 1,
      }),
      increaseDiff1Wins: user.update({
        totalDiff1Wins: userContext.totalDiff1Wins + 1,
      }),
      increaseDiff2Games: user.update({
        totalDiff2Games: userContext.totalDiff2Games + 1,
      }),
      increaseDiff2Wins: user.update({
        totalDiff2Wins: userContext.totalDiff2Wins + 1,
      }),
      increaseDiff3Games: user.update({
        totalDiff3Games: userContext.totalDiff3Games + 1,
      }),
      increaseDiff3Wins: user.update({
        totalDiff3Wins: userContext.totalDiff3Wins + 1,
      }),
      increaseDiff4Games: user.update({
        totalDiff4Games: userContext.totalDiff4Games + 1,
      }),
      increaseDiff4Wins: user.update({
        totalDiff4Wins: userContext.totalDiff4Wins + 1,
      }),
      increaseLevel: user.update({
        level: userContext.level + 1,
      }),
      increaseExp: user.update({
        totalExp: increment
          ? userContext.totalExp + increment
          : userContext.totalExp + 0,
      }),
    };

    // Makes all the backend calls
    updates.map((update) => {
      if (update == "increaseExp") {
        dispatch({ type: update, payload: increment });
      } else {
        dispatch({ type: update, payload: 1 });
        updateOptions[update].then((res) => console.log("res", res));
      }
    });

    setPrevExp(currentExp);
    setNewExp(nextLevelExp);
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
