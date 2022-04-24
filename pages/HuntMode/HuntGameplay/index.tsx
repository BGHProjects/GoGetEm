import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Dimensions, Vibration } from "react-native";
import { Svg, Circle } from "react-native-svg";
import {
  generateCells,
  makeMaze,
  trimMaze,
  makeSearchGrid,
} from "../../../tools/MazeAndGridGeneration";
import { aStarSearch } from "../../../tools/BotBrain";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import Controller from "../../../components/Controller/Controller";
import BGWithImage from "../../../components/BGWithImage";
import { UserContext } from "../../../tools/UserContext";
import RoundOverAlert from "../../../components/RoundOverAlert/RoundOverAlert";
import { roundOverDuration } from "../../../constants/Animation";
import globalStyles from "../../../constants/GlobalStyles";

const height = Dimensions.get("window").height;
const cellSize = height * 0.045;
let mazeGrid: any = [];
const wallWidth = 1;
const gridSquareLength = 10;
const stack: any = [];
const gridColor = "white";
let searchGrid1: any = [];
let searchPath1: any = [];
let player1Score: any;
let player2Score: any;
let playerSize = 4;

interface HuntGameplayProps {
  navigation: any;
  route: any;
}

const HuntGameplay = ({ navigation, route }: HuntGameplayProps) => {
  const userContext = useContext(UserContext);

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
      Vibration.vibrate(500);
      clearInterval(search1IntervalId);
      gameDetails.player1Score = player1Score;
      gameDetails.player2Score = player2Score;
      gameDetails.flag = "gameplay";
      gameDetails.currentRound++;
      if (gameDetails.currentRound > gameDetails.rounds) {
        gameDetails.gameOver = true;
        setTimeout(() => {
          navigation.navigate("End Game", gameDetails);
        }, roundOverDuration);
      } else {
        setTimeout(() => {
          navigation.navigate("Hunt Roles", gameDetails);
        }, roundOverDuration);
      }
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
        Vibration.vibrate(100);
        player1Score++;
      } else {
        player2Score++;
      }
    }
  }, [playerX, playerY, player2X, player2Y]);

  useEffect(() => {
    clearInterval(search1IntervalId);
    searchGrid1 = [];
    searchPath1 = [];
    makeSearchGrid(mazeGrid, searchGrid1);
    aStarSearch(searchGrid1, searchPath1, player2X, player2Y, targetX, targetY);
    searchPath1 = searchPath1.reverse();
    followPath(searchPath1);
  }, [targetX, targetY]);

  return (
    <>
      <BGWithImage image={userContext.huntBackground}>
        <View style={{ marginTop: 20, alignSelf: "center" }}>
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
              <Text style={globalStyles().clockText}>
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
        <View style={globalStyles().mazeContainer}>
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
        <Controller
          movePlayerDown={movePlayerDown}
          movePlayerLeft={movePlayerLeft}
          movePlayerRight={movePlayerRight}
          movePlayerUp={movePlayerUp}
        />
      </BGWithImage>
      {roundOver && (
        <RoundOverAlert
          begin={roundOver}
          gameOver={gameDetails.currentRound >= gameDetails.rounds}
        />
      )}
    </>
  );
};

export default HuntGameplay;
