import { build } from 'esbuild';
import { readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const __source = './src/electron';
const __destination = './resources/app';
const isDev = process.env.NODE_ENV === 'dev';

(async function removeOldEntries(absoluteDir) {
	for (const dirent of await readdir(absoluteDir, { withFileTypes: true })) {
		const direntDir = join(absoluteDir, dirent.name);

		if (dirent.isFile()) await rm(direntDir, { force: true });
		else if (dirent.isDirectory()) await removeOldEntries(direntDir);
	}
})(__destination);

let entries = [];
await (async function searchEntries(absoluteDir) {
	for (const dirent of await readdir(absoluteDir, { withFileTypes: true })) {
		const direntDir = join(absoluteDir, dirent.name);

		if (dirent.isFile()) await entries.push(direntDir);
		else if (dirent.isDirectory()) await searchEntries(direntDir);
	}
})(__source);

await build({
	entryPoints: entries,
	platform: 'node',
	outdir: __destination,
	logLevel: 'debug',
	minify: !isDev,
	format: 'cjs',
	outExtension: { '.js': '.cjs' },
});

(async function editFiles(absoluteDir) {
	for (const dirent of await readdir(absoluteDir, { withFileTypes: true })) {
		const direntDir = join(absoluteDir, dirent.name);

		if (dirent.isFile()) await writeFile(direntDir, (await readFile(direntDir, 'utf-8')).replace(/\.js\"/gi, '.cjs"'));
		else if (dirent.isDirectory()) await editFiles(direntDir);
	}
})(__destination);
