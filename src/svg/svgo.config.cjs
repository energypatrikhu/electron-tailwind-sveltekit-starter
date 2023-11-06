// svgo.config.js
module.exports = {
	multipass: true,
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
		'reusePaths',
		'removeScriptElement',
		'removeStyleElement',
		'removeOffCanvasPaths',
		'sortAttrs',
		'removeRasterImages',
	],
};
