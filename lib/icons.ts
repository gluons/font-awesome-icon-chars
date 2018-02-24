/// <reference path='./types.d.ts' />

import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import regular from '@fortawesome/fontawesome-free-regular';
import solid from '@fortawesome/fontawesome-free-solid';

/**
 * Get solid icons information.
 *
 * @export
 * @returns {IconInfo[]}
 */
export function getSolidIcons(): IconInfo[] {
	return Object.keys(solid).map(key => {
		let iconDef: IconDefinition = solid[key];
		let iconInf: IconInfo = {
			name: iconDef.iconName,
			unicode: iconDef.icon[3] // 4th item of icon is unicode.
		};

		return iconInf;
	});
}

/**
 * Get regular icons information
 *
 * @export
 * @returns {IconInfo[]}
 */
export function getRegularIcons(): IconInfo[] {
	return Object.keys(regular).map(key => {
		let iconDef: IconDefinition = regular[key];
		let iconInf: IconInfo = {
			name: iconDef.iconName,
			unicode: iconDef.icon[3] // 4th item of icon is unicode.
		};

		return iconInf;
	});
}
