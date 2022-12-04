// https://adventofcode.com/2022/day/2

import { loadInput } from '../../scripts/load-input.ts';
const dayInput = await loadInput(2);

/* part one **********************************************************/

type Shape = 'A' | 'B' | 'C';
type MappedShape = 'X' | 'Y' | 'Z';

const turnMap = {
  X: 'A',
  Y: 'B',
  Z: 'C',
};

const pointsMap = {
  A: 1,
  B: 2,
  C: 3,
};

const wins = ['AB', 'BC', 'CA'];

const result = dayInput
  .split('\n')
  .filter(Boolean)
  .map(x => x.split(' '))
  .map(round => [round[0], turnMap[round[1] as MappedShape]])
  .map(round => {
    // loss
    let turnPoints = 0;

    // win
    if (wins.includes(round.join(''))) {
      turnPoints = 6;
    }

    //draw
    if (round[0] === round[1]) {
      turnPoints = 3;
    }

    const shapePoints = pointsMap[round[1] as Shape];
    return shapePoints + turnPoints;
  })
  .reduce((sum, current) => sum + current, 0);

console.log(result);

/* part two **********************************************************/

const winMap = {
  A: 'B',
  B: 'C',
  C: 'A',
};

const lossMap = {
  B: 'A',
  C: 'B',
  A: 'C',
};

const result2 = dayInput
  .split('\n')
  .filter(Boolean)
  .map(x => x.split(' '))
  .map(round => {
    // win
    if (round[1] === 'Z') {
      const myShape = winMap[round[0] as Shape];
      return 6 + pointsMap[myShape as Shape];
    }

    // draw
    if (round[1] === 'Y') {
      return 3 + pointsMap[round[0] as Shape];
    }

    // loss
    const myShape = lossMap[round[0] as Shape];
    return pointsMap[myShape as Shape];
  })
  .reduce((sum, current) => sum + current, 0);

console.log(result2);
