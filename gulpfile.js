'use strict';

const gulp = require('gulp-help')(require('gulp-param')(require('gulp'), process.argv));

const babel = require('gulp-babel');
const json2cson = require('gulp-json2cson');
const plumber = require('gulp-plumber');

const del = require('del');
const tomlify = require('tomlify-j0.4');
const xmlBuilder = require('xmlbuilder');
const yaml = require('js-yaml');

const utils = require('./lib/utils');

const filename = 'character-list';
const icons = utils.getSource();

gulp.task('clean:assets', 'Clean character list files.', function () {
	return del(['character-list/*']);
});

gulp.task('clean:node', 'Clean Node module.', function () {
	return del(['dist/*']);
});

gulp.task('clean', 'Clean all built files.', ['clean:asset', 'clean:node']);

gulp.task('build:cson', 'Build CSON character list file.', ['clean:assets'], function (fa) {
	let json = utils.convertSource(icons, fa);
	return utils.createStream(`${filename}.cson`, JSON.stringify(json))
		.pipe(plumber())
		.pipe(json2cson())
		.pipe(gulp.dest('character-list'));
});

gulp.task('build:json', 'Build JSON character list file.', ['clean:assets'], function (fa) {
	let json = utils.convertSource(icons, fa);
	return utils.createStream(`${filename}.json`, JSON.stringify(json, null, '\t'))
		.pipe(plumber())
		.pipe(gulp.dest('character-list'));
});

gulp.task('build:toml', 'Build TOML character list file.', ['clean:assets'], function (fa) {
	let json = utils.convertSource(icons, fa);
	return utils.createStream(`${filename}.toml`, tomlify.toToml(json, { space: 2 }))
		.pipe(plumber())
		.pipe(gulp.dest('character-list'));
});

gulp.task('build:xml', 'Build XML character list file.', ['clean:assets'], function (fa) {
	let json = utils.convertSource(icons, fa);
	let xmlObj = {
		icons: {
			icon: []
		}
	};
	for (let icon of json.icons) {
		let iconObj = {};
		if (icon.aliases) {
			iconObj.alias = [];
			for (let alias of icon.aliases) {
				iconObj.alias.push({
					'#text': alias
				});
			}
		}
		Object.assign(iconObj, {
			'@id': icon.id,
			unicode: {
				'#text': icon.unicode
			}
		});
		xmlObj.icons.icon.push(iconObj);
	}
	let xmlStr = xmlBuilder.create(xmlObj, {
		version: '1.0',
		encoding: 'UTF-8'
	}).end({
		pretty: true,
		indent: '\t'
	});
	return utils.createStream(`${filename}.xml`, xmlStr)
		.pipe(plumber())
		.pipe(gulp.dest('character-list'));
});

gulp.task('build:yaml', 'Build YAML character list file.', ['clean:assets'], function (fa) {
	let json = utils.convertSource(icons, fa);
	let yamlStr = '---\n';
	yamlStr += yaml.safeDump(json);
	return utils.createStream(`${filename}.yaml`, yamlStr)
		.pipe(plumber())
		.pipe(gulp.dest('character-list'));
});

gulp.task('build:node', 'Build Node module.', ['clean:node'], function () {
	return gulp.src('./src/*.js')
		.pipe(babel())
		.pipe(gulp.dest('./dist'));
});

gulp.task('build', 'Build all file format.', [
	'build:node',
	'build:cson',
	'build:json',
	'build:toml',
	'build:xml',
	'build:yaml'
]);

gulp.task('count:test', 'Count Font Awesome icons for testing.', function () {
	let json = utils.convertSource(icons);
	let iconCount = {
		count: json.icons.length,
		aliases: {}
	};
	for (let icon of json.icons) {
		if (icon.aliases) {
			iconCount.aliases[icon.id] = icon.aliases.length;
		}
	}
	return utils.createStream('icon-count.json', JSON.stringify(iconCount, null, '\t'))
		.pipe(gulp.dest('test'));
});

gulp.task('default', 'Default task. Run "build" task.', ['build']);
