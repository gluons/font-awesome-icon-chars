'use strict';

const gulp = require('gulp-help')(require('gulp-param')(require('gulp'), process.argv));

const json2cson = require('gulp-json2cson');
const plumber = require('gulp-plumber');

const del = require('del');
const tomlify = require('tomlify-j0.4');
const xmlBuilder = require('xmlbuilder');
const yaml = require('js-yaml');

const utils = require('./lib/utils');

const filename = 'character-list';
let icons = utils.getSource();

gulp.task('build:cson', 'Build CSON character list file.', ['clean'], function (fa) {
	let json = utils.convertSource(icons, fa);
	return utils.createStream(`${filename}.cson`, JSON.stringify(json))
			.pipe(plumber())
			.pipe(json2cson())
			.pipe(gulp.dest('character-list'));
});

gulp.task('build:json', 'Build JSON character list file.', ['clean'], function (fa) {
	let json = utils.convertSource(icons, fa);
	return utils.createStream(`${filename}.json`, JSON.stringify(json, null, '\t'))
			.pipe(plumber())
			.pipe(gulp.dest('character-list'));
});

gulp.task('build:toml', 'Build TOML character list file.', ['clean'], function (fa) {
	let json = utils.convertSource(icons, fa);
	return utils.createStream(`${filename}.toml`, tomlify(json, null, 2))
			.pipe(plumber())
			.pipe(gulp.dest('character-list'));
});

gulp.task('build:xml', 'Build XML character list file.', ['clean'], function (fa) {
	let json = utils.convertSource(icons, fa);
	let xmlObj = {
		icons: {
			icon: []
		}
	};
	for(let icon of json.icons) {
		xmlObj.icons.icon.push({
			'@id': icon.id,
			'#text': icon.unicode
		});
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

gulp.task('build:yaml', 'Build YAML character list file.', ['clean'], function (fa) {
	let json = utils.convertSource(icons, fa);
	return utils.createStream(`${filename}.yaml`, '---\n' + yaml.safeDump(json))
			.pipe(plumber())
			.pipe(gulp.dest('character-list'));
});

gulp.task('build', 'Build all file format.', ['build:cson', 'build:json', 'build:toml', 'build:xml', 'build:yaml']);

gulp.task('clean', 'Clean all built files.', function () {
	return del(['character-list/*']);
});

gulp.task('default', 'Default task. Run "build" task.', ['build']);
