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
