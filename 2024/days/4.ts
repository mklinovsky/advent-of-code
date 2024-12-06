// https://adventofcode.com/2024/day/4

import { loadInput } from '../../scripts/load-input.ts';
const dayInput = (await loadInput(4)) as string;

/* part one **********************************************************/

const input = dayInput
    .split('\n')
    .filter(Boolean)
    .map(line => line.split(''));

let count = 0;

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        const currentItem = input[i][j];

        if (currentItem === 'X') {
            // right
            if (input[i][j + 1] === 'M' && input[i][j + 2] === 'A' && input[i][j + 3] === 'S') {
                count++;
            }

            // left
            if (input[i][j - 1] === 'M' && input[i][j - 2] === 'A' && input[i][j - 3] === 'S') {
                count++;
            }

            // down
            if (i < input.length - 3 && input[i + 1][j] === 'M' && input[i + 2][j] === 'A' && input[i + 3][j] === 'S') {
                count++;
            }

            // up
            if (i > 2 && input[i - 1][j] === 'M' && input[i - 2][j] === 'A' && input[i - 3][j] === 'S') {
                count++;
            }

            // up right
            if (i > 2 && input[i - 1][j + 1] === 'M' && input[i - 2][j + 2] === 'A' && input[i - 3][j + 3] === 'S') {
                count++;
            }

            // up left
            if (i > 2 && input[i - 1][j - 1] === 'M' && input[i - 2][j - 2] === 'A' && input[i - 3][j - 3] === 'S') {
                count++;
            }

            // down left
            if (
                i < input.length - 3 &&
                input[i + 1][j - 1] === 'M' &&
                input[i + 2][j - 2] === 'A' &&
                input[i + 3][j - 3] === 'S'
            ) {
                count++;
            }

            // down right
            if (
                i < input.length - 3 &&
                input[i + 1][j + 1] === 'M' &&
                input[i + 2][j + 2] === 'A' &&
                input[i + 3][j + 3] === 'S'
            ) {
                count++;
            }
        }
    }
}

console.log(count);

/* part two **********************************************************/

let count2 = 0;

for (let i = 1; i < input.length - 1; i++) {
    for (let j = 1; j < input[i].length - 1; j++) {
        if (input[i][j] === 'A') {
            if (
                ((input[i - 1][j - 1] === 'M' && input[i + 1][j + 1] === 'S') ||
                    (input[i + 1][j + 1] === 'M' && input[i - 1][j - 1] === 'S')) &&
                ((input[i - 1][j + 1] === 'M' && input[i + 1][j - 1] === 'S') ||
                    (input[i + 1][j - 1] === 'M' && input[i - 1][j + 1] === 'S'))
            ) {
                count2++;
            }
        }
    }
}

console.log(count2);
