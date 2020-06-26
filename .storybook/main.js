module.exports = {
	addons: [
		'@storybook/addon-knobs',
		'@storybook/addon-links',
		'@storybook/preset-create-react-app',
		{
			name: '@storybook/addon-docs',
			options: {
				configureJSX: true,
			},
		},
	],
	stories: ['../README.story.mdx', '../docs/**/*.story.mdx', '../src/**/*.story.jsx'],
	webpackFinal: async (config) => {
		config.module.rules.push({
			test: /\.jsx?$/,
			loader: 'linaria/loader',
			options: {
				sourceMap: false,
				cacheDirectory: 'src/.linaria_cache/storybook',
			},
		})

		return config
	},
}
