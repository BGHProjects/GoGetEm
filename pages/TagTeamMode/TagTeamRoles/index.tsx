import React, { FC, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const TagTeamRoles = ({ navigation, route }) => {
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

  if (totalDetails.gameOver) {
    setTimeout(() => {
      navigation.navigate("Main Menu");
    }, 3000);
  }

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
            backgroundColor: `${configDetails.colour}`,
            borderWidth:
              configDetails.team1Target === configDetails.colour ? 5 : 0,
            borderColor: "white",
            height:
              configDetails.team1Target === configDetails.colour ? 60 : 50,
            width: configDetails.team1Target === configDetails.colour ? 60 : 50,
          }}
        />

        {configDetails.team1Target === configDetails.colour ? (
          <Ionicons name="arrow-back" size={40} color={"white"} />
        ) : (
          <Ionicons name="arrow-forward" size={40} color={"white"} />
        )}

        <View
          style={{
            ...styles.playerRepresentation,
            backgroundColor: `${configDetails.player4Colour}`,
            borderWidth:
              configDetails.team2Target === configDetails.player4Colour ? 5 : 0,
            borderColor: "white",
            height:
              configDetails.team2Target === configDetails.player4Colour
                ? 60
                : 50,
            width:
              configDetails.team2Target === configDetails.player4Colour
                ? 60
                : 50,
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
            backgroundColor: `${configDetails.player2Colour}`,
            borderWidth:
              configDetails.team1Target === configDetails.player2Colour ? 5 : 0,
            borderColor: "white",
            height:
              configDetails.team1Target === configDetails.player2Colour
                ? 60
                : 50,
            width:
              configDetails.team1Target === configDetails.player2Colour
                ? 60
                : 50,
          }}
        />
        <Ionicons name="arrow-back" size={40} color={"white"} />
        <View
          style={{
            ...styles.playerRepresentation,
            backgroundColor: `${configDetails.player3Colour}`,
            borderWidth:
              configDetails.team2Target === configDetails.player3Colour ? 5 : 0,
            borderColor: "white",
            height:
              configDetails.team2Target === configDetails.player3Colour
                ? 60
                : 50,
            width:
              configDetails.team2Target === configDetails.player3Colour
                ? 60
                : 50,
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
    transform: [
      {
        rotate: "-45deg",
      },
    ],
  },
});

export default TagTeamRoles;
