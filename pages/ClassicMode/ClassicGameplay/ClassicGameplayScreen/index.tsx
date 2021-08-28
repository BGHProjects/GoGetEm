import React, { FC, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import MazeCell from "../MazeCell";
import Grid from "react-native-grid-component";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const mazeSideLength = height * 0.4;
const cellSize = height * 0.04;
const mazeColumns = Math.floor(mazeSideLength / cellSize);
const mazeRows = Math.floor(mazeSideLength / cellSize);
const mazeGrid: any = [];

const ClassicGameplayScreen = ({ navigation }) => {
  const generateCells = () => {
    for (let rowNum = 0; rowNum < 10; rowNum++) {
      for (let colNum = 0; colNum < 10; colNum++) {
        mazeGrid.push([
          rowNum * 10,
          colNum * 10,
          Math.floor(Math.random() * 2),
          Math.floor(Math.random() * 2),
          Math.floor(Math.random() * 2),
          Math.floor(Math.random() * 2),
        ]);
      }
    }
  };

  generateCells();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleLabel}>Classic Gameplay</Text>
      <View style={styles.mazeContainer}>
        {mazeGrid.map((item: any) => (
          <View
            key={[item[0], item[1]].toString()}
            style={{
              height: cellSize,
              width: cellSize,
              position: "absolute",
              left: `${item[0]}%`,
              top: `${item[1]}%`,
              borderColor: "blue",
              borderRightWidth: item[2],
              borderLeftWidth: item[3],
              borderTopWidth: item[4],
              borderBottomWidth: item[5],
            }}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleLabel: {
    fontSize: 40,
    color: "white",
    marginTop: height / 12,
  },
  mazeContainer: {
    marginTop: height / 32,
    width: mazeSideLength,
    height: mazeSideLength,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
  },
});

export default ClassicGameplayScreen;
