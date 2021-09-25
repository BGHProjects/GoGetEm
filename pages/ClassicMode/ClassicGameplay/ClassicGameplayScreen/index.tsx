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
import { Svg, Circle } from "react-native-svg";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const mazeSideLength = height * 0.4;
const cellSize = height * 0.04;
let mazeGrid: any = [];
const wallWidth = 1;
const stack: any = [];
let gridColor = "white";
let searchGrid1: any = [];
let searchGrid2: any = [];
let searchPath1: any = [];
let searchPath2: any = [];

const generateCells = () => {
  mazeGrid.length = 0;
  for (let rowNum = 0; rowNum < 10; rowNum++) {
    for (let colNum = 0; colNum < 10; colNum++) {
      mazeGrid.push({
        row: rowNum * 10,
        col: colNum * 10,
        top: wallWidth,
        right: wallWidth,
        bottom: wallWidth,
        left: wallWidth,
        visited: false,
        color: null,
      });
      //console.log((`${rowNum}` + `${colNum}`).toString());
    }
  }
};

const checkNeighbours = (cell: any) => {
  let neighbours = [];
  let defined = [];

  // Finds the neighbours in the grid
  let top = mazeGrid.filter(
    (item: any) => item.row === cell.row - 10 && item.col === cell.col
  );
  let right = mazeGrid.filter(
    (item: any) => item.col === cell.col + 10 && item.row === cell.row
  );
  let bottom = mazeGrid.filter(
    (item: any) => item.row === cell.row + 10 && item.col === cell.col
  );
  let left = mazeGrid.filter(
    (item: any) => item.col === cell.col - 10 && item.row === cell.row
  );

  // If there is a neighbour for that cell, add it to defined
  if (top.length > 0) {
    defined.push(top[0]);
  }

  if (right.length > 0) {
    defined.push(right[0]);
  }

  if (bottom.length > 0) {
    defined.push(bottom[0]);
  }

  if (left.length > 0) {
    defined.push(left[0]);
  }

  // Add all unvisited neighbours to neighbours
  for (let i = 0; i < defined.length; i++) {
    if (defined[i].visited === false) {
      neighbours.push(defined[i]);
    }
  }

  // Pick a random neighbour
  if (neighbours.length > 0) {
    let r = Math.floor(Math.random() * neighbours.length + 1);
    return neighbours[r - 1];
  } else {
    return undefined;
  }
};

const removeWalls = (current: any, neighbour: any) => {
  if (neighbour.row < current.row) {
    current.top = 0;
    neighbour.bottom = 0;
  } else if (neighbour.col > current.col) {
    current.right = 0;
    neighbour.left = 0;
  } else if (neighbour.row > current.row) {
    current.bottom = 0;
    neighbour.top = 0;
  } else if (neighbour.col < current.col) {
    current.left = 0;
    neighbour.right = 0;
  }
};

const makeMaze = () => {
  let current = mazeGrid[0];
  current.visited = true;

  for (let i = 0; i < 300; i++) {
    if (mazeGrid.every((cell: any) => cell.visited === true) === false) {
      // Get the next cell to visit
      let next = checkNeighbours(current);
      if (next) {
        next.visited = true;
        stack.push(current);
        removeWalls(current, next);
        current = next;
      } else if (stack.length > 0) {
        current = stack.pop();
        // Finds the previous current, to find a new next
      }
    }
  }
};

function trimMaze() {
  let result = mazeGrid.map(function (cell: any, index: any, elements: any) {
    if (cell.top > 0) {
      if (index > 9) {
        // Don't take any from the top border wall
        // Get the right and left neighbours
        let right = mazeGrid.filter(
          (item: any) => item.col === cell.col + 10 && item.row === cell.row
        );

        let left = mazeGrid.filter(
          (item: any) => item.col === cell.col - 10 && item.row === cell.row
        );

        // If there are neighbours
        if (right[0] !== undefined && left[0] !== undefined) {
          // If the neighbours also have a top border
          if (right[0].top > 0 && left[0].top > 0) {
            cell.top = 0;
          }
        }
      }
    }

    if (cell.bottom > 0) {
      if (index < 90) {
        // Don't take any from the bottom border wall
        // Get the right and left neighbours
        let right = mazeGrid.filter(
          (item: any) => item.col === cell.col + 10 && item.row === cell.row
        );

        let left = mazeGrid.filter(
          (item: any) => item.col === cell.col - 10 && item.row === cell.row
        );

        // If there are neighbours
        if (right[0] !== undefined && left[0] !== undefined) {
          // If the neighbours also have a bottom border
          if (right[0].bottom > 0 && left[0].bottom > 0) {
            cell.bottom = 0;
          }
        }
      }
    }

    if (cell.right > 0) {
      if (
        Number(index.toString()[index.toString().length - 1]) !== 9 &&
        Number(index.toString()[index.toString().length - 1]) !== 0
      ) {
        // Don't take any from the right border wall
        // Get the top and bottom neighbours
        let top = mazeGrid.filter(
          (item: any) => item.row === cell.row - 10 && item.col === cell.col
        );

        let bottom = mazeGrid.filter(
          (item: any) => item.row === cell.row + 10 && item.col === cell.col
        );

        let right = mazeGrid.filter(
          (item: any) => item.col === cell.col + 10 && item.row === cell.row
        );

        // If there are neighbours
        if (top[0] !== undefined && bottom[0] !== undefined) {
          // If the neighbours also have a right border
          if (top[0].right > 0 && bottom[0].right > 0) {
            cell.right = 0;
            if (right[0] !== undefined) {
              right[0].left = 0;
            }
          }
        }
      }
    }

    if (cell.left > 0) {
      if (
        Number(index.toString()[index.toString().length - 1]) !== 0 &&
        Number(index.toString()[index.toString().length - 1]) !== 9
      ) {
        // Don't take any from the right border wall
        // Get the top and bottom neighbours
        let top = mazeGrid.filter(
          (item: any) => item.row === cell.row - 10 && item.col === cell.col
        );

        let bottom = mazeGrid.filter(
          (item: any) => item.row === cell.row + 10 && item.col === cell.col
        );

        let left = mazeGrid.filter(
          (item: any) => item.col === cell.col - 10 && item.row === cell.row
        );

        // If there are neighbours
        if (top[0] !== undefined && bottom[0] !== undefined) {
          // If the neighbours also have a right border
          if (top[0].left > 0 && bottom[0].left > 0) {
            cell.left = 0;
            if (left[0] !== undefined) {
              left[0].right = 0;
            }
          }
        }
      }
    }

    return cell;
  });
}

function makeSearchGrid(searchGrid: any) {
  searchGrid.length = 0;

  for (let i = 0; i < mazeGrid.length; i++) {
    let object = {
      row: mazeGrid[i].row,
      col: mazeGrid[i].col,
      top: mazeGrid[i].top,
      right: mazeGrid[i].right,
      bottom: mazeGrid[i].bottom,
      left: mazeGrid[i].left,
      f: 0,
      g: 0,
      h: 0,
      neighbours: [],
      previous: null,
    };
    searchGrid.push(object);
  }

  return searchGrid;
}

function findNeighbour(cell: any, searchGrid: any) {
  let defined = [];

  let top = searchGrid.filter(
    (item: any) => item.row === cell.row - 10 && item.col === cell.col
  );
  let right = searchGrid.filter(
    (item: any) => item.col === cell.col + 10 && item.row === cell.row
  );
  let bottom = searchGrid.filter(
    (item: any) => item.row === cell.row + 10 && item.col === cell.col
  );
  let left = searchGrid.filter(
    (item: any) => item.col === cell.col - 10 && item.row === cell.row
  );

  // If there is a neighbour for that cell, add it to defined
  if (top.length > 0) {
    if (top[0].bottom === 0) {
      defined.push(top[0]);
    }
  }

  if (right.length > 0) {
    if (right[0].left === 0) {
      defined.push(right[0]);
    }
  }

  if (bottom.length > 0) {
    if (bottom[0].top === 0) {
      defined.push(bottom[0]);
    }
  }

  if (left.length > 0) {
    if (left[0].right === 0) {
      defined.push(left[0]);
    }
  }

  // Add all unvisited neighbours to neighbours
  for (let i = 0; i < defined.length; i++) {
    cell.neighbours.push(defined[i]);
  }
}

const ClassicGameplayScreen = ({ navigation, route }) => {
  const [playerX, setplayerX] = useState(55);
  const [playerY, setplayerY] = useState(15);
  const [player2X, setplayer2X] = useState(85);
  const [player2Y, setplayer2Y] = useState(85);
  const [player3X, setplayer3X] = useState(5);
  const [player3Y, setplayer3Y] = useState(85);
  const [search1IntervalId, setSearch1IntervalId] = useState<any>(null);
  const [search2IntervalId, setSearch2IntervalId] = useState<any>(null);
  const [player2Started, setPlayer2Started] = useState<any>(false);
  const [gameOver, setGameOver] = useState(false);
  let configDetails = route.params;
  let difficulty =
    configDetails.difficulty === "Meh"
      ? 700
      : configDetails.difficulty === "Oh OK"
      ? 500
      : configDetails.difficulty === "Hang On"
      ? 400
      : 300;

  useEffect(() => {
    generateCells();
    makeMaze();
    trimMaze();
    makeSearchGrid(searchGrid1);
    makeSearchGrid(searchGrid2);
    console.log("configDetails ", configDetails);
  }, []);

  const movePlayerUp = () => {
    let mazeCell = getPlayerMazeCell();

    if (playerY > 5 && mazeCell.top === 0 && !gameOver) {
      setplayerY(playerY - 10);
    }
  };

  const movePlayerRight = () => {
    let mazeCell = getPlayerMazeCell();

    if (playerX < 95 && mazeCell.right === 0 && !gameOver) {
      setplayerX(playerX + 10);
    }
  };

  const movePlayerLeft = () => {
    let mazeCell = getPlayerMazeCell();

    if (playerX > 5 && mazeCell.left === 0 && !gameOver) {
      setplayerX(playerX - 10);
    }
  };

  const movePlayerDown = () => {
    let mazeCell = getPlayerMazeCell();

    if (playerY < 95 && mazeCell.bottom === 0 && !gameOver) {
      setplayerY(playerY + 10);
    }
  };

  const getPlayerMazeCell = () => {
    let digit1 = (playerX - 5).toString();
    let digit2 = (playerY - 5).toString();
    let digits;

    if (digit2 === "0") {
      digits = digit1[0];
    } else {
      digits = digit2[0] + digit1[0];
    }

    return mazeGrid[digits];
  };

  const getPlayer2MazeCell = () => {
    let digit1 = (player2X - 5).toString();
    let digit2 = (player2Y - 5).toString();
    let digits;

    if (digit2 === "0") {
      digits = digit1[0];
    } else {
      digits = digit2[0] + digit1[0];
    }

    return mazeGrid[digits];
  };

  function heuristic(a: any, b: any) {
    let xs = Number(b.row) - Number(a.row);
    let ys = Number(b.col) - Number(a.col);
    let answer = Math.abs(xs) + Math.abs(ys);

    return answer;
  }

  const aStarSearch = (whichPlayer?: any) => {
    let openSet = [];
    let closedSet = [];
    let start;
    let end;
    let searchPath;
    let searchGrid;

    if (whichPlayer === "player2") {
      start = searchGrid1[89];

      end = searchGrid1.filter(
        (item: any) => item.row === playerY - 5 && item.col === playerX - 5
      )[0];
      searchPath = searchPath1;
      searchGrid = searchGrid1;
    } else if (whichPlayer === "player3") {
      start = searchGrid2[80];
      end = searchGrid2[89];
      searchPath = searchPath2;
      searchGrid = searchGrid2;
    }

    openSet.push(start);

    while (openSet.length > 0) {
      let lowestIndex = 0;

      let current: any = openSet[lowestIndex];

      if (current === end) {
        searchPath.length = 0;
        let temp = current;
        searchPath.push([temp.row, temp.col]);
        while (temp.previous) {
          searchPath.push([temp.previous.row, temp.previous.col]);
          temp = temp.previous;
        }
      }

      openSet.splice(lowestIndex, 1);
      closedSet.push(current);

      findNeighbour(current, searchGrid);

      for (let i = 0; i < current.neighbours.length; i++) {
        let neighbour: any = current.neighbours[i];
        if (!closedSet.includes(neighbour)) {
          let tempG = current.g + 1;

          if (openSet.includes(neighbour)) {
            if (tempG < neighbour.g) {
              neighbour.g = tempG;
            }
          } else {
            neighbour.g = tempG;
            openSet.push(neighbour);
          }

          neighbour.h = heuristic(neighbour, end);
          neighbour.f = neighbour.g + neighbour.h;
          neighbour.previous = current;
        }
      }
    }
  };

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
    aStarSearch("player2");
    aStarSearch("player3");
    //Search Paths are compiled in reverse
    searchPath1 = searchPath1.reverse();
    searchPath2 = searchPath2.reverse();
    followPath("player2", searchPath1);
    followPath("player3", searchPath2);
  }, []);

  useEffect(() => {
    let player1Cell = getPlayerMazeCell();
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
      let player2Cell = getPlayer2MazeCell();
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
      setGameOver(true);
      console.log("\n Player caught Player 3!");
    }

    if (player3X === player2X && player3Y === player2Y) {
      setGameOver(true);
      console.log("\n Player 3 caught Player 2!");
    }

    if (player2X === playerX && player2Y === playerY) {
      setGameOver(true);
      console.log("\n Player 2 caught Player!");
    }
  }, [playerX, playerY, player2X, player2Y, player3X, player3Y]);

  useEffect(() => {
    if (gameOver) {
      clearInterval(search1IntervalId);
      clearInterval(search2IntervalId);
      console.log("\n\n GAME OVER");
      navigation.navigate("Classic Config");
    }
  }, [gameOver]);

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
            r="3"
            fill={`${configDetails.player3Colour}`}
          ></Circle>
          <Circle
            cx={player2X}
            cy={player2Y}
            r="3"
            fill={`${configDetails.player2Colour}`}
          ></Circle>
          <Circle
            cx={playerX}
            cy={playerY}
            r="3"
            fill={`${configDetails.colour}`}
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
