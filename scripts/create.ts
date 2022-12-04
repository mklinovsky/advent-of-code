import { saveInput } from './save-input.ts';
import { createDaySourceFile } from './create-day-source-file.ts';

const day = Deno.args[0];

await saveInput(day);
await createDaySourceFile(day);
