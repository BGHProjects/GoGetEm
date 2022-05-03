import React, { ReactNode } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../../../constants/Colors";
import BaseStats from "./BaseStats";
import DifficultyStats from "./DifficultyStats";
import GameModeStats from "./GameModeStats";

const StatisticsSlide = ({ slide: { color, variant } }: any) => {
  const whichContent: Record<string, ReactNode> = {
    Base: <BaseStats />,
    "Game Mode": <GameModeStats />,
    Difficulty: <DifficultyStats />,
  };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {variant}
          {variant === "Base" && " Stats"}
        </Text>
      </View>
      {whichContent[variant]}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  title: {
    color: Colors.white,
    fontFamily: "Main-Bold",
    fontSize: 30,
    textAlign: "center",
  },
});

export default StatisticsSlide;
