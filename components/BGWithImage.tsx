import React from "react";
import { StyleSheet, View, SafeAreaView, ImageBackground } from "react-native";

import { Colors } from "../constants/Colors";
import { Backgrounds } from "../constants/Backgrounds";

interface BGWithImageProps {
  image: string;
  children: JSX.Element;
}

const BGWithImage = ({ image, children }: BGWithImageProps) => {
  let imageUsed;

  switch (image) {
    case "mainMenu":
      imageUsed = Backgrounds.mainMenu;
      break;
    case "gameModes":
      imageUsed = Backgrounds.gameModes;
      break;
    case "aurora":
      imageUsed = Backgrounds.aurora;
      break;
    case "fire":
      imageUsed = Backgrounds.fire;
      break;
    case "forest":
      imageUsed = Backgrounds.forest;
      break;
    case "mountains":
      imageUsed = Backgrounds.mountains;
      break;
    case "snow":
      imageUsed = Backgrounds.snow;
      break;
    default:
      break;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={imageUsed}
        resizeMode="cover"
        style={styles.container}
      >
        <View style={styles.imageBackground} />
        {children}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "center",
    opacity: 0.5,
    backgroundColor: Colors.primaryBackground,
    position: "absolute",
  },
});

export default BGWithImage;
