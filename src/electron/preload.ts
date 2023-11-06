import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
	send: function (channel: string, data: any) {
		ipcRenderer.send(channel, data);
	},
	sendSync: function (channel: string, data: any) {
		ipcRenderer.sendSync(channel, data);
	},
	receive: function (channel: string, _function: (arg0: any) => void) {
		ipcRenderer.on(channel, (_event, data) => _function(data));
	},
});
