import { dialog } from 'electron';
import { mainLoader } from './main-loader.js';

export class EventRouter {
  constructor(ipcMain: Electron.IpcMain, mainWindow: Electron.BrowserWindow, isDev: boolean) {
    ipcMain.on('electron', async (_, data) => {
      switch (data.event) {
        case 'ready': {
          await mainLoader(mainWindow, isDev);
          break;
        }

        case 'showOpenDialogSync': {
          mainWindow.webContents.send('electron', {
            event: 'showOpenDialogSync',
            data: dialog.showOpenDialogSync(mainWindow, data.data),
          });
          break;
        }
      }
    });
  }
}
