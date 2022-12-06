// https://adventofcode.com/2022/day/5

import { loadInput } from '../../scripts/load-input.ts';
const dayInput = await loadInput(5);

/* part one **********************************************************/

const getCratesFromLine = (line: string) => {
  const result = [];
  const crates = Array.from(line);

  while (crates.length) {
    result.push(crates.splice(0, 3).join(''));
    crates.splice(0, 1);
  }

  return result;
};

const [stacksInput, movesInput] = dayInput.split('\n\n');
const stacks = stacksInput.split('\n').slice(0, -1).map(getCratesFromLine);
const stacksArrays: string[][] = [];

// transpose
for (let i = 0; i < stacks.length; i++) {
  for (let j = 0; j < stacks[i].length; j++) {
    if (stacks[i][j] === undefined) continue;
    if (stacksArrays[j] === undefined) stacksArrays[j] = [];
    stacksArrays[j][i] = stacks[i][j];
  }
}

const moves = movesInput.split('\n').map(move => {
  const match = move.match(/move (\d+) from (\d+) to (\d+)/);
  return {
    count: Number(match?.[1]),
    from: Number(match?.[2]) - 1,
    to: Number(match?.[3]) - 1,
  };
});

const stackedCrates = stacksArrays.map(a => a.filter(i => i !== '   '));

const result1 = JSON.parse(JSON.stringify(stackedCrates));
moves.forEach(move => {
  for (let i = 0; i < move.count; i++) {
    result1[move.to].unshift(...result1[move.from].splice(0, 1));
  }
});

const printResult = (stackedCrates: string[][]) => {
  console.log(
    stackedCrates
      .map(i => i[0])
      .join('')
      .replaceAll('[', '')
      .replaceAll(']', '')
  );
};

printResult(result1);

/* part two **********************************************************/

const result2 = stackedCrates;

moves.forEach(move => {
  result2[move.to].unshift(...result2[move.from].splice(0, move.count));
});

printResult(result2);
