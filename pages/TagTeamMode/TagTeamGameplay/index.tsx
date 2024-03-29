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
  updateSearchPath,
  runAwaySingleChaser,
  getMazeCell,
} from "../../../tools/BotBrain";
import Controller from "../../../components/Controller/Controller";
import BGWithImage from "../../../components/BGWithImage";
import { UserContext } from "../../../tools/UserContext";
import RoundOverAlert from "../../../components/RoundOverAlert/RoundOverAlert";
import {
  roundOverDuration,
  playerAnimationDelay,
} from "../../../constants/Animation";
import globalStyles from "../../../constants/GlobalStyles";
import { isUndefined } from "lodash";
import PlayerAvatar from "../../../components/PlayerAvatar";
import { Screens } from "../../../constants/types";
import SingleTeamScore from "../../../components/SingleTeamScore";
import { Difficulty } from "../../../constants/gameConstants";

const height = Dimensions.get("window").height;
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

const TagTeamGameplay = ({ navigation, route }: any) => {
  const userContext = useContext(UserContext);
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

  const [roundOver, setRoundOver] = useState(false);
  const [roundOverDetails, setRoundOverDetails] = useState<any>();
  const roundOverRef = useRef<any>();

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

  const difficulty = Difficulty[gameDetails.difficulty];
  const [scored, setScored] = useState(false);

  // So the details can't accidentally be set twice in the same game
  const settingRoundOverDetails = (newDetails: any) => {
    if (roundOverDetails === undefined) {
      setRoundOverDetails(newDetails);
    }
  };

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

  function followPath(
    searchPath: any,
    setX: (arg1: any) => void,
    setY: (arg1: any) => void
  ) {
    let index = 0;
    let timeout: any;

    const follow = () => {
      if (
        !isUndefined(searchPath[index]) &&
        index < searchPath.length &&
        !roundOverRef.current
      ) {
        timeout = setTimeout(() => {
          if (
            !isUndefined(searchPath[index]) &&
            index < searchPath.length &&
            !roundOverRef.current
          ) {
            setX(searchPath[index][1] + 5);
            setY(searchPath[index][0] + 5);
            index++;
            follow();
          }
        }, difficulty);
      } else {
        clearTimeout(timeout);
      }
    };

    follow();
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

  function runAway(setPlayerPos: (arg1: any) => void, searchPath: any) {
    let timeout: any;

    const run = () => {
      if (!roundOverRef.current && !isUndefined(searchPath)) {
        timeout = setTimeout(() => {
          setPlayerPos((oldPos: any) => {
            return runAwaySingleChaser(oldPos, searchPath, mazeGrid);
          });
          if (!roundOverRef.current && !isUndefined(searchPath)) {
            run();
          }
        }, difficulty);
      } else {
        clearTimeout(timeout);
      }
    };

    run();
  }

  /**
   * Starts the game
   */
  useEffect(() => {
    roundOverRef.current = roundOver;
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
      followPath(searchPath1, setPlayer4X, setPlayer4Y);

      aStarSearch(
        searchGrid2,
        searchPath2,
        playerX,
        playerY,
        player3X,
        player3Y
      );
      searchPath2 = searchPath2.reverse();

      runAway(setPlayer2Pos, searchPath1);
      runAway(setPlayer3Pos, searchPath2);
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
      followPath(searchPath1, setPlayer3X, setPlayer3Y);

      aStarSearch(
        searchGrid2,
        searchPath2,
        playerX,
        playerY,
        player4X,
        player4Y
      );
      searchPath2 = searchPath2.reverse();

      runAway(setPlayer2Pos, searchPath1);
      runAway(setPlayer4Pos, searchPath2);
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
      followPath(searchPath1, setPlayer2X, setPlayer2Y);

      aStarSearch(
        searchGrid2,
        searchPath2,
        player3X,
        player3Y,
        playerX,
        playerY
      );
      searchPath2 = searchPath2.reverse();
      followPath(searchPath2, setPlayer3X, setPlayer3Y);

      runAway(setPlayer4Pos, searchPath1);
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
      followPath(searchPath1, setPlayer2X, setPlayer2Y);

      aStarSearch(
        searchGrid2,
        searchPath2,
        player4X,
        player4Y,
        playerX,
        playerY
      );
      searchPath2 = searchPath2.reverse();
      followPath(searchPath2, setPlayer4X, setPlayer4Y);

      runAway(setPlayer3Pos, searchPath1);
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

    if (playerX === player3X && playerY === player3Y && !scored) {
      // Player is chasing 3
      if (gameDetails.currentRound === 1 || gameDetails.currentRound === 5) {
        settingRoundOverDetails({
          chaser: gameDetails.colour,
          caught: gameDetails.player3Colour,
        });
        team1Score++;
        setScored(true);
        setRoundOver(true);
      }
      // 3 is chasing Player
      else if (
        gameDetails.currentRound === 3 ||
        gameDetails.currentRound === 7
      ) {
        settingRoundOverDetails({
          chaser: gameDetails.player3Colour,
          caught: gameDetails.colour,
        });
        team2Score++;
        setScored(true);
        setRoundOver(true);
      }
    } else if (playerX === player4X && playerY === player4Y && !scored) {
      // Player is chasing 4
      if (gameDetails.currentRound === 2 || gameDetails.currentRound === 6) {
        settingRoundOverDetails({
          chaser: gameDetails.colour,
          caught: gameDetails.player4Colour,
        });
        team1Score++;
        setScored(true);
        setRoundOver(true);
      }
      // 4 is chasing Player
      else if (gameDetails.currentRound === 4) {
        settingRoundOverDetails({
          chaser: gameDetails.player4Colour,
          caught: gameDetails.colour,
        });
        team2Score++;
        setScored(true);
        setRoundOver(true);
      }
    } else if (player2X === player3X && player2Y === player3Y && !scored) {
      // 2 is chasing 3
      if (gameDetails.currentRound === 4) {
        settingRoundOverDetails({
          chaser: gameDetails.player2Colour,
          caught: gameDetails.player3Colour,
        });
        team1Score++;
        setScored(true);
        setRoundOver(true);
      }
      // 3 is chasing 2
      else if (
        gameDetails.currentRound === 2 ||
        gameDetails.currentRound === 6
      ) {
        settingRoundOverDetails({
          chaser: gameDetails.player3Colour,
          caught: gameDetails.player2Colour,
        });
        team2Score++;
        setScored(true);
        setRoundOver(true);
      }
    } else if (player2X === player4X && player2Y === player4Y && !scored) {
      // 2 is chasing 4
      if (gameDetails.currentRound === 3 || gameDetails.currentRound === 7) {
        settingRoundOverDetails({
          chaser: gameDetails.player2Colour,
          caught: gameDetails.player4Colour,
        });
        team1Score++;
        setScored(true);
        setRoundOver(true);
      }
      // 4 is chasing 2
      else if (
        gameDetails.currentRound === 1 ||
        gameDetails.currentRound === 5
      ) {
        settingRoundOverDetails({
          chaser: gameDetails.player4Colour,
          caught: gameDetails.player2Colour,
        });
        team2Score++;
        setScored(true);
        setRoundOver(true);
      }
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
      roundOverRef.current = roundOver;
      Vibration.vibrate(500);
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
        setTimeout(() => {
          navigation.navigate(Screens.EndGame, gameDetails);
        }, roundOverDuration);
      } else {
        setTimeout(() => {
          navigation.navigate(Screens.TagTeamRoles, gameDetails);
        }, roundOverDuration);
      }
    }
  }, [roundOver]);

  return (
    <>
      <BGWithImage image={userContext.tagTeamBackground}>
        <View style={globalStyles().gameHeaderContainer}>
          <SingleTeamScore
            colour1={gameDetails.colour}
            colour2={gameDetails.player2Colour}
            score={gameDetails.team1Score}
          />
          <SingleTeamScore
            colour1={gameDetails.player3Colour}
            colour2={gameDetails.player4Colour}
            score={gameDetails.team2Score}
          />
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
                top={player4Y}
                left={player4X}
                colour={gameDetails.player4Colour}
                delay={difficulty}
              />
              <PlayerAvatar
                top={player3Y}
                left={player3X}
                colour={gameDetails.player3Colour}
                delay={difficulty}
              />
              <PlayerAvatar
                top={player2Y}
                left={player2X}
                colour={gameDetails.player2Colour}
                delay={difficulty}
              />
              <PlayerAvatar
                top={playerY}
                left={playerX}
                colour={gameDetails.colour}
                delay={playerAnimationDelay}
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
export default TagTeamGameplay;
