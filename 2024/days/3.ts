// https://adventofcode.com/2024/day/3

import { loadInput } from "../../scripts/load-input.ts";
const dayInput = await loadInput(3) as string;

/* part one **********************************************************/

function getSum(input: string) {
    const regex = /mul\((\d+),(\d+)\)/gm;
    const matches = [...input.matchAll(regex)];

    const result = matches.map((match) => {
        const a = parseInt(match[1]);
        const b = parseInt(match[2]);

        return a * b;
    }).reduce((sum, item) => sum + item, 0);

    return result;
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
