import React, {
  useEffect,
  useState,
  useContext,
  useReducer,
  ReactElement,
} from "react";
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import { UserContext, userReducer } from "../../tools/UserContext";
import MenuButton from "../../components/MenuButton";
import { Colors } from "../../constants/Colors";
import { determineClassic, classicWinnerColour } from "./helpers";
import { handlePostGame } from "../ExpChange/helpers/handlePostGame";

const EndGame = ({ navigation, route }) => {
  const userContext = useContext(UserContext);
  const gameDetails = route.params;

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
        operation={() => navigation.navigate("ExpChange", [gameDetails, 70])} // 70 used for testing
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
