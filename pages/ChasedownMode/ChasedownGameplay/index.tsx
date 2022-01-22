import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import { Svg, Circle } from "react-native-svg";
import {
  generateCells,
  makeMaze,
  trimMaze,
  makeSearchGrid,
} from "../../../tools/MazeAndGridGeneration";
import {
  aStarSearch,
  runAwayAlgorithm,
  updateSearchPath,
} from "../../../tools/BotBrain";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import Controller from "../../../components/Controller/Controller";

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
const targetStart = [55, 55];
const topLeftStart = [5, 5];
const topRightStart = [95, 5];
const bottomLeftStart = [5, 95];
const bottomRightStart = [95, 95];

const ChasedownGameplayScreen = ({ navigation, route }) => {
  let gameDetails = route.params;
  const [playerX, setPlayerX] = useState(
    gameDetails.currentRound === 1 || gameDetails.currentRound === 7
      ? topLeftStart[0]
      : gameDetails.currentRound === 2 || gameDetails.currentRound === 5
      ? targetStart[0]
      : gameDetails.currentRound === 3
      ? bottomRightStart[0]
      : gameDetails.currentRound === 4
      ? topRightStart[0]
      : bottomLeftStart[0]
  );
  const [playerY, setPlayerY] = useState(
    gameDetails.currentRound === 1 || gameDetails.currentRound === 7
      ? topLeftStart[1]
      : gameDetails.currentRound === 2 || gameDetails.currentRound === 5
      ? targetStart[1]
      : gameDetails.currentRound === 3
      ? bottomRightStart[1]
      : gameDetails.currentRound === 4
      ? topRightStart[1]
      : bottomLeftStart[1]
  );
  const [player2X, setPlayer2X] = useState(
    gameDetails.currentRound === 1 ||
      gameDetails.currentRound === 4 ||
      gameDetails.currentRound === 7
      ? targetStart[0]
      : gameDetails.currentRound === 2
      ? bottomLeftStart[0]
      : gameDetails.currentRound === 3
      ? topLeftStart[0]
      : gameDetails.currentRound === 5
      ? bottomRightStart[0]
      : topRightStart[0]
  );
  const [player2Y, setPlayer2Y] = useState(
    gameDetails.currentRound === 1 ||
      gameDetails.currentRound === 4 ||
      gameDetails.currentRound === 7
      ? targetStart[1]
      : gameDetails.currentRound === 2
      ? bottomLeftStart[1]
      : gameDetails.currentRound === 3
      ? topLeftStart[1]
      : gameDetails.currentRound === 5
      ? bottomRightStart[1]
      : topRightStart[1]
  );
  const [player3X, setPlayer3X] = useState(
    gameDetails.currentRound === 3 || gameDetails.currentRound === 6
      ? targetStart[0]
      : gameDetails.currentRound === 1 || gameDetails.currentRound === 7
      ? bottomRightStart[0]
      : gameDetails.currentRound === 2
      ? topRightStart[0]
      : gameDetails.currentRound === 4
      ? bottomLeftStart[0]
      : topLeftStart[0]
  );
  const [player3Y, setPlayer3Y] = useState(
    gameDetails.currentRound === 3 || gameDetails.currentRound === 6
      ? targetStart[1]
      : gameDetails.currentRound === 1 || gameDetails.currentRound === 7
      ? bottomRightStart[1]
      : gameDetails.currentRound === 2
      ? topRightStart[1]
      : gameDetails.currentRound === 4
      ? bottomLeftStart[1]
      : topLeftStart[1]
  );
  const [search1IntervalId, setSearch1IntervalId] = useState<any>(null);
  const [search2IntervalId, setSearch2IntervalId] = useState<any>(null);
  const [roundOver, setRoundOver] = useState(false);
  const [runAwayIntervalId, setRunAwayIntervalId] = useState<any>(null);
  const [timerRunning, setTimerRunning] = useState(false);

  const [player2Pos, setPlayer2Pos] = useState<any>([
    player2X,
    player2Y,
    -1,
    -1,
  ]);

  const [player3Pos, setPlayer3Pos] = useState<any>([
    player3X,
    player3Y,
    -1,
    -1,
  ]);

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
    setTimerRunning(true);
  }, []);

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

  function followPath(player: any, searchPath: any) {
    let index = 0;

    if (player === "player2") {
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
    } else if (player === "player3") {
      setSearch2IntervalId(
        setInterval(() => {
          if (index < searchPath.length) {
            setPlayer3X(searchPath[index][1] + 5);
            setPlayer3Y(searchPath[index][0] + 5);
            index++;
          }
        }, difficulty)
      );

      clearInterval(search2IntervalId);
    }
  }

  function runAway() {
    setRunAwayIntervalId(
      setInterval(() => {
        if (!roundOver) {
          if (gameDetails.targetPlayer === 2) {
            setPlayer2Pos((currentPlayer2Pos: any) => {
              return runAwayAlgorithm(
                currentPlayer2Pos,
                searchPath1,
                searchPath2,
                mazeGrid
              );
            });
          } else if (gameDetails.targetPlayer === 3) {
            setPlayer3Pos((currentPlayer3Pos: any) => {
              return runAwayAlgorithm(
                currentPlayer3Pos,
                searchPath1,
                searchPath2,
                mazeGrid
              );
            });
          }
        }
      }, difficulty)
    );

    clearInterval(runAwayIntervalId);
  }

  useEffect(() => {
    setPlayer2X(player2Pos[0]);
    setPlayer2Y(player2Pos[1]);
  }, [player2Pos]);

  useEffect(() => {
    setPlayer3X(player3Pos[0]);
    setPlayer3Y(player3Pos[1]);
  }, [player3Pos]);

  useEffect(() => {
    if (gameDetails.targetPlayer === 1) {
      aStarSearch(
        searchGrid1,
        searchPath1,
        player2X,
        player2Y,
        playerX,
        playerY
      );
      aStarSearch(
        searchGrid2,
        searchPath2,
        player3X,
        player3Y,
        playerX,
        playerY
      );
      searchPath1 = searchPath1.reverse();
      searchPath2 = searchPath2.reverse();
      followPath("player2", searchPath1);
      followPath("player3", searchPath2);
    } else if (gameDetails.targetPlayer === 2) {
      aStarSearch(
        searchGrid1,
        searchPath1,
        playerX,
        playerY,
        player2X,
        player2Y
      );
      aStarSearch(
        searchGrid2,
        searchPath2,
        player3X,
        player3Y,
        player2X,
        player2Y
      );
      searchPath1 = searchPath1.reverse();
      searchPath2 = searchPath2.reverse();
      followPath("player3", searchPath2);
      runAway();
    } else if (gameDetails.targetPlayer === 3) {
      aStarSearch(
        searchGrid1,
        searchPath1,
        playerX,
        playerY,
        player3X,
        player3Y
      );
      aStarSearch(
        searchGrid2,
        searchPath2,
        player2X,
        player2Y,
        player3X,
        player3Y
      );
      searchPath1 = searchPath1.reverse();
      searchPath2 = searchPath2.reverse();
      followPath("player2", searchPath2);
      runAway();
    }
  }, []);

  useEffect(() => {
    if (gameDetails.targetPlayer === 1) {
      updateSearchPath(playerX, playerY, searchPath1, mazeGrid);
      updateSearchPath(playerX, playerY, searchPath2, mazeGrid);
    } else if (gameDetails.targetPlayer === 2) {
      updateSearchPath(player2X, player2Y, searchPath2, mazeGrid);
    } else if (gameDetails.targetPlayer === 3) {
      updateSearchPath(player3X, player3Y, searchPath2, mazeGrid);
    }

    if (playerX === player3X && playerY === player3Y) {
      if (gameDetails.targetPlayer === 1) {
        player3Score++;
        setRoundOver(true);
      } else if (gameDetails.targetPlayer === 3) {
        player1Score++;
        setRoundOver(true);
      }
    }

    if (player3X === player2X && player3Y === player2Y) {
      if (gameDetails.targetPlayer === 2) {
        player3Score++;
        setRoundOver(true);
      } else if (gameDetails.targetPlayer === 3) {
        player2Score++;
        setRoundOver(true);
      }
    }

    if (player2X === playerX && player2Y === playerY) {
      if (gameDetails.targetPlayer === 2) {
        player1Score++;
        setRoundOver(true);
      } else if (gameDetails.targetPlayer === 1) {
        player2Score++;
        setRoundOver(true);
      }
    }
  }, [playerX, playerY, player2X, player2Y, player3X, player3Y]);

  useEffect(() => {
    if (roundOver) {
      clearInterval(search1IntervalId);
      clearInterval(search2IntervalId);
      clearInterval(runAwayIntervalId);
      gameDetails.player1Score = player1Score;
      gameDetails.player2Score = player2Score;
      gameDetails.player3Score = player3Score;
      gameDetails.flag = "gameplay";
      gameDetails.currentRound++;
      if (gameDetails.currentRound > gameDetails.rounds) {
        gameDetails.gameOver = true;
      }
      navigation.navigate("Chasedown Roles", gameDetails);
    }
  }, [roundOver]);

  function timerExpired() {
    if (gameDetails.targetPlayer === 1) {
      player1Score++;
    } else if (gameDetails.targetPlayer === 2) {
      player2Score++;
    } else if (gameDetails.targetPlayer === 3) {
      player3Score++;
    }
    setRoundOver(true);
  }

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
          onComplete={() => timerExpired()}
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
      <Controller
        movePlayerDown={movePlayerDown}
        movePlayerLeft={movePlayerLeft}
        movePlayerRight={movePlayerRight}
        movePlayerUp={movePlayerUp}
      />
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

export default ChasedownGameplayScreen;
