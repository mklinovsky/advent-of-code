// https://adventofcode.com/2024/day/5

import { loadInput } from '../../scripts/load-input.ts';
const dayInput = (await loadInput(5)) as string;

/* part one **********************************************************/

const input = dayInput.split('\n\n').filter(Boolean);
const orderingRules = input[0].split('\n').map(rule => rule.split('|').map(x => Number(x)));
const updates = input[1].split('\n').map(update => update.split(',').map(x => Number(x)));

let sum = 0;
updates.forEach(update => {
  let isOk = true;

  outerLoop: for (let i = 0; i < update.length; i++) {
    for (let j = i + 1; j < update.length; j++) {
      const a = update[i];
      const b = update[j];

      for (let k = 0; k < orderingRules.length; k++) {
        const rule = orderingRules[k];
        if (rule[0] === b && rule[1] === a) {
          isOk = false;
          break outerLoop;
        }
      }
    }
  }

  if (isOk) {
    sum += update[Math.floor(update.length / 2)];
  }
});

console.log(sum);

/* part two **********************************************************/

let wrongUpdates = new Set<number[]>();

updates.forEach(update => {
  for (let i = 0; i < update.length; i++) {
    for (let j = i + 1; j < update.length; j++) {
      const a = update[i];
      const b = update[j];

      for (let k = 0; k < orderingRules.length; k++) {
        const rule = orderingRules[k];
        if (rule[0] === b && rule[1] === a) {
          wrongUpdates.add(update);

          update[i] = b;
          update[j] = a;
        }
      }
    }
  }
});

const result = [...wrongUpdates].reduce((sum, item) => {
  sum += item[Math.floor(item.length / 2)];
  return sum;
}, 0);

console.log(result);
