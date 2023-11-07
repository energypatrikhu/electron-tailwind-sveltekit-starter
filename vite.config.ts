import { existsSync } from 'node:fs';
import { copyFile, readdir, rm } from 'node:fs/promises';
import { basename, extname, resolve } from 'node:path';
import { UserConfig } from 'vite';

import svg from '@poppanator/sveltekit-svg';
import { sveltekit } from '@sveltejs/kit/vite';

import { availableSvgs } from './src/libs/functions/__svg.js';

import type { SvgSrcFolderIcons } from './src/types/Svgs.js';

function copyUsedMaterialSymbols() {
	return new Promise<void>(async (resolve) => {
		let nodeModulesSvgs = '/node_modules/@material-symbols/svg-400/rounded/';
		let srcSvgs = './src/svg/symbols/';

		let { symbols } = availableSvgs;
		for (let symbol of symbols) {
			if (!existsSync(`${nodeModulesSvgs}${symbol}.svg`)) {
				throw new Error('SVG does not exists!');
			}

			if (!existsSync(`${srcSvgs}${symbol}.svg`) && existsSync(`${nodeModulesSvgs}${symbol}.svg`)) {
				console.log('copying:', symbol + '.svg');

				await copyFile(`${nodeModulesSvgs}${symbol}.svg`, `${srcSvgs}${symbol}.svg`);
			}
		}

		let srcContents = await readdir(srcSvgs);
		for (let srcContent of srcContents) {
			let iconName = basename(srcContent, extname(srcContent)) as SvgSrcFolderIcons;
			if (!symbols.includes(iconName)) {
				console.log('removing:', srcContent);

				await rm(srcSvgs + srcContent);
			}
		}

		resolve();
	});
}

const _svg: any = svg({
	svgoOptions: {
		plugins: [
			{
				name: 'preset-default',
				params: {
					overrides: {
						removeViewBox: false,
					},
				},
			},
			'removeDimensions',
		],
	},
});

const config: UserConfig = {
	plugins: [await copyUsedMaterialSymbols(), _svg, sveltekit()],
	build: {
		minify: 'terser',
		terserOptions: {
			compress: {
				ecma: 2020,
			},
			safari10: true,
			ecma: 2020,
			format: {
				ecma: 2020,
			},
		},
		chunkSizeWarningLimit: 100000,
	},
	resolve: {
		alias: {
			$components: resolve('./src/components'),
			$stores: resolve('./src/stores'),
			$types: resolve('./src/types'),
			$libs: resolve('./src/libs'),
			$css: resolve('./src/css'),
			$static: resolve('./static'),
		},
	},
};

export default config;
