export const generateCells = (
  mazeGrid: any,
  wallWidth: any,
  gridDimension: any
) => {
  mazeGrid.length = 0;
  for (let rowNum = 0; rowNum < gridDimension; rowNum++) {
    for (let colNum = 0; colNum < gridDimension; colNum++) {
      mazeGrid.push({
        row: rowNum * gridDimension,
        col: colNum * gridDimension,
        top: wallWidth,
        right: wallWidth,
        bottom: wallWidth,
        left: wallWidth,
        visited: false,
        color: null,
      });
    }
  }

  return mazeGrid;
};

const checkNeighbours = (cell: any, mazeGrid: any) => {
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

export const makeMaze = (mazeGrid: any, stack: any) => {
  let current = mazeGrid[0];
  current.visited = true;

  for (let i = 0; i < 300; i++) {
    if (mazeGrid.every((cell: any) => cell.visited === true) === false) {
      // Get the next cell to visit
      let next = checkNeighbours(current, mazeGrid);
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

export function trimMaze(mazeGrid: any) {
  mazeGrid.map(function (cell: any, index: any) {
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

export function makeSearchGrid(mazeGrid: any, searchGrid: any) {
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
