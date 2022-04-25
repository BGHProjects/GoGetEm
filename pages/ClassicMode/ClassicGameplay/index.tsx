import React, { useState, useEffect, useContext, useRef } from "react";
import { View, Dimensions, Vibration } from "react-native";
import { Svg, Circle } from "react-native-svg";
import {
  generateCells,
  makeMaze,
  trimMaze,
  makeSearchGrid,
} from "../../../tools/MazeAndGridGeneration";
import { aStarSearch } from "../../../tools/BotBrain";
import Controller from "../../../components/Controller/Controller";
import BGWithImage from "../../../components/BGWithImage";
import { UserContext } from "../../../tools/UserContext";
import { getMazeCell } from "../../../tools/BotBrain";
import RoundOverAlert from "../../../components/RoundOverAlert/RoundOverAlert";
import { roundOverDuration } from "../../../constants/Animation";
import globalStyles from "../../../constants/GlobalStyles";

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
let player1Score: number;
let player2Score: number;
let player3Score: number;
let playerSize = 4;
const playerStart = [55, 15];
const leftStart = [5, 85];
const rightStart = [95, 85];

const ClassicGameplayScreen = ({ navigation, route }) => {
  const userContext = useContext(UserContext);

  let gameDetails = route.params;
  // Currently, both AIs start at the same Y position
  const [playerX, setplayerX] = useState(playerStart[0]);
  const [playerY, setplayerY] = useState(playerStart[1]);
  const [player2X, setplayer2X] = useState(
    gameDetails.currentRound % 2 < 1 ? leftStart[0] : rightStart[0]
  );
  const [player2Y, setplayer2Y] = useState(85);
  const [player3X, setplayer3X] = useState(
    gameDetails.currentRound % 2 < 1 ? rightStart[0] : leftStart[0]
  );
  const [player3Y, setplayer3Y] = useState(85);
  const [player2Started, setPlayer2Started] = useState<any>(false);
  const [roundOver, setRoundOver] = useState(false);
  const [roundOverDetails, setRoundOverDetails] = useState<any>();
  const roundOverRef = useRef<any>();

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
  }, []);

  const movePlayerUp = () => {
    let mazeCell = getMazeCell(playerX, playerY, mazeGrid);

    if (playerY > 5 && mazeCell.top === 0 && !roundOver) {
      Vibration.vibrate(5);
      setplayerY(playerY - 10);
    }
  };

  const movePlayerRight = () => {
    let mazeCell = getMazeCell(playerX, playerY, mazeGrid);

    if (playerX < 95 && mazeCell.right === 0 && !roundOver) {
      Vibration.vibrate(5);
      setplayerX(playerX + 10);
    }
  };

  const movePlayerLeft = () => {
    let mazeCell = getMazeCell(playerX, playerY, mazeGrid);

    if (playerX > 5 && mazeCell.left === 0 && !roundOver) {
      Vibration.vibrate(5);
      setplayerX(playerX - 10);
    }
  };

  const movePlayerDown = () => {
    let mazeCell = getMazeCell(playerX, playerY, mazeGrid);

    if (playerY < 95 && mazeCell.bottom === 0 && !roundOver) {
      Vibration.vibrate(5);
      setplayerY(playerY + 10);
    }
  };

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
    setPlayer2Started(true); // Need to dig deeper to find out why I need this
    followPath(searchPath1, setplayer2X, setplayer2Y);
    followPath(searchPath2, setplayer3X, setplayer3Y);
  }, []);

  useEffect(() => {
    let player1Cell = getMazeCell(playerX, playerY, mazeGrid);
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
      let player2Cell = getMazeCell(player2X, player2Y, mazeGrid);
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
        settingRoundOverDetails({
          chaser: gameDetails.player3Colour,
          caught: gameDetails.colour,
        });
      } else {
        player1Score++;
        settingRoundOverDetails({
          chaser: gameDetails.colour,
          caught: gameDetails.player3Colour,
        });
      }

      setRoundOver(true);
    }

    if (player3X === player2X && player3Y === player2Y) {
      if (gameDetails.currentRound % 2 < 1) {
        player2Score++;
        settingRoundOverDetails({
          chaser: gameDetails.player2Colour,
          caught: gameDetails.player3Colour,
        });
      } else {
        player3Score++;
        settingRoundOverDetails({
          chaser: gameDetails.player3Colour,
          caught: gameDetails.player2Colour,
        });
      }
      setRoundOver(true);
    }

    if (player2X === playerX && player2Y === playerY) {
      if (gameDetails.currentRound % 2 < 1) {
        player1Score++;
        settingRoundOverDetails({
          chaser: gameDetails.colour,
          caught: gameDetails.player2Colour,
        });
      } else {
        player2Score++;
        settingRoundOverDetails({
          chaser: gameDetails.player2Colour,
          caught: gameDetails.colour,
        });
      }
      setRoundOver(true);
    }
  }, [playerX, playerY, player2X, player2Y, player3X, player3Y]);

  useEffect(() => {
    if (roundOver) {
      roundOverRef.current = roundOver;
      Vibration.vibrate(500);

      gameDetails.player1Score = player1Score;
      gameDetails.player2Score = player2Score;
      gameDetails.player3Score = player3Score;
      gameDetails.flag = "gameplay";
      gameDetails.currentRound++;
      if (gameDetails.currentRound > gameDetails.rounds) {
        gameDetails.gameOver = true;
        setTimeout(() => {
          navigation.navigate("End Game", gameDetails);
        }, roundOverDuration);
      } else {
        setTimeout(() => {
          navigation.navigate("Classic Roles", gameDetails);
        }, roundOverDuration);
      }
    }
  }, [roundOver]);

  // just for testing
  useEffect(() => {
    console.log("roundOverDetails", roundOverDetails);
  }, [roundOverDetails]);

  return (
    <>
      <BGWithImage image={userContext.classicBackground}>
        <View style={[globalStyles().mazeContainer, { marginTop: 50 }]}>
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
          gameOver={gameDetails.currentRound > gameDetails.rounds}
          details={roundOverDetails}
        />
      )}
    </>
  );
};

export default ClassicGameplayScreen;
