// https://adventofcode.com/2024/day/2

import { loadInput } from "../../scripts/load-input.ts";
const dayInput = await loadInput(2) as string;

/* part one **********************************************************/

const input = dayInput.split("\n")
    .filter(Boolean)
    .map((line) => line.split(" ").map((x) => parseInt(x)));

function isSafe(list: number[]) {
    for (let i = 0; i < list.length - 1; i++) {
        const diff = Math.abs(list[i] - list[i + 1]);
        if (diff < 1 || diff > 3) {
            return false;
        }
    }

    return true;
}

const isDesc = (row: number[]) =>
    row.every((value, index) => index === 0 || row[index - 1] >= value);

const isAsc = (row: number[]) =>
    row.every((value, index) => index === 0 || row[index - 1] <= value);

const isOk = (row: number[]) => (isDesc(row) || isAsc(row)) && isSafe(row);

function safeCount(list: number[][]) {
    let count = 0;
    for (let row of list) {
        if (isOk(row)) {
            count++;
        }
    }

    return count;
}

console.log(safeCount(input));

/* part two **********************************************************/

function safeCountWithoutOne(list: number[][]) {
    let count = 0;

    for (let row of list) {
        if (isOk(row)) {
            count++;
        } else {
            for (let i = 0; i < row.length; i++) {
                const arr = row.toSpliced(i, 1);
                if (isOk(arr)) {
                    count++;
                    break;
                }
            }
        }
    }

    return count;
}

console.log(safeCountWithoutOne(input));
