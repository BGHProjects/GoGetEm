import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../../../constants/Colors";
import ImageCredits from "./ImageCredits";
import YoutubeCredits from "./YoutuberCredits";

const CreditsSlide = ({ slide: { color, variant } }: any) => {
  const whichContent: Record<string, React.ReactNode> = {
    Images: <ImageCredits />,
    Youtubers: <YoutubeCredits />,
  };

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{variant}</Text>
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
    marginTop: 80,
  },
  title: {
    color: Colors.white,
    fontFamily: "Main-Bold",
    fontSize: 30,
    textAlign: "center",
  },
});

export default CreditsSlide;
