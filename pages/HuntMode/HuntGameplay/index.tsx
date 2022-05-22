import React, { useState, useEffect, useContext } from "react";
import { View, Dimensions, Vibration } from "react-native";
import {
  generateCells,
  makeMaze,
  trimMaze,
  makeSearchGrid,
} from "../../../tools/MazeAndGridGeneration";
import { aStarSearch, getMazeCell } from "../../../tools/BotBrain";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import Controller from "../../../components/Controller/Controller";
import BGWithImage from "../../../components/BGWithImage";
import { UserContext } from "../../../tools/UserContext";
import RoundOverAlert from "../../../components/RoundOverAlert/RoundOverAlert";
import {
  roundOverDuration,
  playerAnimationDelay,
} from "../../../constants/Animation";
import globalStyles from "../../../constants/GlobalStyles";
import PlayerAvatar from "../../../components/PlayerAvatar";
import { ColorGradients } from "../../../constants/Colors";
import { timerDetails } from "../../../constants/gameConstants";
import { Screens } from "../../../constants/types";
import ClockText from "../../../components/ClockText";
import SinglePlayerScore from "../../../components/SinglePlayerScore";
import { isUndefined } from "lodash";

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
    let mazeCell = getMazeCell(playerX, playerY, mazeGrid);

    if (playerY > 5 && mazeCell.top === 0 && !roundOver) {
      Vibration.vibrate(5);
      setPlayerY(playerY - 10);
    }
  };

  const movePlayerRight = () => {
    let mazeCell = getMazeCell(playerX, playerY, mazeGrid);

    if (playerX < 95 && mazeCell.right === 0 && !roundOver) {
      Vibration.vibrate(5);
      setPlayerX(playerX + 10);
    }
  };

  const movePlayerLeft = () => {
    let mazeCell = getMazeCell(playerX, playerY, mazeGrid);

    if (playerX > 5 && mazeCell.left === 0 && !roundOver) {
      Vibration.vibrate(5);
      setPlayerX(playerX - 10);
    }
  };

  const movePlayerDown = () => {
    let mazeCell = getMazeCell(playerX, playerY, mazeGrid);

    if (playerY < 95 && mazeCell.bottom === 0 && !roundOver) {
      Vibration.vibrate(5);
      setPlayerY(playerY + 10);
    }
  };

  function followPath(searchPath: any) {
    let index = 0;
    setSearch1IntervalId(
      setInterval(() => {
        if (
          !isUndefined(searchPath) &&
          searchPath.length > 0 &&
          index < searchPath.length
        ) {
          setPlayer2X(searchPath[index][1] + 5);
          setPlayer2Y(searchPath[index][0] + 5);
          index++;
        } else {
          clearInterval(search1IntervalId);
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
          navigation.navigate(Screens.EndGame, gameDetails);
        }, roundOverDuration);
      } else {
        setTimeout(() => {
          navigation.navigate(Screens.HuntRoles, gameDetails);
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
        <View style={globalStyles().gameHeaderContainer}>
          <SinglePlayerScore colour={gameDetails.colour} score={player1Score} />
          <SinglePlayerScore
            colour={gameDetails.player2Colour}
            score={player2Score}
          />
          <CountdownCircleTimer
            isPlaying={timerRunning}
            duration={gameDetails.timeLimit}
            colors={timerDetails as any}
            size={60}
            strokeWidth={2}
            onComplete={() => setRoundOver(true)}
          >
            {({ remainingTime }) => <ClockText remainingTime={remainingTime} />}
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

          {!roundOver && (
            <>
              <PlayerAvatar
                top={targetY}
                left={targetX}
                colour={ColorGradients.white}
              />
              <PlayerAvatar
                top={playerY}
                left={playerX}
                colour={gameDetails.colour}
                delay={playerAnimationDelay}
              />

              <PlayerAvatar
                top={player2Y}
                left={player2X}
                colour={gameDetails.player2Colour}
                delay={difficulty}
              />
            </>
          )}
        </View>
        <Controller
          downFunction={movePlayerDown}
          leftFunction={movePlayerLeft}
          rightFunction={movePlayerRight}
          upFunction={movePlayerUp}
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
