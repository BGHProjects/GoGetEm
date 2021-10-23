export function findNeighbour(cell: any, searchGrid: any) {
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

function heuristic(a: any, b: any) {
  let xs = Number(b.row) - Number(a.row);
  let ys = Number(b.col) - Number(a.col);
  let answer = Math.abs(xs) + Math.abs(ys);

  return answer;
}

export const aStarSearch = (
  searchGrid: any,
  searchPath: any,
  playerX: any,
  playerY: any,
  targetX: any,
  targetY: any
) => {
  let openSet = [];
  let closedSet = [];

  let start = searchGrid.filter(
    (item: any) => item.row === playerY - 5 && item.col === playerX - 5
  )[0];

  let end = searchGrid.filter(
    (item: any) => item.row === targetY - 5 && item.col === targetX - 5
  )[0];

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

function getMazeCell(X: any, Y: any, mazeGrid: any) {
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

export function runAwayAlgorithm(
  currentPlayerPos: any,
  searchPath1: any,
  searchPath2: any,
  mazeGrid: any
) {
  let neighbours = [];
  let potentialMovements = [];

  // Finds the neighbours in the grid
  if (currentPlayerPos[1] !== 5) {
    let top = getMazeCell(
      currentPlayerPos[0],
      currentPlayerPos[1] - 10,
      mazeGrid
    );
    if (top.bottom === 0) {
      neighbours.push(top);
    }
  }

  if (currentPlayerPos[1] !== 95) {
    let bottom = getMazeCell(
      currentPlayerPos[0],
      currentPlayerPos[1] + 10,
      mazeGrid
    );
    if (bottom.top === 0) {
      neighbours.push(bottom);
    }
  }

  if (currentPlayerPos[0] !== 95) {
    let right = getMazeCell(
      currentPlayerPos[0] + 10,
      currentPlayerPos[1],
      mazeGrid
    );
    if (right.left === 0) {
      neighbours.push(right);
    }
  }

  if (currentPlayerPos[0] !== 5) {
    let left = getMazeCell(
      currentPlayerPos[0] - 10,
      currentPlayerPos[1],
      mazeGrid
    );
    if (left.right === 0) {
      neighbours.push(left);
    }
  }

  for (let i = 0; i < neighbours.length - 1; i++) {
    if (
      (neighbours[i].row !== searchPath1[searchPath1.length - 1].row &&
        neighbours[i].col !== searchPath1[searchPath1.length - 1].col) ||
      (neighbours[i].row !== searchPath1[searchPath1.length - 2].row &&
        neighbours[i].col !== searchPath1[searchPath1.length - 2].col) ||
      (neighbours[i].row !== searchPath2[searchPath2.length - 1].row &&
        neighbours[i].col !== searchPath2[searchPath2.length - 1].col) ||
      (neighbours[i].row !== searchPath2[searchPath2.length - 2].row &&
        neighbours[i].col !== searchPath2[searchPath2.length - 2].col)
    ) {
      potentialMovements.push(neighbours[i]);
    }
  }
  let nextLocation: any;

  if (potentialMovements.length === 0) {
    let r = Math.floor(Math.random() * neighbours.length + 1);

    if (
      neighbours[r - 1].col + 5 === currentPlayerPos[2] &&
      neighbours[r - 1].row + 5 === currentPlayerPos[3]
    ) {
      if (neighbours.length > 1) {
        neighbours.splice(r - 1, 1);
        r = Math.floor(Math.random() * neighbours.length + 1);
      }

      nextLocation = neighbours[r - 1];
    } else {
      nextLocation = neighbours[r - 1];
    }
  } else {
    let r = Math.floor(Math.random() * potentialMovements.length + 1);

    if (
      potentialMovements[r - 1].col + 5 === currentPlayerPos[2] &&
      potentialMovements[r - 1].row + 5 === currentPlayerPos[3]
    ) {
      if (potentialMovements.length > 1) {
        potentialMovements.splice(r - 1, 1);
        r = Math.floor(Math.random() * potentialMovements.length + 1);
        nextLocation = potentialMovements[r - 1];
      } else {
        neighbours.filter((item: any) => {
          potentialMovements.includes(item);
        });

        neighbours.filter((item: any) => {
          item.col + 5 !== currentPlayerPos[2] &&
            item.row + 5 !== currentPlayerPos[3];
        });
        r = Math.floor(Math.random() * neighbours.length + 1);
        nextLocation = neighbours[r - 1];
      }
    } else {
      nextLocation = potentialMovements[r - 1];
    }
  }

  return [
    nextLocation.col + 5,
    nextLocation.row + 5,
    currentPlayerPos[0],
    currentPlayerPos[1],
  ];
}

export function updateSearchPath(
  X: any,
  Y: any,
  searchPath: any,
  mazeGrid: any
) {
  let playerCell = getMazeCell(X, Y, mazeGrid);

  if (
    playerCell.row === searchPath[searchPath.length - 2][0] &&
    playerCell.col === searchPath[searchPath.length - 2][1]
  ) {
    searchPath.splice(searchPath.length - 2, 2);
  }
  searchPath.push([playerCell.row, playerCell.col]);

  // Removes duplicates if there are any
  if (
    searchPath[searchPath.length - 1].every(
      (val, index) => val === searchPath[searchPath.length - 2][index]
    )
  ) {
    searchPath.splice(searchPath.length - 1, 1);
  }
}
