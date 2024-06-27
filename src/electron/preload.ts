import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  send: function (channel: string, data: any) {
    ipcRenderer.send(channel, data);
  },
  sendSync: function (channel: string, data: any) {
    ipcRenderer.sendSync(channel, data);
  },
  receive: function (channel: string, fn: (data: any) => void) {
    ipcRenderer.on(channel, (_, data) => fn(data));
  },
});
