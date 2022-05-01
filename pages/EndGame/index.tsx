import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import MenuButton from "../../components/MenuButton";
import {
  determineThreePlayer,
  threePlayerWinnerColour,
  determineTwoPlayer,
  twoPlayerWinnerColour,
} from "./helpers";
import { handlePostGame } from "../ExpChange/helpers/handlePostGame";
import { UserContext } from "../../tools/UserContext";
import { Data, Mode } from "../../constants/types";
import { updateStorageValue } from "../../tools/updateStorageValue";
import { XYStart, XYEnd, Colors } from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import globalStyles from "../../constants/GlobalStyles";

const EndGame = ({ navigation, route }) => {
  const userContext = useContext(UserContext);
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
    Hunt: determineTwoPlayer(
      gameDetails.player1Score,
      gameDetails.player2Score
    ),
    TagTeam: determineTwoPlayer(gameDetails.team1Score, gameDetails.team2Score),
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
    Hunt: twoPlayerWinnerColour(
      gameDetails.player1Score,
      gameDetails.player2Score,
      gameDetails.colour,
      gameDetails.player2Colour
    ),
    TagTeam: twoPlayerWinnerColour(
      gameDetails.team1Score,
      gameDetails.team2Score,
      gameDetails.team1,
      gameDetails.team2
    ),
  };

  // Ensures that this happens only initially
  if (prevExp === null && newExp === null) {
    const { currentExp, newExp, updates, increment } = handlePostGame(
      userContext.totalExp,
      gameDetails
    );

    // Makes all the backend calls
    updates.map(async (update) => {
      if (update == "TotalExp") {
        userContext.setTotalExp((oldExp) => oldExp + increment);
        updateStorageValue(Data.TotalExp, increment);
      } else {
        userContext[`set${update}`]((old) => old + 1);
        updateStorageValue(Data[update], 1);
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
                player[1] === gameDetails.colour ||
                player[1][0] === gameDetails.colour
                  ? Colors.yellow
                  : Colors.fluroBlue,
            },
          ]}
        >
          {/**
           * If its a team game, display both members of the team
           */}
          {gameDetails.mode === Mode.TagTeam ? (
            <>
              <View style={styles.playerRow}>
                <View style={styles.playerRepresentation}>
                  <LinearGradient
                    style={globalStyles().gradientFill}
                    colors={player[1][0]}
                    start={XYStart}
                    end={XYEnd}
                  />
                </View>
                <View style={styles.playerRepresentation}>
                  <LinearGradient
                    style={globalStyles().gradientFill}
                    colors={player[1][1]}
                    start={XYStart}
                    end={XYEnd}
                  />
                </View>
              </View>

              <Text style={styles.scoreLabel}>{player[0]}</Text>
            </>
          ) : (
            <>
              <View style={styles.playerRepresentation}>
                <LinearGradient
                  style={globalStyles().gradientFill}
                  colors={player[1]}
                  start={XYStart}
                  end={XYEnd}
                />
              </View>
              <Text style={styles.scoreLabel}>{player[0]}</Text>
            </>
          )}
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
  playerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 90,
  },
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
