import React, { useState, useEffect, useContext, useRef } from "react";
import { View, Dimensions, Vibration } from "react-native";
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
import BGWithImage from "../../../components/BGWithImage";
import { UserContext } from "../../../tools/UserContext";
import RoundOverAlert from "../../../components/RoundOverAlert/RoundOverAlert";
import {
  roundOverDuration,
  playerAnimationDelay,
} from "../../../constants/Animation";
import globalStyles from "../../../constants/GlobalStyles";
import PlayerAvatar from "../../../components/PlayerAvatar";
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
let gridColor = "white";
let searchGrid1: any = [];
let searchGrid2: any = [];
let searchPath1: any = [];
let searchPath2: any = [];
let player1Score: any;
let player2Score: any;
let player3Score: any;
const targetStart = [55, 55];
const topLeftStart = [5, 5];
const topRightStart = [95, 5];
const bottomLeftStart = [5, 95];
const bottomRightStart = [95, 95];

interface ChasedownGameplayScreenProps {
  navigation: any;
  route: any;
}

const ChasedownGameplayScreen = ({
  navigation,
  route,
}: ChasedownGameplayScreenProps) => {
  const userContext = useContext(UserContext);
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
  const [roundOver, setRoundOver] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [roundOverDetails, setRoundOverDetails] = useState<any>();
  const roundOverRef = useRef<any>();

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

  const [scored, setScored] = useState(false);

  let difficulty =
    gameDetails.difficulty === "Meh"
      ? 700
      : gameDetails.difficulty === "Oh OK"
      ? 500
      : gameDetails.difficulty === "Hang On"
      ? 400
      : 300;

  // So the details can't accidentally be set twice in the same game
  const settingRoundOverDetails = (newDetails: any) => {
    if (roundOverDetails === undefined) {
      setRoundOverDetails(newDetails);
    }
  };

  useEffect(() => {
    roundOverRef.current = roundOver;
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
      Vibration.vibrate(5);
      setPlayerY(playerY - 10);
    }
  };

  const movePlayerRight = () => {
    let mazeCell = getMazeCell(playerX, playerY);

    if (playerX < 95 && mazeCell.right === 0 && !roundOver) {
      Vibration.vibrate(5);
      setPlayerX(playerX + 10);
    }
  };

  const movePlayerLeft = () => {
    let mazeCell = getMazeCell(playerX, playerY);

    if (playerX > 5 && mazeCell.left === 0 && !roundOver) {
      Vibration.vibrate(5);
      setPlayerX(playerX - 10);
    }
  };

  const movePlayerDown = () => {
    let mazeCell = getMazeCell(playerX, playerY);

    if (playerY < 95 && mazeCell.bottom === 0 && !roundOver) {
      Vibration.vibrate(5);
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
    setX: (arg1: any) => void,
    setY: (arg1: any) => void
  ) {
    let index = 0;
    let timeout: any;

    const follow = () => {
      if (index < searchPath.length && !roundOverRef.current) {
        timeout = setTimeout(() => {
          setX(searchPath[index][1] + 5);
          setY(searchPath[index][0] + 5);
          index++;
          follow();
        }, difficulty);
      } else {
        clearTimeout(timeout);
      }
    };

    follow();
  }

  function runAway(
    setPlayerPos: (arg1: any) => void,
    searchPath1: any,
    searchPath2: any
  ) {
    let timeout: any;

    const run = () => {
      if (!roundOverRef.current) {
        timeout = setTimeout(() => {
          if (
            !isUndefined(searchPath1) &&
            !isUndefined(searchPath2) &&
            !roundOverRef.current
          ) {
            setPlayerPos((oldPos: any) => {
              return runAwayAlgorithm(
                oldPos,
                searchPath1,
                searchPath2,
                mazeGrid
              );
            });
            run();
          } else {
            clearTimeout(timeout);
          }
        }, difficulty);
      } else {
        clearTimeout(timeout);
      }
    };

    run();
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
      followPath(searchPath1, setPlayer2X, setPlayer2Y);
      followPath(searchPath2, setPlayer3X, setPlayer3Y);
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
      followPath(searchPath2, setPlayer3X, setPlayer3Y);
      runAway(setPlayer2Pos, searchPath1, searchPath2);
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
      followPath(searchPath2, setPlayer2X, setPlayer2Y);
      runAway(setPlayer3Pos, searchPath1, searchPath2);
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

    if (playerX === player3X && playerY === player3Y && !scored) {
      if (gameDetails.targetPlayer === 1 || gameDetails.targetPlayer === 3) {
        if (gameDetails.targetPlayer === 1) {
          player3Score++;
          setScored(true);
          settingRoundOverDetails({
            chaser: gameDetails.player3Colour,
            caught: gameDetails.colour,
          });
        } else if (gameDetails.targetPlayer === 3) {
          player1Score++;
          setScored(true);
          settingRoundOverDetails({
            chaser: gameDetails.colour,
            caught: gameDetails.player3Colour,
          });
        }
        setRoundOver(true);
      }
    }

    if (player3X === player2X && player3Y === player2Y && !scored) {
      if (gameDetails.targetPlayer === 2 || gameDetails.targetPlayer === 3) {
        if (gameDetails.targetPlayer === 2) {
          player3Score++;
          setScored(true);
          settingRoundOverDetails({
            chaser: gameDetails.player3Colour,
            caught: gameDetails.player2Colour,
          });
        } else if (gameDetails.targetPlayer === 3) {
          player2Score++;
          setScored(true);
          settingRoundOverDetails({
            chaser: gameDetails.player2Colour,
            caught: gameDetails.player3Colour,
          });
        }
        setRoundOver(true);
      }
    }

    if (player2X === playerX && player2Y === playerY && !scored) {
      if (gameDetails.targetPlayer === 2 || gameDetails.targetPlayer === 1) {
        if (gameDetails.targetPlayer === 2) {
          player1Score++;
          setScored(true);
          settingRoundOverDetails({
            chaser: gameDetails.colour,
            caught: gameDetails.player2Colour,
          });
        } else if (gameDetails.targetPlayer === 1) {
          player2Score++;
          setScored(true);
          settingRoundOverDetails({
            chaser: gameDetails.player2Colour,
            caught: gameDetails.colour,
          });
        }
        setRoundOver(true);
      }
    }
  }, [playerX, playerY, player2X, player2Y, player3X, player3Y]);

  useEffect(() => {
    if (roundOver) {
      roundOverRef.current = roundOver;
      Vibration.vibrate(500);
      setTimerRunning(false);
      gameDetails.player1Score = player1Score;
      gameDetails.player2Score = player2Score;
      gameDetails.player3Score = player3Score;
      gameDetails.flag = "gameplay";
      gameDetails.currentRound++;
      if (gameDetails.currentRound > gameDetails.rounds) {
        gameDetails.gameOver = true;
        setTimeout(() => {
          navigation.navigate(Screens.EndGame, gameDetails);
        }, roundOverDuration);
      } else {
        setTimeout(() => {
          navigation.navigate(Screens.ChasedownRoles, gameDetails);
        }, roundOverDuration);
      }
    }
  }, [roundOver]);

  function timerExpired() {
    if (gameDetails.targetPlayer === 1) {
      player1Score++;
      setRoundOverDetails({ survivor: gameDetails.colour });
    } else if (gameDetails.targetPlayer === 2) {
      player2Score++;
      setRoundOverDetails({ survivor: gameDetails.player2Colour });
    } else if (gameDetails.targetPlayer === 3) {
      setRoundOverDetails({ survivor: gameDetails.player3Colour });
      player3Score++;
    }
    setRoundOver(true);
  }

  return (
    <>
      <BGWithImage image={userContext.chasedownBackground}>
        <View style={globalStyles().gameHeaderContainer}>
          <SinglePlayerScore
            colour={gameDetails.colour}
            score={gameDetails.player1Score}
          />
          <SinglePlayerScore
            colour={gameDetails.player2Colour}
            score={gameDetails.player2Score}
          />
          <SinglePlayerScore
            colour={gameDetails.player3Colour}
            score={gameDetails.player3Score}
          />

          <CountdownCircleTimer
            isPlaying={timerRunning}
            duration={gameDetails.timeLimit}
            colors={timerDetails as any}
            size={60}
            strokeWidth={2}
            onComplete={() => timerExpired()}
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

              <PlayerAvatar
                top={player3Y}
                left={player3X}
                colour={gameDetails.player3Colour}
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
          gameOver={gameDetails.currentRound > gameDetails.rounds}
          details={roundOverDetails}
        />
      )}
    </>
  );
};

export default ChasedownGameplayScreen;
