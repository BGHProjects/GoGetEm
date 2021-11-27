import React, { FC, useEffect, useState } from "react";
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

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ChasedownRolesScreen = ({ navigation, route }) => {
  const configDetails = route.params;
  let scoreDetails;
  const [topColour, setTopColour] = useState(configDetails.colour);
  const [topScore, setTopScore] = useState(configDetails.player1Score);
  const [middleColour, setMiddleColour] = useState(configDetails.player2Colour);
  const [middleScore, setMiddleScore] = useState(configDetails.player2Score);
  const [bottomColour, setBottomColour] = useState(configDetails.player3Colour);
  const [bottomScore, setBottomScore] = useState(configDetails.player3Score);

  if (configDetails.flag === "config") {
    scoreDetails = {
      player1Score: 0,
      player2Score: 0,
      player3Score: 0,
      currentRound: 1,
      gameOver: false,
      targetPlayer: 2,
    };
  }

  let totalDetails = { ...configDetails, ...scoreDetails };

  useEffect(() => {
    if (totalDetails.currentRound === 4 || totalDetails.currentRound === 7) {
      setTopColour(totalDetails.colour);
      setTopScore(totalDetails.player1Score);
      setMiddleColour(totalDetails.player2Colour);
      setMiddleScore(totalDetails.player2Score);
      setBottomColour(totalDetails.player3Colour);
      setBottomScore(totalDetails.player3Score);
      totalDetails.targetPlayer = 2;
    } else if (
      totalDetails.currentRound === 2 ||
      totalDetails.currentRound === 5
    ) {
      setTopColour(totalDetails.player3Colour);
      setTopScore(totalDetails.player3Score);
      setMiddleColour(totalDetails.colour);
      setMiddleScore(totalDetails.player1Score);
      setBottomColour(totalDetails.player2Colour);
      setBottomScore(totalDetails.player2Score);
      totalDetails.targetPlayer = 1;
    } else if (
      totalDetails.currentRound === 3 ||
      totalDetails.currentRound === 6
    ) {
      setTopColour(totalDetails.player2Colour);
      setTopScore(totalDetails.player2Score);
      setMiddleColour(totalDetails.player3Colour);
      setMiddleScore(totalDetails.player3Score);
      setBottomColour(totalDetails.colour);
      setBottomScore(totalDetails.player1Score);
      totalDetails.targetPlayer = 3;
    }
  }, [totalDetails]);

  const onPressSubmit = () => {
    navigation.navigate("Chasedown Gameplay", totalDetails);
  };

  if (totalDetails.gameOver) {
    setTimeout(() => {
      navigation.navigate("Main Menu");
    }, 3000);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          right: totalDetails.currentRound % 2 === 0 ? -80 : 80,
          top: 0,
          marginVertical: -30,
        }}
      >
        <View
          style={{
            ...styles.playerRepresentation,
            backgroundColor: `${topColour}`,
          }}
        >
          {totalDetails.flag === "gameplay" && (
            <Text style={styles.scoreText}>{topScore}</Text>
          )}
        </View>
      </View>

      <Ionicons
        name="arrow-down"
        size={40}
        color={"white"}
        style={{
          right: totalDetails.currentRound % 2 === 0 ? -45 : 45,
          top: -5,
          marginVertical: -10,
          transform: [
            {
              rotate: totalDetails.currentRound % 2 === 0 ? "55deg" : "325deg",
            },
          ],
        }}
      />

      <View style={{ right: 0, top: 12, marginVertical: -10 }}>
        <View
          style={{
            ...styles.playerRepresentation,
            backgroundColor: `${middleColour}`,
          }}
        >
          {totalDetails.flag === "gameplay" && (
            <Text style={styles.scoreText}>{middleScore}</Text>
          )}
        </View>
      </View>

      <Ionicons
        name="arrow-down"
        size={40}
        color={"white"}
        style={{
          right: totalDetails.currentRound % 2 === 0 ? 45 : -45,
          top: -10,
          marginVertical: -10,
          transform: [
            {
              rotate: totalDetails.currentRound % 2 === 0 ? "235deg" : "145deg",
            },
          ],
        }}
      />

      <View
        style={{
          right: totalDetails.currentRound % 2 === 0 ? 80 : -80,
          top: 0,
          marginBottom: -100,
        }}
      >
        <View
          style={{
            ...styles.playerRepresentation,
            backgroundColor: `${bottomColour}`,
          }}
        >
          {totalDetails.flag === "gameplay" && (
            <Text style={styles.scoreText}>{bottomScore}</Text>
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
});

export default ChasedownRolesScreen;
