import React, { useEffect, useContext, useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserContext, userReducer } from "../../../tools/UserContext";
import * as firebase from "firebase";
import { calcExpToNextLevel } from "../../../tools/calcNextLevelExp";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const TagTeamRoles = ({ navigation, route }) => {
  const userContext = useContext(UserContext);
  const [state, dispatch] = useReducer(userReducer, userContext);
  const configDetails = route.params;
  let scoreDetails;

  if (configDetails.flag === "config") {
    scoreDetails = {
      team1Score: 0,
      team2Score: 0,
      currentRound: 1,
      gameOver: false,
    };
  }

  let totalDetails = { ...configDetails, ...scoreDetails };

  const onPressSubmit = () => {
    navigation.navigate("TagTeam Gameplay", totalDetails);
  };

  useEffect(() => {
    if (totalDetails.gameOver) {
      let increment = 0;
      let baseX = 100;
      let exponent = 1.05;
      let currentExp = userContext.totalExp;
      let newExp = 0;
      let user = firebase.database().ref("users/" + userContext.username);
      let win = false;

      // Update games played
      user.update({
        totalGames: userContext.totalGames + 1,
      });
      dispatch({ type: "increaseGames", payload: 1 });
      user.update({
        totalTagTeamGames: userContext.totalTagTeamGames + 1,
      });
      dispatch({ type: "increaseTagTeamGames", payload: 1 });

      // Determine if player won
      if (configDetails.team1Score > configDetails.team2Score) {
        win = true;
      }

      // Increase wins if applicable and set increment
      if (win) {
        increment = 10;
        user.update({
          totalWins: userContext.totalWins + 1,
        });
        dispatch({ type: "increaseWins", payload: 1 });

        user.update({
          totalTagTeamWins: userContext.totalTagTeamWins + 1,
        });
        dispatch({ type: "increaseTagTeamWins", payload: 1 });
      } else {
        increment = 3;
      }

      // Increase Difficulty Played/Wins
      switch (configDetails.difficulty) {
        case "Meh":
          user.update({
            totalDiff1Games: userContext.totalDiff1Games + 1,
          });
          dispatch({ type: "increaseDiff1Games", payload: 1 });
          if (win) {
            user.update({
              totalDiff1Wins: userContext.totalDiff1Wins + 1,
            });
            dispatch({ type: "increaseDiff1Wins", payload: 1 });
          }
          break;
        case "Oh OK":
          increment *= 2;
          user.update({
            totalDiff2Games: userContext.totalDiff2Games + 1,
          });
          dispatch({ type: "increaseDiff2Games", payload: 1 });
          if (win) {
            user.update({
              totalDiff2Wins: userContext.totalDiff2Wins + 1,
            });
            dispatch({ type: "increaseDiff2Wins", payload: 1 });
          }
          break;
        case "Hang On":
          increment *= 3;
          user.update({
            totalDiff3Games: userContext.totalDiff3Games + 1,
          });
          dispatch({ type: "increaseDiff3Games", payload: 1 });
          if (win) {
            user.update({
              totalDiff3Wins: userContext.totalDiff3Wins + 1,
            });
            dispatch({ type: "increaseDiff3Wins", payload: 1 });
          }
          break;
        case "What The":
          increment *= 4;
          user.update({
            totalDiff4Games: userContext.totalDiff4Games + 1,
          });
          dispatch({ type: "increaseDiff4Games", payload: 1 });
          if (win) {
            user.update({
              totalDiff4Wins: userContext.totalDiff4Wins + 1,
            });
            dispatch({ type: "increaseDiff4Wins", payload: 1 });
          }
          break;
        default:
          break;
      }

      // Handle remaining exp/level calculations
      increment *= configDetails.rounds;
      newExp = currentExp + increment;

      // Handle how many times the user levelled up
      /**
       * Flow of function
       *    Calculate total exp required for level after user's current level
       *        If user's new exp is greater than this total:
       *            increase user's level
       *            Repeat step 1, with an incremented level
       *        Else:
       *            break out of loop
       */

      const identifyNewLevel = (levelToCheck: number) => {
        const nextLevelExp = calcExpToNextLevel(levelToCheck);
        if (nextLevelExp < newExp) {
          user.update({
            level: userContext.level + 1,
          });
          dispatch({ type: "increaseLevel", payload: 1 });
          identifyNewLevel(levelToCheck + 1);
        }
      };

      identifyNewLevel(userContext.level + 1);

      // Update exp
      user.update({
        totalExp: userContext.totalExp + increment,
      });
      dispatch({ type: "increaseExp", payload: increment });

      setTimeout(() => {
        navigation.navigate("Game Modes");
      }, 3000);
    }
  }, [configDetails]);

  return (
    <SafeAreaView style={styles.container}>
      {/**Score indicators */}
      {totalDetails.flag === "gameplay" && (
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            justifyContent: "space-evenly",
            width: "80%",
          }}
        >
          <View
            style={{
              ...styles.playerRepresentation,
              backgroundColor: `white`,
            }}
          >
            <Text style={styles.scoreText}>{configDetails.team1Score}</Text>
          </View>
          {/**This is a cheap hack to make sure the scores align with the teams */}
          <Ionicons name="arrow-forward" size={40} color={"black"} />
          <View
            style={{
              ...styles.playerRepresentation,
              backgroundColor: `white`,
            }}
          >
            <Text style={styles.scoreText}>{configDetails.team2Score}</Text>
          </View>
        </View>
      )}

      {/**First row of indicators */}
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          justifyContent: "space-evenly",
          width: "80%",
        }}
      >
        <View
          style={{
            ...styles.playerRepresentation,
            backgroundColor: `${
              configDetails.team1Target === configDetails.player2Colour
                ? configDetails.colour
                : configDetails.player2Colour
            }`,
            height: 50,
            width: 50,
          }}
        />
        <Ionicons name="arrow-forward" size={40} color={"white"} />

        <View
          style={{
            ...styles.playerRepresentation,
            backgroundColor: `${
              configDetails.team2Target === configDetails.player3Colour
                ? configDetails.player3Colour
                : configDetails.player4Colour
            }`,
            borderWidth: 5,
            borderColor: "white",
            height: 60,
            width: 60,
          }}
        />
      </View>

      {/**Second row of indicators */}
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          justifyContent: "space-evenly",
          width: "80%",
        }}
      >
        <View
          style={{
            ...styles.playerRepresentation,
            backgroundColor: `${
              configDetails.team1Target === configDetails.player2Colour
                ? configDetails.player2Colour
                : configDetails.colour
            }`,
            borderWidth: 5,
            borderColor: "white",
            height: 60,
            width: 60,
          }}
        />
        <Ionicons name="arrow-back" size={40} color={"white"} />
        <View
          style={{
            ...styles.playerRepresentation,
            backgroundColor: `${
              configDetails.team2Target === configDetails.player3Colour
                ? configDetails.player4Colour
                : configDetails.player3Colour
            }`,
            height: 50,
            width: 50,
          }}
        />
      </View>

      {!totalDetails.gameOver ? (
        <View style={styles.beginButton}>
          <TouchableOpacity onPress={() => onPressSubmit()}>
            <Text style={styles.beginButtonLabel}>{`Start\nRound`}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.noBeginButton} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleLabel: {
    fontSize: 40,
    color: "white",
    marginTop: height / 12,
  },
  beginButton: {
    backgroundColor: "red",
    width: width / 1.5,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 100,
  },
  noBeginButton: {
    backgroundColor: "black",
    width: width / 1.5,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 100,
    paddingVertical: 10,
  },
  beginButtonLabel: {
    color: "white",
    fontSize: 25,
    paddingVertical: 10,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  playerRepresentation: {
    height: 50,
    width: 50,
    borderRadius: 90,
    marginBottom: 30,
    justifyContent: "center",
    alignSelf: "center",
  },
  scoreText: {
    fontSize: 30,
    color: "black",
    alignSelf: "center",
  },
});

export default TagTeamRoles;
