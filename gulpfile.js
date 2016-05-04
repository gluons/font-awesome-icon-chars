var gulp = require('gulp-help')(require('gulp-param')(require('gulp'), process.argv));
var gutil = require('gulp-util');

var plumber = require('gulp-plumber');
var yaml = require('gulp-yaml');
var json2cson = require('gulp-json2cson');

var Q = require('q');
var del = require('del');
var xmlBuilder = require('xmlbuilder');

/*
 * Functions.
 */
// Load source JSON data to character list JSON.
var loadJSON = function (fa) {
	var icons = require('./font-awesome/icons.json').icons;
	var charList = {
		icons: []
	};
	for (var icon of icons) {
		var newIcon = {
			id: fa ? ('fa-' + icon.id) : icon.id,
			unicode: icon.unicode
		};
		charList.icons.push(newIcon);
	}
	return charList;
};

// Create new file stream.
var createStream = function (filename, content) {
	var src = require('stream').Readable({
		objectMode: true
	});
	src._read = function () {
		this.push(new gutil.File({
			cwd: '',
			base: '',
			path: filename,
			contents: new Buffer(content)
		}));
		this.push(null);
	};
	return src;
};

// Convert source file.
var convertSrc = function () {
	var deferred = Q.defer();
	gulp.src('font-awesome/icons.yml')
		.pipe(plumber())
		.pipe(yaml({
			space: '\t'
		}))
		.pipe(gulp.dest('font-awesome'))
		.on('end', function () {
			deferred.resolve();
		});
	return deferred.promise;
};

/*
 * Gulp Tasks.
 */

gulp.task('make:json', 'Build JSON character list file.', ['clean'], function (fa) {
	convertSrc().then(function () {
		var charList = loadJSON(fa);
		var src = createStream('character-list.json', JSON.stringify(charList, null, '\t'));
		return src.pipe(plumber())
			.pipe(gulp.dest('character-list'));
	});
});

gulp.task('make:xml', 'Build XML character list file.', ['clean'], function (fa) {
	convertSrc().then(function () {
		var charList = loadJSON(fa);

		// Create XML String.
		var xmlObj = {
			icons: {
				icon: []
			}
		};
		for (var i in charList.icons) {
			xmlObj.icons.icon.push({
				'@id': charList.icons[i].id,
				'#text': charList.icons[i].unicode
			});
		}
		var xmlStr = xmlBuilder.create(xmlObj, {
			encoding: 'UTF-8'
		}).end({
			pretty: true,
			indent: '\t'
		});

		var src = createStream('character-list.xml', xmlStr);
		return src.pipe(plumber())
			.pipe(gulp.dest('character-list'));
	});
});

gulp.task('make:cson', 'Build CSON character list file.', ['clean'], function (fa) {
	convertSrc().then(function () {
		var charList = loadJSON(fa);
		var src = createStream('character-list.json', JSON.stringify(charList, null, '\t'));
		return src.pipe(plumber())
			.pipe(json2cson())
			.pipe(gulp.dest('character-list'));
	});
});

gulp.task('make', 'Build all file format.', ['make:json', 'make:xml', 'make:cson']);

gulp.task('clean', 'Clean all built file & JSON source file.', function () {
	return del(['font-awesome/icons.json', 'character-list/*']);
});

gulp.task('default', 'Default task. Run "make" task.', ['make']);
