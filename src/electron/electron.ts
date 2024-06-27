import { app, BrowserWindow, ipcMain } from 'electron';
import electronContextMenu from 'electron-context-menu';
import electronServe from 'electron-serve';
import electronWindowState from 'electron-window-state';
import { join } from 'path';
import electronUpdater from 'electron-updater';
import { EventRouter } from './libs/event-router.js';

const { autoUpdater } = electronUpdater;
const serveURL = electronServe({
  directory: '.',
});

const port = process.env.PORT || 5173;
const isDev = !app.isPackaged || process.env.NODE_ENV === 'dev';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  const windowState = electronWindowState({
    defaultWidth: 800,
    defaultHeight: 600,
  });

  mainWindow = new BrowserWindow({
    backgroundColor: 'black',
    titleBarStyle: 'default',
    autoHideMenuBar: false,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      spellcheck: true,
      devTools: isDev,
      preload: join(import.meta.dirname, 'preload.mjs'),
      disableBlinkFeatures: 'Auxclick',
      webSecurity: false,
    },
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
  });

  if (!isDev) {
    mainWindow.removeMenu();
  }

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  windowState.manage(mainWindow);
  mainWindow.on('close', () => {
    windowState.saveState(mainWindow!);
  });

  return mainWindow;
}

electronContextMenu({
  showLookUpSelection: false,
  showSearchWithGoogle: false,
  showCopyImage: false,
  showCopyLink: true,
  showSelectAll: true,
  showInspectElement: false,
});

function loadVite(port: any) {
  mainWindow!.loadURL(`http://localhost:${port}`).catch((e) => {
    console.log('Error loading URL, retrying', e);
    setTimeout(() => {
      loadVite(port);
    }, 200);
  });
}

async function createMainWindow() {
  mainWindow = createWindow();
  mainWindow.once('close', () => {
    mainWindow = null;
  });

  if (isDev) loadVite(port);
  else await serveURL(mainWindow);

  new EventRouter(ipcMain, mainWindow, isDev);
}

app.once('ready', createMainWindow);
app.on('activate', () => {
  if (!mainWindow) {
    createMainWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

autoUpdater.on('checking-for-update', () => {
  console.log('Checking for update...');
});
autoUpdater.on('update-available', () => {
  console.log('Update available.');
});
autoUpdater.on('update-not-available', () => {
  console.log('Update not available.');
});
autoUpdater.on('error', (err) => {
  console.log('Error in auto-updater. ' + err);
});
autoUpdater.on('download-progress', (progressObj) => {
  let log_message = 'Download speed: ' + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + '/' + progressObj.total + ')';
  console.log(log_message);
});
autoUpdater.on('update-downloaded', () => {
  console.log('Update downloaded');
});
