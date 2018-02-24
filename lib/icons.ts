/// <reference path='./types.d.ts' />

import solid, { IconDefinition } from '@fortawesome/fontawesome-free-solid';

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
