/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />
/// <reference types="vite/client" />
/// <reference types="@types/dom-speech-recognition" />
declare interface Window {
	electron: {
		send: (channel: string, data: { event: string; data: any }) => void;
		sendSync: (channel: string, data: { event: string; data: any }) => void;
		receive: (channel: string, func: (data: { event: string; data: any }) => void) => void;
	};
}
