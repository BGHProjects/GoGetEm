import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";
import LiquidSwipe from "./components/LiquidSwipe";

const HowToPlay = () => {
  return <LiquidSwipe />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryBackground,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontFamily: "Main-Bold",
    fontSize: 20,
    textAlign: "center",
    color: Colors.white,
  },
});

export default HowToPlay;
