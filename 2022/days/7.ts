// https://adventofcode.com/2022/day/7

import { loadInput } from '../../scripts/load-input.ts';
const dayInput = await loadInput(7);

/* part one **********************************************************/

const terminalOutput = dayInput.split('\n').filter(Boolean);

type Base = { name: string; parent?: Dir };
type File = Base & { type: 'file'; size: number; name: string };
type Dir = Base & { type: 'dir'; children?: (File | Dir)[]; name: string };

const sizes: { dir: string; size: number }[] = [];
const sumFileSizes = (root: Dir) => {
  let sum = 0;

  if (root.children) {
    for (const child of root.children) {
      if (child.type === 'file') {
        sum += child.size;
      } else {
        sum += sumFileSizes(child);
      }
    }
  } else {
    return 0;
  }

  sizes.push({ dir: root.name, size: sum });
  return sum;
};

const createTree = (terminalOutput: string[]) => {
  let currentDir: Dir | undefined = { name: '/', children: [], type: 'dir' };
  let root = currentDir;

  for (const line of terminalOutput) {
    if (line.startsWith('$ cd')) {
      const dirName = line.match(/\$ cd (.+)/)?.[1] ?? '';

      if (dirName === '..') {
        currentDir = currentDir?.parent;
        continue;
      }

      if (dirName === '/') {
        root = currentDir;
        continue;
      }

      currentDir = currentDir?.children?.find(c => c.name === dirName);
      continue;
    }

    if (line.startsWith('$ ls')) {
      continue;
    }

    if (line.startsWith('dir')) {
      currentDir?.children?.push({
        type: 'dir',
        name: line.replace('dir ', ''),
        children: [],
        parent: currentDir,
      });
      continue;
    }

    const [fileSize, fileName] = line.split(' ');
    currentDir?.children?.push({
      type: 'file',
      name: fileName,
      size: Number(fileSize),
    });
  }

  return root;
};

const root = createTree(terminalOutput);

sumFileSizes(root);

console.log(
  sizes
    .filter(s => s.size <= 100000)
    .reduce((sum, current) => sum + current.size, 0)
);

/* part two **********************************************************/

const usedSize = sizes.find(s => s.dir === '/')?.size;
const totalSize = 70000000;
const neededSize = 30000000;
const unusedSpace = totalSize - usedSize;
const targetSize = neededSize - unusedSpace;

const result = sizes
  .filter(s => s.size >= targetSize)
  .sort((a, b) => a.size - b.size);

console.log(result[0].size);
