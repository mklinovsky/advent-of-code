// https://adventofcode.com/2022/day/8

import { loadInput } from '../../scripts/load-input.ts';
const dayInput = await loadInput(8);

/* part one **********************************************************/

const forest = dayInput
  .split('\n')
  .filter(Boolean)
  .map(line => line.split('').map(Number));

const getNeighbours = (
  forest: number[][],
  treePosition: { x: number; y: number }
) => {
  const top = forest
    .filter((_, index) => index < treePosition.y)
    .map(row => row[treePosition.x]);

  const bottom = forest
    .filter((_, index) => index > treePosition.y)
    .map(row => row[treePosition.x]);

  const right = forest[treePosition.y].filter(
    (_, index) => index > treePosition.x
  );
  const left = forest[treePosition.y].filter(
    (_, index) => index < treePosition.x
  );

  return { top, bottom, right, left };
};

const checkNeighbours = (
  forest: number[][],
  position: { x: number; y: number }
) => {
  const { top, bottom, right, left } = getNeighbours(forest, position);
  const tree = forest[position.y][position.x];

  const isVisible =
    top.every(t => t < tree) ||
    bottom.every(t => t < tree) ||
    right.every(t => t < tree) ||
    left.every(t => t < tree);

  return isVisible;
};

const searchForest = (forest: number[][]) => {
  const outsideTreesCount = forest.length * 4 - 4;
  let count = 0;

  for (let i = 1; i < forest.length - 1; i++) {
    for (let j = 1; j < forest[i].length - 1; j++) {
      const isVisible = checkNeighbours(forest, { x: j, y: i });

      if (isVisible) {
        count++;
      }
    }
  }

  return count + outsideTreesCount;
};

console.log(searchForest(forest));

/* part two **********************************************************/

const getViewDistance = (tree: number, direction: number[]) => {
  let distance = 0;
  for (const i of direction) {
    distance++;

    if (i >= tree) {
      break;
    }
  }

  return distance;
};

const calculateScenicScore = (
  forest: number[][],
  treePosition: { x: number; y: number }
) => {
  const tree = forest[treePosition.y][treePosition.x];
  const { top, bottom, right, left } = getNeighbours(forest, treePosition);

  const topDistance = getViewDistance(tree, top.reverse());
  const bottomDistance = getViewDistance(tree, bottom);
  const rightDistance = getViewDistance(tree, right);
  const leftDistance = getViewDistance(tree, left.reverse());

  return topDistance * bottomDistance * rightDistance * leftDistance;
};

const findBestScenicScore = (forest: number[][]) => {
  let bestScore = 0;

  for (let i = 1; i < forest.length - 1; i++) {
    for (let j = 1; j < forest[i].length - 1; j++) {
      const score = calculateScenicScore(forest, { x: j, y: i });
      if (score > bestScore) {
        bestScore = score;
      }
    }
  }

  return bestScore;
};

console.log(findBestScenicScore(forest));
