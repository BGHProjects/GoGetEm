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
  updateSearchPath,
  runAwaySingleChaser,
} from "../../../tools/BotBrain";

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
let searchGrid2: any = [];
let searchPath2: any = [];
let team1Score: any;
let team2Score: any;
let playerSize = 3;

const TagTeamGameplay = ({ navigation, route }) => {
  let gameDetails = route.params;
  const [playerX, setPlayerX] = useState(15);
  const [playerY, setPlayerY] = useState(
    gameDetails.currentRound === 1 ||
      gameDetails.currentRound === 2 ||
      gameDetails.currentRound === 5 ||
      gameDetails.currentRound === 6
      ? 15
      : 85
  );
  const [player2X, setPlayer2X] = useState(15);
  const [player2Y, setPlayer2Y] = useState(
    gameDetails.currentRound === 1 ||
      gameDetails.currentRound === 2 ||
      gameDetails.currentRound === 5 ||
      gameDetails.currentRound === 6
      ? 85
      : 15
  );
  const [player3X, setPlayer3X] = useState(85);
  const [player3Y, setPlayer3Y] = useState(
    gameDetails.currentRound === 1 ||
      gameDetails.currentRound === 4 ||
      gameDetails.currentRound === 5
      ? 15
      : 85
  );
  const [player4X, setPlayer4X] = useState(85);
  const [player4Y, setPlayer4Y] = useState(
    gameDetails.currentRound === 1 ||
      gameDetails.currentRound === 4 ||
      gameDetails.currentRound === 5
      ? 85
      : 15
  );

  const [search1IntervalId, setSearch1IntervalId] = useState<any>(null);
  const [search2IntervalId, setSearch2IntervalId] = useState<any>(null);
  const [runAway1IntervalId, setRunAway1IntervalId] = useState<any>(null);
  const [runAway2IntervalId, setRunAway2IntervalId] = useState<any>(null);

  const [roundOver, setRoundOver] = useState(false);

  /**
   * The below are necessary for the runAway algorithms
   * because the player's position needs to be a single variable
   * for the setStates used in updating runAway
   */

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

  const [player4Pos, setPlayer4Pos] = useState<any>([
    player4X,
    player4Y,
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

  function followPath(
    searchPath: any,
    setPlayerX: Function,
    setPlayerY: Function,
    setSearch: Function,
    intervalId: any
  ) {
    let index = 0;
    setSearch(
      setInterval(() => {
        if (index < searchPath.length) {
          setPlayerX(searchPath[index][1] + 5);
          setPlayerY(searchPath[index][0] + 5);
          index++;
        }
      }, difficulty + 50)
    );
    clearInterval(intervalId);
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
    setPlayer4X(player4Pos[0]);
    setPlayer4Y(player4Pos[1]);
  }, [player4Pos]);

  function runAway(
    setRunAwayIntervalId: Function,
    runAwayIntervalId: any,
    setPlayerPos: Function,
    searchPath: any
  ) {
    setRunAwayIntervalId(
      setInterval(() => {
        if (!roundOver) {
          setPlayerPos((currentPlayerPos: any) => {
            return runAwaySingleChaser(currentPlayerPos, searchPath, mazeGrid);
          });
        }
      }, difficulty)
    );

    clearInterval(runAwayIntervalId);
  }

  /**
   * Starts the game
   */

  useEffect(() => {
    generateCells(mazeGrid, wallWidth, gridSquareLength);
    makeMaze(mazeGrid, stack);
    trimMaze(mazeGrid);
    makeSearchGrid(mazeGrid, searchGrid1);
    makeSearchGrid(mazeGrid, searchGrid2);
    team1Score = gameDetails.team1Score;
    team2Score = gameDetails.team2Score;

    if (gameDetails.currentRound === 1 || gameDetails.currentRound === 5) {
      // 4 chasing 2, 3 running from Player
      aStarSearch(
        searchGrid1,
        searchPath1,
        player4X,
        player4Y,
        player2X,
        player2Y
      );
      searchPath1 = searchPath1.reverse();
      followPath(
        searchPath1,
        setPlayer4X,
        setPlayer4Y,
        setSearch1IntervalId,
        search1IntervalId
      );

      aStarSearch(
        searchGrid2,
        searchPath2,
        playerX,
        playerY,
        player3X,
        player3Y
      );
      searchPath2 = searchPath2.reverse();

      runAway(
        setRunAway1IntervalId,
        runAway1IntervalId,
        setPlayer2Pos,
        searchPath1
      );
      runAway(
        setRunAway2IntervalId,
        runAway2IntervalId,
        setPlayer3Pos,
        searchPath2
      );
    } else if (
      gameDetails.currentRound === 2 ||
      gameDetails.currentRound === 6
    ) {
      // 3 chasing 2, 4 running from Player
      aStarSearch(
        searchGrid1,
        searchPath1,
        player3X,
        player3Y,
        player2X,
        player2Y
      );
      searchPath1 = searchPath1.reverse();
      followPath(
        searchPath1,
        setPlayer3X,
        setPlayer3Y,
        setSearch1IntervalId,
        search1IntervalId
      );

      aStarSearch(
        searchGrid2,
        searchPath2,
        playerX,
        playerY,
        player4X,
        player4Y
      );
      searchPath2 = searchPath2.reverse();

      runAway(
        setRunAway1IntervalId,
        runAway1IntervalId,
        setPlayer2Pos,
        searchPath1
      );
      runAway(
        setRunAway2IntervalId,
        runAway2IntervalId,
        setPlayer4Pos,
        searchPath2
      );
    } else if (
      gameDetails.currentRound === 3 ||
      gameDetails.currentRound === 7
    ) {
      // 2 chasing 4, 3 chasing Player
      aStarSearch(
        searchGrid1,
        searchPath1,
        player2X,
        player2Y,
        player4X,
        player4Y
      );
      searchPath1 = searchPath1.reverse();
      followPath(
        searchPath1,
        setPlayer2X,
        setPlayer2Y,
        setSearch1IntervalId,
        search1IntervalId
      );

      aStarSearch(
        searchGrid2,
        searchPath2,
        player3X,
        player3Y,
        playerX,
        playerY
      );
      searchPath2 = searchPath2.reverse();
      followPath(
        searchPath2,
        setPlayer3X,
        setPlayer3Y,
        setSearch2IntervalId,
        search2IntervalId
      );

      runAway(
        setRunAway1IntervalId,
        runAway1IntervalId,
        setPlayer4Pos,
        searchPath1
      );
    } else if (gameDetails.currentRound === 4) {
      // 2 chasing 3, 4 chasing Player
      aStarSearch(
        searchGrid1,
        searchPath1,
        player2X,
        player2Y,
        player3X,
        player3Y
      );
      searchPath1 = searchPath1.reverse();
      followPath(
        searchPath1,
        setPlayer2X,
        setPlayer2Y,
        setSearch1IntervalId,
        search1IntervalId
      );

      aStarSearch(
        searchGrid2,
        searchPath2,
        player4X,
        player4Y,
        playerX,
        playerY
      );
      searchPath2 = searchPath2.reverse();
      followPath(
        searchPath2,
        setPlayer4X,
        setPlayer4Y,
        setSearch2IntervalId,
        search2IntervalId
      );

      runAway(
        setRunAway1IntervalId,
        runAway1IntervalId,
        setPlayer3Pos,
        searchPath1
      );
    }
  }, []);

  /**
   * While the game is running
   */

  useEffect(() => {
    if (
      gameDetails.currentRound === 1 ||
      gameDetails.currentRound === 2 ||
      gameDetails.currentRound === 5 ||
      gameDetails.currentRound === 6
    ) {
      updateSearchPath(player2X, player2Y, searchPath1, mazeGrid);
    } else if (
      gameDetails.currentRound === 3 ||
      gameDetails.currentRound === 7
    ) {
      updateSearchPath(player4X, player4Y, searchPath1, mazeGrid);
      updateSearchPath(playerX, playerY, searchPath2, mazeGrid);
    } else if (gameDetails.currentRound === 4) {
      updateSearchPath(player3X, player3Y, searchPath1, mazeGrid);
      updateSearchPath(playerX, playerY, searchPath2, mazeGrid);
    }

    if (playerX === player3X && playerY === player3Y) {
      // Player is chasing 3
      if (gameDetails.currentRound === 1 || gameDetails.currentRound === 5) {
        team1Score++;
      }
      // 3 is chasing Player
      else if (
        gameDetails.currentRound === 3 ||
        gameDetails.currentRound === 7
      ) {
        team2Score++;
      }
      setRoundOver(true);
    } else if (playerX === player4X && playerY === player4Y) {
      // Player is chasing 4
      if (gameDetails.currentRound === 2 || gameDetails.currentRound === 6) {
        team1Score++;
      }
      // 4 is chasing Player
      else if (gameDetails.currentRound === 4) {
        team2Score++;
      }
      setRoundOver(true);
    } else if (player2X === player3X && player2Y === player3Y) {
      // 2 is chasing 3
      if (gameDetails.currentRound === 4) {
        team1Score++;
      }
      // 3 is chasing 2
      else if (
        gameDetails.currentRound === 2 ||
        gameDetails.currentRound === 6
      ) {
        team2Score++;
      }
      setRoundOver(true);
    } else if (player2X === player4X && player2Y === player4Y) {
      // 2 is chasing 4
      if (gameDetails.currentRound === 3 || gameDetails.currentRound === 7) {
        team1Score++;
      }
      // 4 is chasing 2
      else if (
        gameDetails.currentRound === 1 ||
        gameDetails.currentRound === 5
      ) {
        team2Score++;
      }
      setRoundOver(true);
    }
  }, [
    playerX,
    playerY,
    player2X,
    player2Y,
    player3X,
    player3Y,
    player4X,
    player4Y,
  ]);

  /**
   * Ends the game
   */

  useEffect(() => {
    if (roundOver) {
      clearInterval(search1IntervalId);
      clearInterval(search2IntervalId);
      clearInterval(runAway1IntervalId);
      clearInterval(runAway2IntervalId);
      gameDetails.team1Score = team1Score;
      gameDetails.team2Score = team2Score;
      gameDetails.flag = "gameplay";
      gameDetails.currentRound++;

      // Change Team 1 Target
      if (gameDetails.currentRound === 3 || gameDetails.currentRound === 7) {
        gameDetails.team1Target = gameDetails.colour;
      } else if (gameDetails.currentRound === 5) {
        gameDetails.team1Target = gameDetails.player2Colour;
      }

      // Change Team 2 Target
      if (gameDetails.currentRound === 2 || gameDetails.currentRound === 6) {
        gameDetails.team2Target = gameDetails.player4Colour;
      } else if (gameDetails.currentRound === 4) {
        gameDetails.team2Target = gameDetails.player3Colour;
      }

      if (gameDetails.currentRound > gameDetails.rounds) {
        gameDetails.gameOver = true;
      }
      navigation.navigate("TagTeam Roles", gameDetails);
    }
  }, [roundOver]);

  return (
    <SafeAreaView style={styles.container}>
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
          {(gameDetails.currentRound === 3 ||
            gameDetails.currentRound === 4 ||
            gameDetails.currentRound === 7) && (
            <Circle
              cx={playerX}
              cy={playerY}
              r={(playerSize + 1).toString()}
              fill={"white"}
            />
          )}

          {(gameDetails.currentRound === 1 ||
            gameDetails.currentRound === 2 ||
            gameDetails.currentRound === 5 ||
            gameDetails.currentRound === 6) && (
            <Circle
              cx={player2X}
              cy={player2Y}
              r={(playerSize + 1).toString()}
              fill={"white"}
            />
          )}

          {(gameDetails.currentRound === 1 ||
            gameDetails.currentRound === 4 ||
            gameDetails.currentRound === 5) && (
            <Circle
              cx={player3X}
              cy={player3Y}
              r={(playerSize + 1).toString()}
              fill={"white"}
            />
          )}

          {(gameDetails.currentRound === 2 ||
            gameDetails.currentRound === 3 ||
            gameDetails.currentRound === 6 ||
            gameDetails.currentRound === 7) && (
            <Circle
              cx={player4X}
              cy={player4Y}
              r={(playerSize + 1).toString()}
              fill={"white"}
            />
          )}

          <Circle
            cx={playerX}
            cy={playerY}
            r={playerSize.toString()}
            fill={`${gameDetails.colour}`}
          />
          <Circle
            cx={player2X}
            cy={player2Y}
            r={playerSize.toString()}
            fill={`${gameDetails.player2Colour}`}
          />
          <Circle
            cx={player3X}
            cy={player3Y}
            r={playerSize.toString()}
            fill={`${gameDetails.player3Colour}`}
          />
          <Circle
            cx={player4X}
            cy={player4Y}
            r={playerSize.toString()}
            fill={`${gameDetails.player4Colour}`}
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

export default TagTeamGameplay;
