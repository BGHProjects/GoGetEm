import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import { Svg, Circle } from "react-native-svg";
import {
  generateCells,
  makeMaze,
  trimMaze,
  makeSearchGrid,
} from "../../../tools/MazeAndGridGeneration";
import { aStarSearch } from "../../../tools/BotBrain";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";

const height = Dimensions.get("window").height;
const mazeSideLength = height * 0.45;
const cellSize = height * 0.045;
let mazeGrid: any = [];
const wallWidth = 1;
const gridSquareLength = 10;
const stack: any = [];
let gridColor = "white";
let searchGrid1: any = [];
let searchPath1: any = [];
let player1Score: any;
let player2Score: any;
let playerSize = 4;

const HuntGameplay = ({ navigation, route }) => {
  let gameDetails = route.params;
  const [playerX, setPlayerX] = useState(5);
  const [playerY, setPlayerY] = useState(5);
  const [player2X, setPlayer2X] = useState(95);
  const [player2Y, setPlayer2Y] = useState(95);
  const [targetX, setTargetX] = useState(55);
  const [targetY, setTargetY] = useState(45);
  const [search1IntervalId, setSearch1IntervalId] = useState<any>(null);
  const [roundOver, setRoundOver] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [previousQuadrant, setPreviousQuadrant] = useState<number | null>(null);

  let difficulty =
    gameDetails.difficulty === "Meh"
      ? 700
      : gameDetails.difficulty === "Oh OK"
      ? 500
      : gameDetails.difficulty === "Hang On"
      ? 400
      : 300;

  const movePlayerUp = () => {
    let mazeCell = getMazeCell(playerX, playerY);

    if (playerY > 5 && mazeCell.top === 0 && !roundOver) {
      setPlayerY(playerY - 10);
    }
  };

  const movePlayerRight = () => {
    let mazeCell = getMazeCell(playerX, playerY);

    if (playerX < 95 && mazeCell.right === 0 && !roundOver) {
      setPlayerX(playerX + 10);
    }
  };

  const movePlayerLeft = () => {
    let mazeCell = getMazeCell(playerX, playerY);

    if (playerX > 5 && mazeCell.left === 0 && !roundOver) {
      setPlayerX(playerX - 10);
    }
  };

  const movePlayerDown = () => {
    let mazeCell = getMazeCell(playerX, playerY);

    if (playerY < 95 && mazeCell.bottom === 0 && !roundOver) {
      setPlayerY(playerY + 10);
    }
  };

  function getMazeCell(X: any, Y: any) {
    let digit1 = (X - 5).toString();
    let digit2 = (Y - 5).toString();
    let digits;

    if (digit2 === "0") {
      digits = digit1[0];
    } else {
      digits = digit2[0] + digit1[0];
    }

    return mazeGrid[digits];
  }

  function followPath(searchPath: any) {
    let index = 0;
    setSearch1IntervalId(
      setInterval(() => {
        if (index < searchPath.length) {
          setPlayer2X(searchPath[index][1] + 5);
          setPlayer2Y(searchPath[index][0] + 5);
          index++;
        }
      }, difficulty)
    );
    clearInterval(search1IntervalId);
  }

  const findNewPosition = () => {
    let quadList = [1, 2, 3, 4];
    let newX: any;
    let newY: any;

    if (previousQuadrant !== null) {
      quadList = quadList.filter((item) => item !== previousQuadrant);
    }

    let quadrant = Math.floor(Math.random() * quadList.length);
    let randomSpot = Math.floor(Math.random() * 5) * 10 + 5;

    switch (quadList[quadrant]) {
      case 1: // Top Left
        newX = randomSpot;
        newY = randomSpot;
        break;
      case 2: // Top Right
        newX = randomSpot + 50;
        newY = randomSpot;
        break;
      case 3: // Bottom Left
        newX = randomSpot;
        newY = randomSpot + 50;
        break;
      case 4: // Bottom right
        newX = randomSpot + 50;
        newY = randomSpot + 50;
        break;
    }

    setPreviousQuadrant(quadList[quadrant]);
    return [newX, newY];
  };

  useEffect(() => {
    generateCells(mazeGrid, wallWidth, gridSquareLength);
    makeMaze(mazeGrid, stack);
    trimMaze(mazeGrid);
    makeSearchGrid(mazeGrid, searchGrid1);
    player1Score = gameDetails.player1Score;
    player2Score = gameDetails.player2Score;
    setTimerRunning(true);
    aStarSearch(searchGrid1, searchPath1, player2X, player2Y, targetX, targetY);
    searchPath1 = searchPath1.reverse();
    followPath(searchPath1);
  }, []);

  useEffect(() => {
    if (roundOver) {
      clearInterval(search1IntervalId);
      gameDetails.player1Score = player1Score;
      gameDetails.player2Score = player2Score;
      gameDetails.flag = "gameplay";
      gameDetails.currentRound++;
      if (gameDetails.currentRound > gameDetails.rounds) {
        gameDetails.gameOver = true;
      }
      navigation.navigate("Hunt Roles", gameDetails);
    }
  }, [roundOver]);

  useEffect(() => {
    if (
      (playerX === targetX && playerY === targetY) ||
      (player2X === targetX && player2Y === targetY)
    ) {
      let newPos = findNewPosition();
      setTargetX(newPos[0]);
      setTargetY(newPos[1]);

      if (playerX === targetX && playerY === targetY) {
        player1Score++;
      } else {
        player2Score++;
      }
    }
  }, [playerX, playerY, player2X, player2Y]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 20 }}>
        <CountdownCircleTimer
          isPlaying={timerRunning}
          duration={gameDetails.timeLimit}
          colors={[
            ["#00ff00", 0.4],
            ["#ffff00", 0.4],
            ["#ff0000", 0.2],
          ]}
          size={60}
          strokeWidth={2}
          onComplete={() => setRoundOver(true)}
        >
          {({ remainingTime }) => (
            <Text style={{ color: "white", fontSize: 20 }}>
              {Math.floor(remainingTime / 60)}:
              {(remainingTime % 60).toString().length === 1 &&
              remainingTime % 60 !== 0
                ? "0" + (remainingTime % 60)
                : remainingTime % 60}
              {remainingTime % 60 === 0 && 0}
            </Text>
          )}
        </CountdownCircleTimer>
      </View>
      <View style={styles.mazeContainer}>
        {mazeGrid.map((item: any) => (
          <View
            key={(`${item.row}` + `${item.col}`).toString()}
            style={{
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
            }}
          />
        ))}

        <Svg height="100%" width="100%" viewBox="0 0 100 100">
          <Circle
            cx={targetX}
            cy={targetY}
            r={playerSize.toString()}
            fill={"white"}
          />
          <Circle
            cx={player2X}
            cy={player2Y}
            r={playerSize.toString()}
            fill={`${gameDetails.player2Colour}`}
          />
          <Circle
            cx={playerX}
            cy={playerY}
            r={playerSize.toString()}
            fill={`${gameDetails.colour}`}
          />
        </Svg>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: height / 3,
          width: height / 3,
          paddingTop: 20,
        }}
      >
        <Svg height="100%" width="100%" viewBox="0 0 100 100">
          <Circle cx="45%" cy="50%" r={height / 13} fill="darkblue"></Circle>
          <Circle
            cx="45%"
            cy="15%"
            r={height / 52}
            fill="orange"
            onPress={() => movePlayerUp()}
          />
          <Circle
            cx="15%"
            cy="50%"
            r={height / 52}
            fill="orange"
            onPress={() => movePlayerLeft()}
          />
          <Circle
            cx="45%"
            cy="85%"
            r={height / 52}
            fill="orange"
            onPress={() => movePlayerDown()}
          />
          <Circle
            cx="75%"
            cy="50%"
            r={height / 52}
            fill="orange"
            onPress={() => movePlayerRight()}
          />
        </Svg>
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

export default HuntGameplay;
