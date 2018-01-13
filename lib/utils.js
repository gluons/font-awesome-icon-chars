'use strict';

const fs = require('fs');
const path = require('path');
const stream = require('stream');
const yaml = require('js-yaml');
const Vinyl = require('vinyl');

let utils = {};

utils.getSource = () => {
	let rawSource = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../font-awesome/src/icons.yml'), 'utf8'));
	let icons = rawSource.icons;
	return icons;
};

utils.convertSource = (icons, fa) => {
	let result = {
		icons: []
	};
	for (let icon of icons) {
		let newIcon = {
			id: fa ? (`fa-${icon.id}`) : icon.id
		};
		if (icon.aliases) {
			newIcon.aliases = icon.aliases;
		}
		newIcon.unicode = icon.unicode;
		result.icons.push(newIcon);
	}
	return result;
};

// Create new file stream.
utils.createStream = (filename, content) => {
	let src = stream.Readable({
		objectMode: true
	});
	src._read = function () {
		this.push(new Vinyl({
			path: filename,
			contents: new Buffer(content)
		}));
		this.push(null);
	};
	return src;
};

module.exports = utils;
