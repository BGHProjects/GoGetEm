import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Colors } from "../../../constants/Colors";
import GameInfo from "../../../components/RolesScreen/GameInfo";
import MenuButton from "../../../components/MenuButton";
import PlayerRepresentation from "../../../components/RolesScreen/PlayerRepresentation";
import Arrow from "../../../components/RolesScreen/Arrow";

const contentSize = 200;

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

  // Animation delays
  const animationDelay = 500;
  const animationDuration = 500;
  const pulsateDuration = 750;

  const animationDelays = {
    chasers: animationDelay,
    arrows: animationDelay * 2,
    targets: animationDelay * 3,
    scores: animationDelay * 4,
  };

  return (
    <SafeAreaView style={styles.container}>
      <GameInfo
        difficulty={totalDetails.difficulty}
        rounds={totalDetails.rounds}
        currentRound={totalDetails.currentRound}
      />
      <View style={styles.contentContainer}>
        {/**Score indicators */}
        <View style={styles.indicatorRow}>
          <PlayerRepresentation
            colour={"transparent"}
            showFlag
            score={totalDetails.team1Score}
            delay={animationDelays["scores"]}
            animationDuration={animationDuration}
          />
          <PlayerRepresentation
            colour={"transparent"}
            showFlag
            score={totalDetails.team2Score}
            delay={animationDelays["scores"]}
            animationDuration={animationDuration}
          />
        </View>

        {/**First row of indicators */}

        <View style={styles.indicatorRow}>
          <PlayerRepresentation
            colour={`${
              configDetails.team1Target === configDetails.player2Colour
                ? configDetails.colour
                : configDetails.player2Colour
            }`}
            delay={animationDelays["chasers"]}
            animationDuration={animationDuration}
            pulsateDelay={animationDelays["scores"]}
            pulsateDuration={pulsateDuration}
            whichAnimation={
              configDetails.team1Target === configDetails.player2Colour
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
            colour={`${
              configDetails.team2Target === configDetails.player3Colour
                ? configDetails.player3Colour
                : configDetails.player4Colour
            }`}
            delay={animationDelays["targets"]}
            animationDuration={animationDuration}
          />
        </View>

        {/**Second row of indicators */}
        <View style={styles.indicatorRow}>
          <PlayerRepresentation
            colour={`${
              configDetails.team1Target === configDetails.player2Colour
                ? configDetails.player2Colour
                : configDetails.colour
            }`}
            delay={animationDelays["targets"]}
            animationDuration={animationDuration}
            pulsateDelay={animationDelays["scores"]}
            pulsateDuration={pulsateDuration}
            whichAnimation={
              configDetails.team1Target === configDetails.colour
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
            colour={`${
              configDetails.team2Target === configDetails.player3Colour
                ? configDetails.player4Colour
                : configDetails.player3Colour
            }`}
            delay={animationDelays["chasers"]}
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
  contentContainer: {
    height: contentSize,
    width: contentSize,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 60,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  indicatorRow: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    width: "100%",
    height: contentSize / 3 + contentSize / 9,
  },
});

export default TagTeamRoles;
