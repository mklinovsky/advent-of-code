// https://adventofcode.com/2024/day/6

import { loadInput } from '../../scripts/load-input.ts';
const dayInput = (await loadInput(6)) as string;

/* part one **********************************************************/

const input = dayInput
  .split('\n')
  .filter(Boolean)
  .map(line => line.split(''));

function findGuard(lab: string[][]) {
  for (let row = 0; row < lab.length; row++) {
    for (let col = 0; col < lab[0].length; col++) {
      if (lab[row][col] === '^') {
        return [row, col];
      }
    }
  }
}

function findPath(lab: string[][]) {
  let currentPosition = findGuard(lab);
  let currentDirection = [-1, 0];
  const path = new Set<string>();

  while (
    0 <= currentPosition[0] &&
    currentPosition[0] < lab.length &&
    0 <= currentPosition[1] &&
    currentPosition[1] < lab[0].length
  ) {
    path.add(currentPosition.join(','));

    const nextPosition = [currentPosition[0] + currentDirection[0], currentPosition[1] + currentDirection[1]];
    if (lab[nextPosition[0]][nextPosition[1]] !== '#') {
      currentPosition = nextPosition;
    } else {
      // turn right
      if (currentDirection[0] === -1 && currentDirection[1] === 0) {
        currentDirection = [0, 1];
      } else if (currentDirection[0] === 0 && currentDirection[1] === 1) {
        currentDirection = [1, 0];
      } else if (currentDirection[0] === 1 && currentDirection[1] === 0) {
        currentDirection = [0, -1];
      } else if (currentDirection[0] === 0 && currentDirection[1] === -1) {
        currentDirection = [-1, 0];
      }
    }
  }

  return path;
}

console.log(findPath(input).size);

/* part two **********************************************************/
