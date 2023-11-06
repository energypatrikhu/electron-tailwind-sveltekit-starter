// @ts-ignore
import moment from 'moment/min/moment-with-locales.min';

const userLang = globalThis.navigator && globalThis.navigator.language;
moment.locale((userLang ?? 'en').split('-')[0]);

export function formatDate(date: number) {
	return moment(Number(date)).format('LLLL');
}

export { moment };
