import { writable } from 'svelte/store';

import type { Writable } from 'svelte/store';
import type { App } from '$types/App';

export const app = <Writable<App>>writable({});
