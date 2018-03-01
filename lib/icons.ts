/// <reference path='./types.d.ts' />

import { IconDefinition, IconPack } from '@fortawesome/fontawesome-common-types';
import regular from '@fortawesome/fontawesome-free-regular';
import solid from '@fortawesome/fontawesome-free-solid';

/**
 * Get icons information from icons source.
 *
 * @param {IconPack} iconsSource Icons source
 * @returns {IconInfo[]}
 */
function getIcons(iconsSource: IconPack): IconInfo[] {
	return Object.keys(iconsSource).map(key => {
		let iconDef: IconDefinition = solid[key];
		let iconInf: IconInfo = {
			name: iconDef.iconName,
			unicode: iconDef.icon[3] // 4th item of icon is unicode.
		};

		return iconInf;
	});
}

/**
 * Get solid icons information.
 *
 * @export
 * @returns {IconInfo[]}
 */
export function getSolidIcons(): IconInfo[] {
	return getIcons(solid);
}

/**
 * Get regular icons information
 *
 * @export
 * @returns {IconInfo[]}
 */
export function getRegularIcons(): IconInfo[] {
	return getIcons(regular);
}
