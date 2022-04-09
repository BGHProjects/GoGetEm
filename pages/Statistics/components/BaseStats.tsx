import React, { useContext } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { HStack, Divider } from "native-base";
import { UserContext } from "../../../tools/UserContext";
import StatBasic from "./StatBasic";
import StatFull from "./StatFull";
import { calcExpToNextLevel } from "../../../tools/calcNextLevelExp";
import * as firebase from "firebase";

const BaseStats = () => {
  const userContext = useContext(UserContext);
  const nextLevelExp = calcExpToNextLevel(userContext.level);
  const expUntilNextLevel = nextLevelExp - userContext.totalExp;

  console.log("\nuserContext in BaseStats", userContext);

  const db = firebase.database();

  db.ref()
    .child("users")
    .child(userContext.username)
    .get()
    .then((snapshot) => {
      console.log("snapshot", snapshot);
    });

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
        <Divider my={10} />
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
