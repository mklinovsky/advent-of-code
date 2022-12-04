// https://adventofcode.com/2022/day/4

import { loadInput } from '../../scripts/load-input.ts';
const dayInput = await loadInput(4);

/* part one **********************************************************/

const isOverlaped = (item: number[][]) => {
  const first = item[0];
  const second = item[1];

  if (first[0] <= second[0] && first[1] >= second[1]) {
    return true;
  }

  if (first[0] >= second[0] && first[1] <= second[1]) {
    return true;
  }

  return false;
};

const result = dayInput
  .split('\n')
  .filter(Boolean)
  .map(line =>
    line.split(',').map(item => item.split('-').map(item => parseInt(item, 10)))
  )
  .map(item => isOverlaped(item))
  .reduce((sum, current) => (current ? sum + 1 : sum), 0);

console.log(result);

/* part two **********************************************************/

const isPartiallyOverlapped = (item: number[][]) => {
  const first = item[0];
  const second = item[1];

  if (first[1] < second[0]) {
    return false;
  }

  if (first[0] > second[1]) {
    return false;
  }

  return true;
};

const result2 = dayInput
  .split('\n')
  .filter(Boolean)
  .map(line =>
    line.split(',').map(item => item.split('-').map(item => parseInt(item, 10)))
  )
  .map(item => isPartiallyOverlapped(item))
  .reduce((sum, current) => (current ? sum + 1 : sum), 0);

console.log(result2);
