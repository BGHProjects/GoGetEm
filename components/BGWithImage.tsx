import React from "react";
import { StyleSheet, View, SafeAreaView, ImageBackground } from "react-native";
import { Colors } from "../constants/Colors";
import { Backgrounds } from "../constants/Backgrounds";

interface BGWithImageProps {
  image: string;
  children: JSX.Element | JSX.Element[];
}

const BGWithImage = ({ image, children }: BGWithImageProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={Backgrounds[image]}
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
