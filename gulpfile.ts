import gulp = require('gulp');
import json2cson = require('gulp-json2cson');
import plumber = require('gulp-plumber');

import del = require('del');
import yaml = require('js-yaml');
import tomlify = require('tomlify-j0.4');
import xmlBuilder = require('xmlbuilder');

import { convertSource, createStream, getSource } from './lib/utils';

const filename = 'character-list';
const icons = getSource();
const JSONSource = convertSource(icons);

gulp.task('clean:assets', () => del(['character-list/*']));

gulp.task('clean:ts', () => del([`src/${filename}.ts`]));

gulp.task('clean', ['clean:assets', 'clean:ts']);

gulp.task('build:cson', ['clean:assets'], () => {
	return createStream(`${filename}.cson`, JSON.stringify(JSONSource))
		.pipe(plumber())
		.pipe(json2cson())
		.pipe(gulp.dest('character-list'));
});

gulp.task('build:json', ['clean:assets'], () => {
	return createStream(`${filename}.json`, JSON.stringify(JSONSource, null, '\t'))
		.pipe(plumber())
		.pipe(gulp.dest('character-list'));
});

gulp.task('build:toml', ['clean:assets'], () => {
	return createStream(`${filename}.toml`, tomlify.toToml(JSONSource, { space: 2 }))
		.pipe(plumber())
		.pipe(gulp.dest('character-list'));
});

interface IconXML {
	'@id': string;
	'unicode': { '#text': string };
	'alias'?: Array<{ '#text': string }>;
}
gulp.task('build:xml', ['clean:assets'], () => {
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
});

gulp.task('build:yaml', ['clean:assets'], () => {
	let yamlStr = '---\n';
	yamlStr += yaml.safeDump(JSONSource);

	return createStream(`${filename}.yaml`, yamlStr)
		.pipe(plumber())
		.pipe(gulp.dest('character-list'));
});

gulp.task('generate', ['clean:ts'], () => {
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

gulp.task('count:test', () => {
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
});

gulp.task('build', [
	'build:cson',
	'build:json',
	'build:toml',
	'build:xml',
	'build:yaml'
]);

gulp.task('default', ['build']);
