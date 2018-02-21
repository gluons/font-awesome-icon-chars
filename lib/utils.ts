import { readFileSync } from 'fs';
import { resolve } from 'path';
import { Readable } from 'stream';

import { safeLoad } from 'js-yaml';
import Vinyl = require('vinyl');

import { Icon, RawIcon } from './interfaces';

/**
 * Get source icons.
 *
 * @export
 * @returns {RawIcon[]} Raw source icons.
 */
export function getSource() {
	const sourceFilePath = resolve(__dirname, '../font-awesome/src/icons.yml');
	let fileContent = readFileSync(sourceFilePath, 'utf8');
	let rawSource = safeLoad(fileContent);
	let icons: RawIcon[] = rawSource.icons;
	return icons;
}

/**
 * Convert icons source.
 *
 * @export
 * @param {RawIcon[]} icons Raw icons.
 * @param {boolean} [fa=true] Add `fa` prefix?
 * @returns Converted icons.
 */
export function convertSource(icons: RawIcon[]) {
	let result = { icons: [] as Icon[] };
	for (let icon of icons) {
		let newIcon: Icon = {
			id: icon.id,
			unicode: icon.unicode
		};
		if (icon.aliases) {
			newIcon.aliases = icon.aliases;
		}
		result.icons.push(newIcon);
	}
	return result;
}

/**
 * Create fake source stream.
 *
 * @export
 * @param {string} filename File name.
 * @param {string} content Content.
 * @returns Source stream.
 */
export function createStream(filename: string, content: string) {
	let src = new Readable({
		objectMode: true,
		read() {
			this.push(new Vinyl({
				path: filename,
				contents: Buffer.from(content)
			}));
			this.push(null);
		}
	});
	return src;
}
