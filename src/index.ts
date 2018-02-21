import charList from './character-list';

export interface FontAwesomeIconMetadata {
	id: string;
	unicode: string;
	aliases?: string[];
}
const icons: FontAwesomeIconMetadata[] = charList.icons;

module.exports = icons;
export default icons;
