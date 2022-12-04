import { config } from '../config.ts';

export const loadInput = async (day: number) =>
  await Deno.readTextFile(`./${config.year}/inputs/${day}.txt`);
