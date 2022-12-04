import { config } from '../config.ts';

const day = Deno.args[0];
const cmd = ['deno', 'run', '--allow-read', `./${config.year}/days/${day}.ts`];

const process = Deno.run({ cmd });
await process.status();
