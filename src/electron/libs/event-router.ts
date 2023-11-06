import { mainLoader } from './main-loader.js';

export class EventRouter {
	private ipcMain;
	private mainWindow;
	private isDev;

	constructor(ipcMain: Electron.IpcMain, mainWindow: Electron.BrowserWindow, isDev: boolean) {
		this.ipcMain = ipcMain;
		this.mainWindow = mainWindow;
		this.isDev = isDev;

		this.router();
	}

	router() {
		this.ipcMain.on('electron', async (_event, { event, data }) => {
			switch (event) {
				case 'ready': {
					await mainLoader(this.mainWindow, this.isDev);
					break;
				}
			}
		});
	}
}
