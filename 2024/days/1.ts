// https://adventofcode.com/2024/day/1

import { loadInput } from '../../scripts/load-input.ts';
const dayInput = await loadInput(1) as string;

/* part one **********************************************************/

const input = dayInput.split('\n')
    .filter(Boolean)
    .map(line => line.split('   '))
    .map(line => ([parseInt(line[0]), parseInt(line[1])]));


let list1 = input.map(line => line[0]).sort();
let list2 = input.map(line => line[1]).sort();

let result = 0;

for (let i = 0; i < input.length; i++) {
    result += Math.abs(list1[i] - list2[i])
}

console.log(result);

/* part two **********************************************************/

let result2 = 0;

for (let item1 of list1) {
    let count = 0;
    for (let item2 of list2) {
        if (item1 === item2) {
            count++;
        }
    }
    result2 += item1 * count;
}

console.log(result2);
