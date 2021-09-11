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
const mazeGrid: any = [];
const wallWidth = 1;
const stack: any = [];
let gridColor = "violet";
let searchGrid1: any = [];

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

function makeSearchGrid() {
  searchGrid1 = [...mazeGrid];

  for (let i = 0; i < searchGrid1.length; i++) {
    searchGrid1[i].f = 0;
    searchGrid1[i].g = 0;
    searchGrid1[i].h = 0;
    searchGrid1[i].neighbours = [];
    searchGrid1[i].previous = null;
  }

  return searchGrid1;
}

function findNeighbour(cell: any) {
  let defined = [];

  let top = searchGrid1.filter(
    (item: any) => item.row === cell.row - 10 && item.col === cell.col
  );
  let right = searchGrid1.filter(
    (item: any) => item.col === cell.col + 10 && item.row === cell.row
  );
  let bottom = searchGrid1.filter(
    (item: any) => item.row === cell.row + 10 && item.col === cell.col
  );
  let left = searchGrid1.filter(
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

generateCells();
makeMaze();
makeSearchGrid();

const ClassicGameplayScreen = ({ navigation }) => {
  const [playerX, setplayerX] = useState(5);
  const [playerY, setplayerY] = useState(5);
  const [player2X, setplayer2X] = useState(95);
  const [player2Y, setplayer2Y] = useState(95);

  const movePlayerUp = () => {
    let mazeCell = getPlayerMazeCell();

    if (playerY > 5 && mazeCell.top === 0) {
      setplayerY(playerY - 10);
    }
  };

  const movePlayerRight = () => {
    let mazeCell = getPlayerMazeCell();

    if (playerX < 95 && mazeCell.right === 0) {
      setplayerX(playerX + 10);
    }
  };

  const movePlayerLeft = () => {
    let mazeCell = getPlayerMazeCell();

    if (playerX > 5 && mazeCell.left === 0) {
      setplayerX(playerX - 10);
    }
  };

  const movePlayerDown = () => {
    let mazeCell = getPlayerMazeCell();

    if (playerY < 95 && mazeCell.bottom === 0) {
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

  function heuristic(a: any, b: any) {
    let xs = Number(b.row) - Number(a.row);
    let ys = Number(b.col) - Number(a.col);
    let answer = Math.abs(xs) + Math.abs(ys);

    return answer;
  }

  const aStarSearch = (playerPosition: any) => {
    let openSet = [];
    let closedSet = [];
    let start = searchGrid1[99];
    let end = playerPosition;

    openSet.push(start);

    while (openSet.length > 0) {
      let lowestIndex = 0;

      let current: any = openSet[lowestIndex];

      if (current === end) {
        let path = [];
        let temp = current;
        path.push(temp);
        while (temp.previous) {
          path.push(temp.previous);
          temp = temp.previous;
        }

        for (let i = 0; i < path.length; i++) {
          path[i].color = "blue";
        }

        //console.log("\n Object.keys(path[0]) ", Object.keys(path[0]));
        //console.log("\n path[0].color ", path[0].color);

        console.log("Done");
      }

      openSet.splice(lowestIndex, 1);
      // openSet.remove(current)
      closedSet.push(current);

      findNeighbour(current);
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

  useEffect(() => {
    for (let i = 0; i < searchGrid1.length; i++) {
      searchGrid1[i].color = null;
    }
    let cell = getPlayerMazeCell();
    aStarSearch(cell);
  }, [playerX, playerY]);

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
          <Circle cx={player2X} cy={player2Y} r="3" fill="lightgreen"></Circle>
          <Circle cx={playerX} cy={playerY} r="3" fill="red"></Circle>
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
