import gulp = require('gulp');
import json2cson = require('gulp-json2cson');
import plumber = require('gulp-plumber');

import del = require('del');
import yaml = require('js-yaml');
import tomlify = require('tomlify-j0.4');
import xmlBuilder = require('xmlbuilder');

import { convertSource, createStream, getSource } from './lib/utils';

const { parallel, series } = gulp;

const filename = 'character-list';
const icons = getSource();
const JSONSource = convertSource(icons);

export function cleanAssets() {
	return del(['character-list/*']);
}

export function cleanTS() {
	return del([`src/${filename}.ts`]);
}

export const clean = parallel(cleanAssets, cleanTS);

export function buildCSON() {
	return createStream(`${filename}.cson`, JSON.stringify(JSONSource))
		.pipe(plumber())
		.pipe(json2cson())
		.pipe(gulp.dest('character-list'));
}

export function buildJSON() {
	return createStream(`${filename}.json`, JSON.stringify(JSONSource, null, '\t'))
		.pipe(plumber())
		.pipe(gulp.dest('character-list'));
}

export function buildTOML() {
	return createStream(`${filename}.toml`, tomlify.toToml(JSONSource, { space: 2 }))
		.pipe(plumber())
		.pipe(gulp.dest('character-list'));
}

interface IconXML {
	'@id': string;
	'unicode': { '#text': string };
	'alias'?: Array<{ '#text': string }>;
}
export function buildXML() {
	let xmlObj = {
		icons: {
			icon: JSONSource.icons.map(icon => {
				let iconObj: IconXML = {
					'@id': icon.id,
					'unicode': {
						'#text': icon.unicode
					}
				};
				if (Array.isArray(icon.aliases) && (icon.aliases.length > 0)) {
					iconObj.alias = icon.aliases.map(alias => ({ '#text': alias }));
				}
				return iconObj;
			})
		}
	};
	let xmlStr = xmlBuilder.create(xmlObj, { version: '1.0', encoding: 'UTF-8' })
		.end({
			pretty: true,
			indent: '\t'
		});

	return createStream(`${filename}.xml`, xmlStr)
		.pipe(plumber())
		.pipe(gulp.dest('character-list'));
}

export function buildYAML() {
	let yamlStr = '---\n';
	yamlStr += yaml.safeDump(JSONSource);

	return createStream(`${filename}.yaml`, yamlStr)
		.pipe(plumber())
		.pipe(gulp.dest('character-list'));
}

export const generate = series(cleanTS, function generate() {
	let JSONSourceStr = JSON.stringify(JSONSource, null, '\t');
	// Replace quote
	JSONSourceStr = JSONSourceStr
		.replace(/"icons"/g, 'icons')
		.replace(/"id"/g, 'id')
		.replace(/"unicode"/g, 'unicode')
		.replace(/"aliases"/g, 'aliases')
		.replace(/"/g, "'");
	let content = `export default ${JSONSourceStr};\n`;

	return createStream(`${filename}.ts`, content)
		.pipe(plumber())
		.pipe(gulp.dest('src'));
});

export function countTest() {
	let iconCount = {
		count: JSONSource.icons.length,
		aliases: {}
	};
	for (let icon of JSONSource.icons) {
		if (icon.aliases) {
			iconCount.aliases[icon.id] = icon.aliases.length;
		}
	}

	return createStream('icon-count.json', JSON.stringify(iconCount, null, '\t'))
		.pipe(gulp.dest('test'));
}

export const build = parallel(
	buildCSON,
	buildJSON,
	buildTOML,
	buildXML,
	buildYAML
);
build.displayName = 'build';

export default build;
