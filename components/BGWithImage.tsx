import React from "react";
import { StyleSheet, View, SafeAreaView, ImageBackground } from "react-native";

import { Colors } from "../constants/Colors";

interface BGWithImageProps {
  image: string;
  children: JSX.Element;
}

const images = {
  mainMenu: require("../assets/MainMenuBG.jpg"),
  gameModes: require("../assets/GameModesBG.jpg"),
};

const BGWithImage = ({ image, children }: BGWithImageProps) => {
  let imageUsed;

  switch (image) {
    case "mainMenu":
      imageUsed = images.mainMenu;
      break;
    case "gameModes":
      imageUsed = images.gameModes;
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
