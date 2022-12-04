// https://adventofcode.com/2022/day/3

import { loadInput } from '../../scripts/load-input.ts';
const dayInput = await loadInput(3);

/* part one **********************************************************/

const alphabet = Array.from(Array(26))
  .map((_, i) => i + 97)
  .map(c => String.fromCharCode(c));

const priority = [...alphabet, ...alphabet.map(a => a.toUpperCase())];

const splitInHalf = (line: string) => [
  line.slice(0, line.length / 2),
  line.slice(line.length / 2),
];

const findCommonItem = (first: string, second: string) => {
  for (const item of first) {
    if (second.includes(item)) {
      return item;
    }
  }

  return '';
};

const getItemPriority = (item: string) => priority.indexOf(item) + 1;

const result = dayInput
  .split('\n')
  .filter(Boolean)
  .map(splitInHalf)
  .map(line => findCommonItem(line[0], line[1]))
  .map(getItemPriority)
  .reduce((sum, current) => sum + current);

console.log(result);

/* part two **********************************************************/

const groupBy3 = (result: string[][], current: string) => {
  if (result.length) {
    const last = result[result.length - 1];
    if (last.length < 3) {
      last.push(current);
    } else {
      result.push([current]);
    }
  } else {
    // first item
    return [[current]];
  }

  return result;
};

const findCommonItemInGroup = (group: string[]) => {
  const commonItems = [];
  for (const item of group[0]) {
    if (group[1].includes(item)) {
      commonItems.push(item);
    }
  }

  return findCommonItem(commonItems.join(''), group[2]);
};

const result2 = dayInput
  .split('\n')
  .filter(Boolean)
  .reduce(groupBy3, [] as string[][])
  .map(findCommonItemInGroup)
  .map(getItemPriority)
  .reduce((sum, current) => sum + current);

console.log(result2);
