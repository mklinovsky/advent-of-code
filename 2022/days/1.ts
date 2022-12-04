// https://adventofcode.com/2022/day/1

import { loadInput } from '../../scripts/load-input.ts';
const dayInput = await loadInput(1);

/* part one **********************************************************/

const result = dayInput
  .split('\n\n')
  .map(group =>
    group.split('\n').reduce((sum, current) => sum + parseInt(current, 10), 0)
  )
  .sort((a, b) => b - a);

console.log(result[0]);

/* part two **********************************************************/

console.log(result[0] + result[1] + result[2]);
