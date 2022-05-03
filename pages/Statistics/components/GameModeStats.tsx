import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { UserContext } from "../../../tools/UserContext";
import StatFull from "./StatFull";
import { ScrollView } from "react-native-gesture-handler";
import { Mode } from "../../../constants/types";

const GameModeStats = () => {
  const userContext = useContext(UserContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.statsContainer}>
        {Object.keys(Mode).map((mode) => (
          <StatFull
            key={mode}
            titleLabel={`${mode} Win Ratio`}
            winValue={userContext[`total${mode}Wins`]}
            totalValue={userContext[`total${mode}Games`]}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    alignItems: "center",
  },
  statsContainer: {
    marginTop: 20,
    width: "80%",
    justifyContent: "space-between",
  },
});

export default GameModeStats;
