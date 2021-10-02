import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import { Svg, Circle } from "react-native-svg";
import {
  generateCells,
  makeMaze,
  trimMaze,
  makeSearchGrid,
} from "../../../../tools/MazeAndGridGeneration";
import { aStarSearch } from "../../../../tools/BotBrain";

const height = Dimensions.get("window").height;
const mazeSideLength = height * 0.45;
const cellSize = height * 0.045;
let mazeGrid: any = [];
const wallWidth = 1;
const gridSquareLength = 10;
const stack: any = [];
let gridColor = "white";
let searchGrid1: any = [];
let searchGrid2: any = [];
let searchPath1: any = [];
let searchPath2: any = [];
let player1Score: any;
let player2Score: any;
let player3Score: any;
let playerSize = 4;
const leftStart = [5, 85];
const rightStart = [95, 85];

const ClassicGameplayScreen = ({ navigation, route }) => {
  let gameDetails = route.params;
  const [playerX, setplayerX] = useState(55);
  const [playerY, setplayerY] = useState(15);
  const [player2X, setplayer2X] = useState(
    gameDetails.currentRound % 2 < 1 ? 5 : 95
  );
  const [player2Y, setplayer2Y] = useState(85);
  const [player3X, setplayer3X] = useState(
    gameDetails.currentRound % 2 < 1 ? 95 : 5
  );
  const [player3Y, setplayer3Y] = useState(85);
  const [search1IntervalId, setSearch1IntervalId] = useState<any>(null);
  const [search2IntervalId, setSearch2IntervalId] = useState<any>(null);
  const [player2Started, setPlayer2Started] = useState<any>(false);
  const [roundOver, setRoundOver] = useState(false);

  let difficulty =
    gameDetails.difficulty === "Meh"
      ? 700
      : gameDetails.difficulty === "Oh OK"
      ? 500
      : gameDetails.difficulty === "Hang On"
      ? 400
      : 300;

  useEffect(() => {
    generateCells(mazeGrid, wallWidth, gridSquareLength);
    makeMaze(mazeGrid, stack);
    trimMaze(mazeGrid);
    makeSearchGrid(mazeGrid, searchGrid1);
    makeSearchGrid(mazeGrid, searchGrid2);
    player1Score = gameDetails.player1Score;
    player2Score = gameDetails.player2Score;
    player3Score = gameDetails.player3Score;
  }, []);

  const movePlayerUp = () => {
    let mazeCell = getMazeCell(playerX, playerY);

    if (playerY > 5 && mazeCell.top === 0 && !roundOver) {
      setplayerY(playerY - 10);
    }
  };

  const movePlayerRight = () => {
    let mazeCell = getMazeCell(playerX, playerY);

    if (playerX < 95 && mazeCell.right === 0 && !roundOver) {
      setplayerX(playerX + 10);
    }
  };

  const movePlayerLeft = () => {
    let mazeCell = getMazeCell(playerX, playerY);

    if (playerX > 5 && mazeCell.left === 0 && !roundOver) {
      setplayerX(playerX - 10);
    }
  };

  const movePlayerDown = () => {
    let mazeCell = getMazeCell(playerX, playerY);

    if (playerY < 95 && mazeCell.bottom === 0 && !roundOver) {
      setplayerY(playerY + 10);
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

  function followPath(player: any, searchPath: any) {
    let index = 0;

    if (player === "player2") {
      setPlayer2Started(true);
      setSearch1IntervalId(
        setInterval(() => {
          if (index < searchPath.length) {
            setplayer2X(searchPath[index][1] + 5),
              setplayer2Y(searchPath[index][0] + 5);
            index++;
          }
        }, difficulty)
      );
      clearInterval(search1IntervalId);
    } else if (player === "player3") {
      setSearch2IntervalId(
        setInterval(() => {
          if (index < searchPath.length) {
            setplayer3X(searchPath[index][1] + 5),
              setplayer3Y(searchPath[index][0] + 5);
            index++;
          }
        }, difficulty)
      );

      clearInterval(search2IntervalId);
    }
  }

  useEffect(() => {
    gameDetails.currentRound % 2 < 1
      ? aStarSearch(
          searchGrid1,
          searchPath1,
          player2X,
          player2Y,
          player3X,
          player3Y
        )
      : aStarSearch(
          searchGrid1,
          searchPath1,
          player2X,
          player2Y,
          playerX,
          playerY
        );

    gameDetails.currentRound % 2 < 1
      ? aStarSearch(
          searchGrid2,
          searchPath2,
          player3X,
          player3Y,
          playerX,
          playerY
        )
      : aStarSearch(
          searchGrid2,
          searchPath2,
          player3X,
          player3Y,
          player2X,
          player2Y
        );
    //Search Paths are compiled in reverse
    searchPath1 = searchPath1.reverse();
    searchPath2 = searchPath2.reverse();
    followPath("player2", searchPath1);
    followPath("player3", searchPath2);
  }, []);

  useEffect(() => {
    let player1Cell = getMazeCell(playerX, playerY);
    /*
      This ensures that if the player backtracks on the search path
      those entries are removed instead of explored by the bot
       */

    if (
      playerY - 5 === searchPath1[searchPath1.length - 2][0] &&
      playerX - 5 === searchPath1[searchPath1.length - 2][1]
    ) {
      searchPath1.splice(searchPath1.length - 1, 1);
    } else {
      if (
        [playerY - 5, playerX - 5] !==
        [
          searchPath1[searchPath1.length - 1][0],
          searchPath1[searchPath1.length - 1][1],
        ]
      ) {
        searchPath1.push([player1Cell.row, player1Cell.col]);
      }
    }
  }, [playerX, playerY]);

  useEffect(() => {
    if (player2Started) {
      let player2Cell = getMazeCell(player2X, player2Y);
      /*
      This ensures that if player2 backtracks on the search path
      those entries are removed instead of explored by the bot
       */
      if (
        player2Cell.row === searchPath2[searchPath2.length - 2][0] &&
        player2Cell.col === searchPath2[searchPath2.length - 2][1]
      ) {
        searchPath2.splice(searchPath2.length - 2, 2);
      }
      searchPath2.push([player2Cell.row, player2Cell.col]);
    }
  }, [player2X, player2Y, searchPath1]);

  useEffect(() => {
    if (playerX === player3X && playerY === player3Y) {
      if (gameDetails.currentRound % 2 === 0) {
        player3Score++;
      } else {
        player1Score++;
      }

      setRoundOver(true);
    }

    if (player3X === player2X && player3Y === player2Y) {
      if (gameDetails.currentRound % 2 < 1) {
        player2Score++;
      } else {
        player3Score++;
      }
      setRoundOver(true);
    }

    if (player2X === playerX && player2Y === playerY) {
      if (gameDetails.currentRound % 2 < 1) {
        player1Score++;
      } else {
        player2Score++;
      }
      setRoundOver(true);
    }
  }, [playerX, playerY, player2X, player2Y, player3X, player3Y]);

  useEffect(() => {
    if (roundOver) {
      clearInterval(search1IntervalId);
      clearInterval(search2IntervalId);
      gameDetails.player1Score = player1Score;
      gameDetails.player2Score = player2Score;
      gameDetails.player3Score = player3Score;
      gameDetails.flag = "gameplay";
      gameDetails.currentRound++;
      if (gameDetails.currentRound > gameDetails.rounds) {
        gameDetails.gameOver = true;
      }
      navigation.navigate("Classic Roles", gameDetails);
    }
  }, [roundOver]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleLabel}>Classic Gameplay</Text>
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
            cx={player3X}
            cy={player3Y}
            r={playerSize.toString()}
            fill={`${gameDetails.player3Colour}`}
          ></Circle>
          <Circle
            cx={player2X}
            cy={player2Y}
            r={playerSize.toString()}
            fill={`${gameDetails.player2Colour}`}
          ></Circle>
          <Circle
            cx={playerX}
            cy={playerY}
            r={playerSize.toString()}
            fill={`${gameDetails.colour}`}
          ></Circle>
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

export default ClassicGameplayScreen;
