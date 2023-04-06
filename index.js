const mix = require('laravel-mix');
const fs = require('fs');
const escapeStringRegexp = require('escape-string-regexp');
const path = require('path');

class Modernizr {

	/**
	 * All dependencies that should be installed by Mix.
	 *
	 * @return {Array}
	 */
	dependencies() {
		return ['@sect/modernizr-loader', 'escape-string-regexp'];
	}

	/**
	 * Register the component.
	 *
	 * @param  {Object} configFiles One or more Modernizr config files
	 * @return {void}
	 */
	register(configFiles) {
		// Set default identifier if none provided
		if (typeof configFiles === 'undefined') configFiles = { modernizr: '.modernizrrc' };

		// Holds file filter regex strings
		let regexStrings = [];

		// Webpack variables
		let autoload = {};
		let alias = {};

		// Iterate over every provided config file
		Object.keys(configFiles).forEach(key => {
			let file = configFiles[key];

			// Create config file if it doesn't exist
			if (!fs.existsSync(file)) {
				fs.writeFile(file, ('module.exports = ' + JSON.stringify({
					"options": [],
					"feature-detects": []
				}, null, 2) + ';'), console.error);
			}

			// Add escaped file name to regex strings
			regexStrings.push(escapeStringRegexp(file));

			// Set alias and autoload for this build
			alias[key] = path.resolve(configFiles[key]);
			autoload[key] = key;
		});

		// Set Webpack test
		this.test = new RegExp(regexStrings.join('|'));

		// Add aliases for Modernizr builds so they can be called by the provided identifier
		mix.webpackConfig({
			resolve: {
				alias: alias
			}
		});

		// Register autoloading of Modernizr builds
		mix.autoload(autoload);
	}

	/**
	 * Rules to be merged with the master webpack loaders.
	 *
	 * @return {Object}
	 */
	webpackRules() {
		return {
			test: this.test,
			loader: '@sect/modernizr-loader'
		}
	}
}
mix.extend('modernizr', new Modernizr());
