import React, { FC, useEffect, useState, useContext, useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Svg, Line } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { UserContext, userReducer } from "../../../tools/UserContext";
import * as firebase from "firebase";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ClassicRolesScreen = ({ navigation, route }) => {
  const userContext = useContext(UserContext);
  const [state, dispatch] = useReducer(userReducer, userContext);

  const configDetails = route.params;
  let scoreDetails;
  const [leftColour, setLeftColour] = useState(configDetails.player2Colour);
  const [rightColour, setRightColour] = useState(configDetails.player3Colour);
  const [leftScore, setLeftScore] = useState(configDetails.player2Score);
  const [rightScore, setRightScore] = useState(configDetails.player3Score);

  if (configDetails.flag === "config") {
    scoreDetails = {
      player1Score: 0,
      player2Score: 0,
      player3Score: 0,
      currentRound: 1,
      gameOver: false,
    };
  }

  useEffect(() => {
    if (configDetails.currentRound % 2 < 1) {
      setLeftColour(configDetails.player3Colour);
      setRightColour(configDetails.player2Colour);
      setLeftScore(configDetails.player3Score);
      setRightScore(configDetails.player2Score);
    } else {
      setLeftColour(configDetails.player2Colour);
      setRightColour(configDetails.player3Colour);
      setLeftScore(configDetails.player2Score);
      setRightScore(configDetails.player3Score);
    }
  }, [configDetails]);

  let totalDetails = { ...configDetails, ...scoreDetails };

  const onPressSubmit = () => {
    navigation.navigate("Classic Gameplay", totalDetails);
  };

  // Handle what happens when the game is over

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
        totalClassicGames: userContext.totalClassicGames + 1,
      });
      dispatch({ type: "increaseClassicGames", payload: 1 });

      // Determine if player won
      if (
        configDetails.player1Score > configDetails.player2Score &&
        configDetails.player1Score > configDetails.player3Score
      ) {
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
          totalClassicWins: userContext.totalClassicWins + 1,
        });
        dispatch({ type: "increaseClassicWins", payload: 1 });
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
        let nextLevelExp = Math.ceil(baseX * levelToCheck ** exponent);
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
      <View
        style={{
          ...styles.playerRepresentation,
          backgroundColor: `${configDetails.colour}`,
        }}
      >
        {totalDetails.flag === "gameplay" && (
          <Text style={styles.scoreText}>{totalDetails.player1Score}</Text>
        )}
      </View>

      <Ionicons
        name="arrow-down"
        size={40}
        color={"white"}
        style={styles.rightToTopArrow}
      />

      <Ionicons
        name="arrow-down"
        size={40}
        color={"white"}
        style={styles.topToLeftArrow}
      />

      <View style={styles.leftPlayerMiddleArrowRightPlayer}>
        <View
          style={{
            ...styles.playerRepresentation,
            backgroundColor: `${rightColour}`,
          }}
        >
          {totalDetails.flag === "gameplay" && (
            <Text style={styles.scoreText}>{rightScore}</Text>
          )}
        </View>
        <Ionicons
          name="arrow-down"
          size={40}
          color={"white"}
          style={styles.leftToRightArrow}
        />
        <View
          style={{
            ...styles.playerRepresentation,
            backgroundColor: `${leftColour}`,
          }}
        >
          {totalDetails.flag === "gameplay" && (
            <Text style={styles.scoreText}>{leftScore}</Text>
          )}
        </View>
      </View>

      {!totalDetails.gameOver ? (
        <View style={styles.beginButton}>
          <TouchableOpacity onPress={() => onPressSubmit()}>
            <Text style={styles.beginButtonLabel}>{`Start\nRound`}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.noBeginButton}></View>
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
    marginBottom: 50,
    justifyContent: "center",
  },
  scoreText: {
    fontSize: 30,
    color: "black",
    alignSelf: "center",
  },
  topToLeftArrow: {
    position: "absolute",
    left: 130,
    top: 180,
    transform: [{ rotate: "35deg" }],
  },
  rightToTopArrow: {
    position: "absolute",
    left: 190,
    top: 180,
    transform: [{ rotate: "145deg" }],
  },
  leftToRightArrow: {
    position: "absolute",
    left: 140,
    transform: [{ rotate: "270deg" }],
  },
  leftPlayerMiddleArrowRightPlayer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: width * 0.9,
    alignItems: "center",
  },
});

export default ClassicRolesScreen;
