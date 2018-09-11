import { IconDefinition, IconPack } from '@fortawesome/fontawesome-common-types';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { IconInfo } from './types';

/**
 * Get icons information from icons source.
 *
 * @param {IconPack} iconsSource Icons source
 * @returns {IconInfo[]}
 */
function getIcons(iconsSource: IconPack): IconInfo[] {
	return Object.keys(iconsSource).map(key => {
		let iconDef: IconDefinition = iconsSource[key];
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
	return getIcons(fas);
}

/**
 * Get regular icons information.
 *
 * @export
 * @returns {IconInfo[]}
 */
export function getRegularIcons(): IconInfo[] {
	return getIcons(far);
}

/**
 * Get brands icons information.
 *
 * @export
 * @returns {IconInfo[]}
 */
export function getBrandsIcons(): IconInfo[] {
	return getIcons(fab);
}
