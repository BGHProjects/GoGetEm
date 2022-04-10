import React, { useContext } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { HStack } from "native-base";
import { UserContext } from "../../../tools/UserContext";
import StatBasic from "./StatBasic";
import StatFull from "./StatFull";
import { calcExpToNextLevel } from "../../../tools/calcNextLevelExp";
import StatProgressBar from "./StatProgressBar";

const BaseStats = () => {
  const userContext = useContext(UserContext);
  const nextLevelExp = calcExpToNextLevel(userContext.level);
  const prevLevelExp =
    userContext.level === 0 ? 100 : calcExpToNextLevel(userContext.level - 1);
  const expUntilNextLevel = nextLevelExp - userContext.totalExp;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.contentContainer}>
        <HStack style={{ justifyContent: "space-between" }}>
          <StatBasic titleLabel="Total Exp" valueLabel={userContext.totalExp} />
          <StatBasic
            titleLabel="Exp Until Next Level"
            valueLabel={expUntilNextLevel}
          />
        </HStack>
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
  contentContainer: { marginTop: 20, width: "80%" },
});

export default BaseStats;
