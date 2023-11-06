export const svgs: { [key: string]: any } = {};

// Put the file names of the svgs here, with 'key' being the folder and 'value' being a string array
// Example: symbols: ['menu', 'home']
// Where 'symbols' is the folder and ['menu', 'home'] are the svg file names
// no '.svg' needed

// The default 'symbols' is imported from '@material-symbols/svg-400/rounded'
// to find more svgs, you can visit: https://fonts.google.com/icons
// after you find the svg you need, copy the name of it and add it to 'symbols'
// in dev mode or at build time the svg(s) will automatically load

export const availableSvgs = {
	symbols: ['menu', 'home'],
} as const;

export async function preloadSvgs() {
	for (const [sType, sNames] of Object.entries(availableSvgs)) {
		for (const sName of sNames) {
			svgs[`${sType}/${sName}`] = await import(`../../svg/${sType}/${sName}.svg`);
		}
	}
}
