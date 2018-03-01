import gulp = require('gulp');
import json2cson = require('gulp-json2cson');
import plumber = require('gulp-plumber');

import del = require('del');
import yaml = require('js-yaml');
import tomlify = require('tomlify-j0.4');
import xmlBuilder = require('xmlbuilder');

import { createStream, getSource, IconInfo } from './lib/utils';

const { parallel, series } = gulp;

const filename = 'character-list';
const JSONSource = getSource();

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
}
interface IconsXML {
	solid: IconXML[];
	regular: IconXML[];
	brands: IconXML[];
}
export function buildXML() {
	let convertToXMLObj = (icon: IconInfo): IconXML => {
		return {
			'@id': icon.name,
			'unicode': {
				'#text': icon.unicode
			}
		};
	};

	let xmlObj: IconsXML = {
		solid: JSONSource.solid.map(convertToXMLObj),
		regular: JSONSource.regular.map(convertToXMLObj),
		brands: JSONSource.brands.map(convertToXMLObj)
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
		.replace(/"solid"/g, 'solid')
		.replace(/"regular"/g, 'regular')
		.replace(/"brands"/g, 'brands')
		.replace(/"name"/g, 'name')
		.replace(/"unicode"/g, 'unicode')
		.replace(/"/g, "'");
	let content = `export default ${JSONSourceStr};\n`;

	return createStream(`${filename}.ts`, content)
		.pipe(plumber())
		.pipe(gulp.dest('src'));
});

export function countTest() {
	let iconCount = {
		all: 0,
		solid: JSONSource.solid.length,
		regular: JSONSource.regular.length,
		brands: JSONSource.brands.length
	};

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
