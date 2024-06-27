import { writable } from 'svelte/store';

import type { Writable } from 'svelte/store';
import type { App } from '$types/App';

const app = <Writable<App>>writable({});
export default app;
