import { config } from '../config.ts';

export const saveInput = async (day: string) => {
  const url = `https://adventofcode.com/${config.year}/day/${day}/input`;
  const options = {
    headers: {
      'Content-Type': 'text/plain',
      cookie: `session=${config.session}`,
    },
  };
  const response = await fetch(url, options);
  const input = await response.text();
  const fileName = `${day}.txt`;

  await Deno.writeTextFile(`./${config.year}/inputs/${fileName}`, input);

  console.log(`Input ${fileName} saved 🎄`);
};
