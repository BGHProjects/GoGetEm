import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { UserContext } from "../../../tools/UserContext";
import StatFull from "./StatFull";
import { Difficulty } from "../../../constants/types";
import { ScrollView } from "react-native-gesture-handler";

const DifficultyStats = () => {
  const userContext = useContext(UserContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.statsContainer}>
        {Object.keys(Difficulty).map((difficulty, index) => (
          <StatFull
            key={difficulty}
            titleLabel={`${
              Difficulty[difficulty as keyof typeof Difficulty]
            } Ratio`}
            winValue={userContext[`totalDiff${index + 1}Wins`]}
            totalValue={userContext[`totalDiff${index + 1}Games`]}
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

export default DifficultyStats;
