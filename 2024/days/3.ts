// https://adventofcode.com/2024/day/3

import { loadInput } from "../../scripts/load-input.ts";
const dayInput = await loadInput(3) as string;

/* part one **********************************************************/

function getSum(input: string) {
    const regex = /mul\((\d+),(\d+)\)/gm;
    const matches = [...input.matchAll(regex)];

    return matches
        .map((match) => parseInt(match[1]) * parseInt(match[2]))
        .reduce((sum, item) => sum + item, 0);
}

console.log(getSum(dayInput));

/* part two **********************************************************/

const dos = dayInput.split("do()");
const parts = dos.map((part) => part.split("don't()"));

let sum = 0;

for (let part of parts) {
    sum += getSum(part[0]);
}

console.log(sum);
