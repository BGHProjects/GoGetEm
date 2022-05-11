import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { UserContext } from "../../../tools/UserContext";
import StatBasic from "./StatBasic";
import StatFull from "./StatFull";
import { calcExpToNextLevel } from "../../../tools/calcNextLevelExp";
import StatProgressBar from "./StatProgressBar";
import { ScrollView } from "react-native-gesture-handler";
import { Colors } from "react-native/Libraries/NewAppScreen";

const BaseStats = () => {
  const userContext = useContext(UserContext);
  const nextLevelExp = calcExpToNextLevel(userContext.level);
  const prevLevelExp =
    userContext.level === 0
      ? nextLevelExp
      : calcExpToNextLevel(userContext.level - 1);
  const expUntilNextLevel = nextLevelExp - userContext.totalExp;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.totalExpContainer}>
          <Text
            style={[
              styles.totalExpLabel,
              {
                fontSize: 20,
                marginBottom: 10,
              },
            ]}
          >
            Total Exp
          </Text>
          <Text
            style={[
              styles.totalExpLabel,
              {
                fontSize: 30,
              },
            ]}
          >
            {userContext.totalExp}
          </Text>
        </View>
        <StatBasic
          titleLabel="Exp Until Next Level"
          valueLabel={expUntilNextLevel}
        />
        {/*
         * If the level is past 0, calculate based on amount between current and next level
         * (so you don't take into account all of the user's exp in calculation)
         */}
        <StatProgressBar
          progressValue={Number(
            userContext.level > 0
              ? userContext.totalExp - prevLevelExp
              : userContext.totalExp
          )}
          completeValue={Number(
            userContext.level > 0 ? nextLevelExp - prevLevelExp : nextLevelExp
          )}
        />
        {/* Purely for spacing */}
        <View style={{ marginBottom: 40 }} />
        <StatFull
          titleLabel="Total Win Ratio"
          winValue={userContext.totalWins}
          totalValue={userContext.totalGames}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  contentContainer: { width: "80%" },
  totalExpLabel: {
    fontFamily: "Main-Bold",
    color: Colors.white,
    textAlign: "center",
  },
  totalExpContainer: {
    width: "100%",
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BaseStats;
