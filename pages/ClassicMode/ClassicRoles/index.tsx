import React, { useEffect, useState, useContext, useReducer } from "react";
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import { UserContext, userReducer } from "../../../tools/UserContext";
import * as firebase from "firebase";
import MenuButton from "../../../components/MenuButton";
import { Colors } from "../../../constants/Colors";
import PlayerRepresentation from "./components/PlayerRepresentation";
import Arrow from "./components/Arrow";

const width = Dimensions.get("window").width;
const contentSize = 200;

const ClassicRolesScreen = ({ navigation, route }) => {
  const userContext = useContext(UserContext);
  const [state, dispatch] = useReducer(userReducer, userContext);

  const configDetails = route.params;
  let scoreDetails;
  const [leftColour, setLeftColour] = useState(configDetails.player2Colour);
  const [leftScore, setLeftScore] = useState(configDetails.player2Score);
  const [rightColour, setRightColour] = useState(configDetails.player3Colour);
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
      setLeftColour(configDetails.player2Colour);
      setLeftScore(configDetails.player2Score);
      setRightColour(configDetails.player3Colour);
      setRightScore(configDetails.player3Score);
    } else {
      setLeftColour(configDetails.player3Colour);
      setLeftScore(configDetails.player3Score);
      setRightColour(configDetails.player2Colour);
      setRightScore(configDetails.player2Score);
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

  // Animation delays

  const animationDelay = 200;
  const animationDuration = 200;
  const pulsateDuration = 750;

  const animationDelays = {
    leftArrow: animationDelay,
    leftPlayer: animationDelay * 2,
    middleArrow: animationDelay * 3,
    rightPlayer: animationDelay * 4,
    rightArrow: animationDelay * 5,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {/*  Top Row Container */}
        <View style={styles.contentRowContainer}>
          <PlayerRepresentation
            colour={configDetails.colour}
            showFlag={totalDetails.flag === "gameplay" ? true : false}
            score={totalDetails.player1Score}
            delay={0}
            pulsateDelay={animationDelays["rightArrow"]} // Right Arrow is the last animation
            whichAnimation="top"
            pulsateDuration={pulsateDuration}
            animationDuration={animationDuration}
          />
        </View>
        {/*  Middle Row Container */}
        <View
          style={[
            styles.contentRowContainer,
            {
              flexDirection: "row",
              justifyContent: "space-evenly",
            },
          ]}
        >
          <Arrow
            rotation={30}
            delay={animationDelays["leftArrow"]}
            animated
            pulsateDuration={pulsateDuration}
            pulsateDelay={animationDelays["rightArrow"]} // Right Arrow is the last animation
            animationDuration={animationDuration}
          />
          <Arrow
            rotation={150}
            delay={animationDelays["rightArrow"]}
            animationDuration={animationDuration}
          />
        </View>
        {/* Bottom Row Container */}
        <View
          style={[
            styles.contentRowContainer,
            {
              flexDirection: "row",
              justifyContent: "space-between",
            },
          ]}
        >
          <PlayerRepresentation
            colour={leftColour}
            showFlag={totalDetails.flag === "gameplay" ? true : false}
            score={leftScore}
            delay={animationDelays["leftPlayer"]}
            whichAnimation="left"
            pulsateDuration={pulsateDuration}
            pulsateDelay={animationDelays["rightArrow"]} // Right Arrow is the last animation
            animationDuration={animationDuration}
          />

          <Arrow
            rotation={270}
            delay={animationDelays["middleArrow"]}
            animationDuration={animationDuration}
          />

          <PlayerRepresentation
            colour={rightColour}
            showFlag={totalDetails.flag === "gameplay" ? true : false}
            score={rightScore}
            delay={animationDelays["rightPlayer"]}
            animationDuration={animationDuration}
          />
        </View>
      </View>

      {!totalDetails.gameOver ? (
        <MenuButton
          text="Start Round"
          shadowColour="red"
          operation={() => onPressSubmit()}
        />
      ) : (
        <View style={styles.noBeginButton}></View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  noBeginButton: {
    backgroundColor: "black",
    width: width / 1.5,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 100,
    paddingVertical: 10,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  playerRepresentation: {
    height: 50,
    width: 50,
    borderRadius: 90,
    justifyContent: "center",
  },
  scoreText: {
    fontSize: 30,
    color: "black",
    alignSelf: "center",
  },
  topToLeftArrow: {
    transform: [{ rotate: "30deg" }],
    alignSelf: "center",
  },
  rightToTopArrow: {
    transform: [{ rotate: "150deg" }],
    alignSelf: "center",
  },
  leftToRightArrow: {
    transform: [{ rotate: "270deg" }],
  },
  leftPlayerMiddleArrowRightPlayer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: width * 0.9,
    alignItems: "center",
  },
  contentContainer: {
    width: contentSize,
    height: contentSize,
    alignSelf: "center",
    marginBottom: 80,
  },
  contentRowContainer: {
    width: "100%",
    height: "33.3%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ClassicRolesScreen;
