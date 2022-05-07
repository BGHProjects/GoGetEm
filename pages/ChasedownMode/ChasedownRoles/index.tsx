import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Colors } from "../../../constants/Colors";
import MenuButton from "../../../components/MenuButton";
import GameInfo from "../../../components/RolesScreen/GameInfo";
import Arrow from "../../../components/RolesScreen/Arrow";
import PlayerRepresentation from "../../../components/RolesScreen/PlayerRepresentation";

const contentSize = 200;

const ChasedownRolesScreen = ({ navigation, route }: any) => {
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
  };

  return (
    <SafeAreaView style={styles.container}>
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
                  rotate:
                    totalDetails.currentRound % 2 === 0 ? "135deg" : "45deg",
                },
              ],
            },
          ]}
        >
          <PlayerRepresentation
            colour={topColour}
            showFlag={totalDetails.flag === "gameplay" ? true : false}
            score={topScore}
            rotation={totalDetails.currentRound % 2 === 0 ? -135 : -45}
            delay={animationDelays["chasers"]}
            pulsateDelay={animationDelays["target"]} // Target is the last animation
            pulsateDuration={pulsateDuration}
            animationDuration={animationDuration}
            whichAnimation={
              totalDetails.currentRound === 1 ||
              totalDetails.currentRound === 4 ||
              totalDetails.currentRound === 7
                ? "target"
                : undefined
            }
          />
          <Arrow
            rotation={270}
            delay={animationDelays["arrows"]}
            animationDuration={animationDuration}
          />
          <PlayerRepresentation
            colour={middleColour}
            showFlag={totalDetails.flag === "gameplay" ? true : false}
            score={middleScore}
            rotation={totalDetails.currentRound % 2 === 0 ? -135 : -45}
            delay={animationDelays["target"]}
            pulsateDelay={animationDelays["target"]} // Target is the last animation
            pulsateDuration={pulsateDuration}
            animationDuration={animationDuration}
            whichAnimation={
              totalDetails.currentRound === 2 || totalDetails.currentRound === 5
                ? "target"
                : undefined
            }
          />
          <Arrow
            rotation={90}
            delay={animationDelays["arrows"]}
            animationDuration={animationDuration}
          />
          <PlayerRepresentation
            colour={bottomColour}
            showFlag={totalDetails.flag === "gameplay" ? true : false}
            score={bottomScore}
            rotation={totalDetails.currentRound % 2 === 0 ? -135 : -45}
            delay={animationDelays["chasers"]}
            pulsateDelay={animationDelays["target"]} // Target is the last animation
            pulsateDuration={pulsateDuration}
            animationDuration={animationDuration}
            whichAnimation={
              totalDetails.currentRound === 3 || totalDetails.currentRound === 6
                ? "target"
                : undefined
            }
          />
        </View>
      </View>

      <MenuButton
        text={totalDetails.currentRound === 1 ? "Begin" : "Start Round"}
        shadowColour={Colors.fluroBlue}
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

export default ChasedownRolesScreen;
