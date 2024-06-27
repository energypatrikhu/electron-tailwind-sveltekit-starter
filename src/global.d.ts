/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="@types/dom-speech-recognition" />

//
// Electron
//
declare namespace Electron {
  interface IpcMain {
    on: AppElectronReceiveEvent;
    once: AppElectronReceiveEvent;
  }
  interface WebContents {
    send: AppElectronSendEvent;
  }
}

type AppElectronSendEvent = (
  channel: 'electron',
  data: ElectronEventData['electron'][keyof ElectronEventData['electron']]['receive'],
) => void;

type AppElectronReceiveEvent = (
  channel: 'electron',
  fn: (_: never, data: ElectronEventData['electron'][keyof ElectronEventData['electron']]['send']) => void,
) => void;

//
// Window
//
declare interface Window {
  electron: {
    send: WindowElectronSendEvent;
    sendSync: WindowElectronSendEvent;
    receive: WindowElectronReceiveEvent;
  };
}

type WindowElectronSendEvent = (
  channel: 'electron',
  data: ElectronEventData['electron'][keyof ElectronEventData['electron']]['send'],
) => void;

type WindowElectronReceiveEvent = (
  channel: 'electron',
  fn: (data: ElectronEventData['electron'][keyof ElectronEventData['electron']]['receive']) => void,
) => void;

//
// Events
//
// Send -> From Renderer (WebContent) to Main (Electron)
// Receive -> From Main (Electron) to Renderer (WebContent)
//
interface ElectronEventData {
  electron: {
    ready: {
      send: {
        event: 'ready';
      };
      receive: {
        event: 'ready';
        data: {
          versions: {
            electronVersion: string;
            appVersion: string;
          };
        };
      };
    };

    showOpenDialogSync: {
      send: {
        event: 'showOpenDialogSync';
        data: Electron.OpenDialogSyncOptions;
      };
      receive: {
        event: 'showOpenDialogSync';
        data: string[] | undefined;
      };
    };
  };
}
