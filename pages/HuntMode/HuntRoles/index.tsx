import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { ColorGradients, Colors } from "../../../constants/Colors";
import MenuButton from "../../../components/MenuButton";
import GameInfo from "../../../components/RolesScreen/GameInfo";
import Arrow from "../../../components/RolesScreen/Arrow";
import PlayerRepresentation from "../../../components/RolesScreen/PlayerRepresentation";
import BackButton from "../../../components/BackButton";

const contentSize = 200;

const HuntRoles = ({ navigation, route }: any) => {
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
    navigation.navigate("Countdown", totalDetails);
  };

  // Animation delays
  const animationDelay = 500;
  const animationDuration = 500;
  const pulsateDuration = 750;

  const animationDelays = {
    chasers: animationDelay,
    arrows: animationDelay * 2,
    target: animationDelay * 3,
    startButton: animationDelay * 4,
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton backToGameMenu />
      <GameInfo
        difficulty={totalDetails.difficulty}
        rounds={totalDetails.rounds}
        currentRound={totalDetails.currentRound}
        timeLimit={totalDetails.timeLimit}
      />
      <View style={styles.contentContainer}>
        <View
          style={[
            styles.rowContainer,
            {
              transform: [
                {
                  rotate: "45deg",
                },
              ],
            },
          ]}
        >
          {/**
           * Top Left player
           */}
          <PlayerRepresentation
            colour={totalDetails.colour}
            showFlag={totalDetails.flag === "gameplay" ? true : false}
            score={totalDetails.player1Score}
            rotation={-45}
            delay={animationDelays["chasers"]}
            pulsateDelay={animationDelays["target"]} // Target is the last animation
            pulsateDuration={pulsateDuration}
            animationDuration={animationDuration}
            whichAnimation="target" // Just use the same as Chasedown mode
          />
          {/**
           * Top Left arrow
           */}
          <Arrow
            rotation={270}
            delay={animationDelays["arrows"]}
            animationDuration={animationDuration}
          />
          {/**
           * Middle player
           */}
          <PlayerRepresentation
            colour={ColorGradients.white}
            showFlag={totalDetails.flag === "gameplay" ? true : false}
            delay={animationDelays["target"]}
            animationDuration={animationDuration}
          />
          {/**
           * Bottom right arrow
           */}
          <Arrow
            rotation={90}
            delay={animationDelays["arrows"]}
            animationDuration={animationDuration}
          />
          {/**
           * Bottom right player
           */}
          <PlayerRepresentation
            colour={totalDetails.player2Colour}
            showFlag={totalDetails.flag === "gameplay" ? true : false}
            score={totalDetails.player2Score}
            rotation={-45}
            delay={animationDelays["chasers"]}
            animationDuration={animationDuration}
          />
        </View>
      </View>

      <MenuButton
        text={totalDetails.currentRound === 1 ? "Begin" : "Start Round"}
        operation={() => onPressSubmit()}
        delay={animationDelays["startButton"]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkPurple,
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    width: "110%",
    height: contentSize,
    alignSelf: "center",
    marginBottom: 40,
    marginTop: 30,
    justifyContent: "center",
  },
  rowContainer: {
    width: "85%",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-evenly",
  },
});

export default HuntRoles;
