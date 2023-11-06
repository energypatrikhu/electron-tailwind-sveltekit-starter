import { app, BrowserWindow } from 'electron';
import { readFile } from 'fs/promises';

import { Updater } from './updater.js';

function triggerReady(mainWindow: BrowserWindow, data: any) {
	mainWindow.webContents.send('electron', { event: 'ready', data });
}

export async function mainLoader(mainWindow: BrowserWindow, isDev: boolean) {
	const versions = {
		electronVersion: isDev ? app.getVersion() : process.versions.electron,
		appVersion: isDev ? JSON.parse(await readFile('./package.json', 'utf-8')).version : app.getVersion(),
	};

	if (isDev) {
		triggerReady(mainWindow, { versions });
		return;
	}

	if (await new Updater(versions.appVersion).check()) {
		return;
	}

	triggerReady(mainWindow, { versions });
}
