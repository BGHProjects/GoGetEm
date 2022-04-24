import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "./Colors";

const height = Dimensions.get("window").height;
const mazeSideLength = height * 0.45;

export const globalStyles = () =>
  StyleSheet.create({
    mazeContainer: {
      marginTop: height / 32,
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
  });

export default globalStyles;
