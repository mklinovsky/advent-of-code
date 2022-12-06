// https://adventofcode.com/2022/day/6

import { loadInput } from '../../scripts/load-input.ts';
const dayInput = await loadInput(6);

/* part one **********************************************************/

const areUnique = (letters: string[]) =>
  letters.length === new Set(letters).size;

const getResult = (letters: string[], uniqueCount: number) => {
  let result = 0;
  const buffer: string[] = [];

  for (let i = 0; i < letters.length; i++) {
    buffer.push(letters[i]);

    if (i < uniqueCount - 1) {
      continue;
    }

    if (areUnique(buffer)) {
      result = i + 1;
      break;
    }

    buffer.shift();
  }

  return result;
};

console.log(getResult(dayInput.split(''), 4));

/* part two **********************************************************/

console.log(getResult(dayInput.split(''), 14));
