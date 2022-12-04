import { config } from '../config.ts';

export const createDaySourceFile = async (day: string) => {
  const content = `// https://adventofcode.com/${config.year}/day/${day}

import { loadInput } from '../../scripts/load-input.ts';
const dayInput = await loadInput(${day});

/* part one **********************************************************/

const result = dayInput.split('\\n').filter(Boolean);
console.log(result);

/* part two **********************************************************/
`;

  await Deno.writeTextFile(`./${config.year}/days/${day}.ts`, content);
  console.log(`Day ${day} file created 🎅`);
};
