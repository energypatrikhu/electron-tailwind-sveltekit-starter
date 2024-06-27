import { build } from 'esbuild';
import { existsSync } from 'fs';
import { readFile, readdir, rm, writeFile } from 'fs/promises';
import { join } from 'path';

const __source = './src/electron';
const __destination = './resources/app';
const isDev = process.env.NODE_ENV === 'dev';

async function removeOldEntries(absoluteDir) {
  for (const dirent of await readdir(absoluteDir, { withFileTypes: true })) {
    const direntDir = join(absoluteDir, dirent.name);

    if (dirent.isFile()) {
      await rm(direntDir, { force: true });
    } else if (dirent.isDirectory()) {
      await removeOldEntries(direntDir);
    }
  }
}

async function searchEntries(absoluteDir) {
  let entries = [];
  for (const dirent of await readdir(absoluteDir, { withFileTypes: true })) {
    const direntDir = join(absoluteDir, dirent.name);

    if (dirent.isFile()) {
      entries.push(direntDir);
    } else if (dirent.isDirectory()) {
      entries.push(...(await searchEntries(direntDir)));
    }
  }
  return entries;
}

async function editFiles(absoluteDir) {
  for (const dirent of await readdir(absoluteDir, { withFileTypes: true })) {
    const direntDir = join(absoluteDir, dirent.name);

    if (dirent.isFile()) {
      const fileContent = await readFile(direntDir, 'utf-8');
      await writeFile(direntDir, fileContent.replace(/\.js\"/gi, '.mjs"'));
    } else if (dirent.isDirectory()) {
      await editFiles(direntDir);
    }
  }
}

(async function () {
  if (existsSync(__destination)) {
    await removeOldEntries(__destination);
  }

  const entries = await searchEntries(__source);
  await build({
    entryPoints: entries,
    platform: 'node',
    outdir: __destination,
    logLevel: 'debug',
    minify: !isDev,
    drop: !isDev ? ['console', 'debugger'] : [],
    treeShaking: !isDev,
    mangleQuoted: !isDev,
    format: 'esm',
    outExtension: { '.js': '.mjs' },
  });

  await editFiles(__destination);
})();
