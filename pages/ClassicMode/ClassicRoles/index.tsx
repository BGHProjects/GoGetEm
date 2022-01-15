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

  if (totalDetails.gameOver) {
    /**
     * Accrue exp functionality goes here
     * Set base increment based on if the player won
     * Multiply increment by number of rounds
     * Multiply increment by difficulty played on
     */
    let increment = 0;

    if (
      configDetails.player1Score > configDetails.player2Score &&
      configDetails.player1Score > configDetails.player3Score
    ) {
      increment = 10;
    } else {
      increment = 3;
    }

    increment *= Number(configDetails.rounds);

    switch (configDetails.difficulty) {
      case "Meh":
        break;
      case "Oh OK":
        increment *= 2;
        break;
      case "Hang On":
        increment *= 3;
        break;
      case "What The":
        increment *= 4;
        break;
      default:
        break;
    }

    //Update a value in the database
    firebase
      .database()
      .ref("users/" + userContext.username)
      .update({
        totalExp: (userContext.totalExp += increment),
      });

    setTimeout(() => {
      navigation.navigate("Main Menu");
    }, 3000);
  }

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
