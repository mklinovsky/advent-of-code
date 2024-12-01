// https://adventofcode.com/2022/day/9

import { loadInput } from '../../scripts/load-input.ts';
const dayInput = await loadInput(9);

/* part one **********************************************************/

const moves = dayInput
  .split('\n')
  .filter(Boolean)
  .map(line => line.split(' '))
  .map(move => [move[0], Number(move[1])]);

type Direction = 'U' | 'D' | 'R' | 'L';

const visitedPositions: number[][] = [[0, 0]];
let headPosition = [0, 0];
let lastHeadPosition = [0, 0];
let tailPosition = [0, 0];

const moveHead = (direction: Direction, count: number) => {
  for (let i = 0; i < count; i++) {
    lastHeadPosition = headPosition;
    switch (direction) {
      case 'U':
        headPosition = [headPosition[0], headPosition[1] + 1];
        break;
      case 'D':
        headPosition = [headPosition[0], headPosition[1] - 1];
        break;
      case 'R':
        headPosition = [headPosition[0] + 1, headPosition[1]];
        break;
      case 'L':
        headPosition = [headPosition[0] - 1, headPosition[1]];
        break;
    }
    followHead();
  }
};

const isTouching = (head: number[], tail: number[]) => {
  const neighbours = [
    [0, 0],
    [0, 1],
    [0, -1],
    [1, 0],
    [1, 1],
    [1, -1],
    [-1, 0],
    [-1, 1],
    [-1, -1],
  ];

  for (const neighbour of neighbours) {
    if (
      head[0] + neighbour[0] === tail[0] &&
      head[1] + neighbour[1] === tail[1]
    ) {
      return true;
    }
  }
};

const followHead = () => {
  if (!isTouching(headPosition, tailPosition)) {
    tailPosition = lastHeadPosition;
    if (
      !visitedPositions.some(
        p => p[0] === tailPosition[0] && p[1] === tailPosition[1]
      )
    ) {
      visitedPositions.push(tailPosition);
    }
  }
};

const move = () => {
  moves.forEach(move => {
    moveHead(move[0] as Direction, move[1] as number);
  });
};

move();
console.log(visitedPositions.length);

/* part two **********************************************************/
