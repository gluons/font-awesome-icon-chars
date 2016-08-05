'use strict';

const fs = require('fs');
const gutil = require('gulp-util');
const path = require('path');
const stream = require('stream');
const yaml = require('js-yaml');

module.exports = {};

module.exports.getSource = () => {
	let rawSource = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../font-awesome/src/icons.yml'), 'utf8'));
	let icons = rawSource.icons;
	return icons;
};

module.exports.convertSource = (icons, fa) => {
	let result = {
		icons: []
	};
	for (let icon of icons) {
		let newIcon = {
			id: fa ? ('fa-' + icon.id) : icon.id,
			unicode: icon.unicode
		};
		result.icons.push(newIcon);
	}
	return result;
};

// Create new file stream.
module.exports.createStream = (filename, content) => {
	let src = stream.Readable({
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
