import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "./Colors";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;
const mazeSideLength = height * 0.45;
const CONTAINERSIZE = 150;
const cellSize = height * 0.045;

export const globalStyles = () =>
  StyleSheet.create({
    mazeContainer: {
      width: mazeSideLength,
      height: mazeSideLength,
      alignSelf: "center",
      backgroundColor: Colors.transparentBlack,
    },
    clockText: {
      color: "white",
      fontSize: 20,
      fontFamily: "Main",
      marginTop: -3,
    },
    featureContainer: {
      width: CONTAINERSIZE,
      height: CONTAINERSIZE,
      alignItems: "center",
      justifyContent: "center",
    },
    playerContainer: {
      position: "absolute",
      height: cellSize,
      width: cellSize,
      alignItems: "center",
      justifyContent: "center",
    },
    playerAvatar: {
      height: "75%",
      width: "75%",
      borderRadius: 90,
    },
    gradientFill: {
      height: "100%",
      width: "100%",
      borderRadius: 90,
    },
    gameHeaderContainer: {
      marginTop: 20,
      height: 80,
      width: width,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
  });

export default globalStyles;
