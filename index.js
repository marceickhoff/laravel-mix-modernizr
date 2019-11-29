const mix = require('laravel-mix');
const fs = require('fs');
const escapeStringRegexp = require('escape-string-regexp');

class Modernizr {

	/**
	 * All dependencies that should be installed by Mix.
	 *
	 * @return {Array}
	 */
	dependencies() {
		return ['webpack-modernizr-loader', 'escape-string-regexp'];
	}

	/**
	 * Register the component.
	 *
	 * @param  {Object} configFiles One or more Modernizr config files
	 * @return {void}
	 */
	register(configFiles) {
		if (typeof configFiles === 'undefined') configFiles = { Modernizr: '.modernizrrc' };

		let regexStrings = [];
		let autoload = {};
		let alias = {};
		Object.keys(configFiles).forEach(key => {
			let file = configFiles[key];
			if (!fs.existsSync(file)) {
				fs.writeFile(file, ('module.exports = ' + JSON.stringify({
					"options": [],
					"feature-detects": []
				}, null, 2) + ';'), console.error);
			}
			regexStrings.push(escapeStringRegexp(file));

			alias[key] = path.resolve(configFiles[key]);
			autoload[key] = key;
		});

		this.test = regexStrings.join('|');

		mix.webpackConfig({
			resolve: {
				alias: alias
			}
		});
		mix.autoload(autoload);
	}

	/**
	 * Rules to be merged with the master webpack loaders.
	 *
	 * @return {Object}
	 */
	webpackRules() {
		return {
			test: new RegExp(this.test),
			loader: 'webpack-modernizr-loader'
		}
	}
}
mix.extend('modernizr', new Modernizr());