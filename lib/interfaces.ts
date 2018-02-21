/**
 * Raw icon.
 *
 * @export
 * @interface RawIcon
 */
export interface RawIcon {
	name: string;
	id: string;
	unicode: string;
	aliases?: string[];
}

/**
 * Converted icon.
 *
 * @export
 * @interface Icon
 */
export interface Icon {
	id: string;
	unicode: string;
	aliases?: string[];
}
