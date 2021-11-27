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

const HuntRoles = ({ navigation, route }) => {
  const configDetails = route.params;
  let scoreDetails;

  if (configDetails.flag === "config") {
    scoreDetails = {
      player1Score: 0,
      player2Score: 0,
      currentRound: 1,
      gameOver: false,
    };
  }

  let totalDetails = { ...configDetails, ...scoreDetails };

  const onPressSubmit = () => {
    navigation.navigate("Hunt Gameplay", totalDetails);
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
          flexDirection: "row",
          alignSelf: "center",
          justifyContent: "space-evenly",
          width: "80%",
          transform: [
            {
              rotate: "45deg",
            },
          ],
        }}
      >
        <View
          style={{
            ...styles.playerRepresentation,
            backgroundColor: `${configDetails.colour}`,
          }}
        >
          {totalDetails.flag === "gameplay" && (
            <Text style={styles.scoreText}>{configDetails.player1Score}</Text>
          )}
        </View>
        <Ionicons name="arrow-forward" size={40} color={"white"} />
        <View
          style={{
            ...styles.playerRepresentation,
            backgroundColor: "white",
          }}
        />
        <Ionicons name="arrow-back" size={40} color={"white"} />
        <View
          style={{
            ...styles.playerRepresentation,
            backgroundColor: `${configDetails.player2Colour}`,
          }}
        >
          {totalDetails.flag === "gameplay" && (
            <Text style={styles.scoreText}>{configDetails.player2Score}</Text>
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
    marginBottom: 50,
    justifyContent: "center",
  },
  scoreText: {
    fontSize: 30,
    color: "black",
    alignSelf: "center",
    transform: [
      {
        rotate: "-45deg",
      },
    ],
  },
});

export default HuntRoles;
