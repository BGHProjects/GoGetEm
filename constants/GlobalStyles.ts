import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "./Colors";

const height = Dimensions.get("window").height;
const mazeSideLength = height * 0.45;
const cellSize = height * 0.045;
let gridColor = "white";

export const globalStyles = (item?: any) =>
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
    // Not used yet, but will soon
    // Need to make sure all the items are defined before this is used in render
    mazeCell: {
      height: cellSize,
      width: cellSize,
      position: "absolute",
      left: `${item.col}%`,
      top: `${item.row}%`,
      borderColor: gridColor,
      borderTopWidth: item.top,
      borderRightWidth: item.right,
      borderBottomWidth: item.bottom,
      borderLeftWidth: item.left,
      backgroundColor: item.color,
    },
  });

export default globalStyles;
