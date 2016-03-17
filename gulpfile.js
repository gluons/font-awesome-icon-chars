var gulp = require('gulp-help')(require('gulp-param')(require('gulp'), process.argv));
var gutil = require('gulp-util');

var plumber = require('gulp-plumber');
var yaml = require('gulp-yaml');

var Q = require('q');
var del = require('del');
var xml = require('xml');

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

/*
 * Gulp Tasks.
 */
gulp.task('convert-src', 'Convert icons.yml source file to JSON source file.', ['clean'], function () {
	return gulp.src('font-awesome/icons.yml')
		.pipe(plumber())
		.pipe(yaml({
			space: '\t'
		}))
		.pipe(gulp.dest('font-awesome'));
});

gulp.task('make:json', 'Build JSON character list file.', ['convert-src'], function (fa) {
	var charList = loadJSON(fa);
	var src = createStream('character-list.json', JSON.stringify(charList, null, '\t'));
	return src.pipe(plumber())
		.pipe(gulp.dest('character-list'));
});

gulp.task('make:xml', 'Build XML character list file.', ['convert-src'], function (fa) {
	var charList = loadJSON(fa);
	var xmlObj = {
		icons: []
	};
	for (var icon of charList.icons) {
		var iconNode = {
			icon: [
				{
					_attr: {
						id: icon.id
					}
				},
				icon.unicode
			]
		};
		xmlObj.icons.push(iconNode);
	}
	var xmlStr = xml(xmlObj, {
		indent: '\t',
		declaration: true
	});
	var src = createStream('character-list.xml', xmlStr);
	return src.pipe(plumber())
		.pipe(gulp.dest('character-list'));
});

gulp.task('make', 'Build all file format.', ['make:json', 'make:xml']);

gulp.task('clean', 'Clean all built file & JSON source file.', function () {
	var deferred = Q.defer();

	del(['font-awesome/icons.json', 'character-list/*']).then(() => {
		deferred.resolve();
	});
	return deferred.promise;
});

gulp.task('default', 'Default task. Run "make" task.', ['make']);
