import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView, Dimensions } from "react-native";
import MenuButton from "../../../components/MenuButton";
import { Colors } from "../../../constants/Colors";
import PlayerRepresentation from "../../../components/RolesScreen/PlayerRepresentation";
import Arrow from "../../../components/RolesScreen/Arrow";
import GameInfo from "../../../components/RolesScreen/GameInfo";

const width = Dimensions.get("window").width;
const contentSize = 200;

const ClassicRolesScreen = ({ navigation, route }) => {
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
      <GameInfo
        difficulty={totalDetails.difficulty}
        rounds={totalDetails.rounds}
        currentRound={totalDetails.currentRound}
      />
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

      <MenuButton
        text={totalDetails.currentRound === 1 ? "Begin" : "Start Round"}
        shadowColour="red"
        operation={() => onPressSubmit()}
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
