import charList from './character-list';

export interface FontAwesomeIconMetadata {
	name: string;
	unicode: string;
}
export interface FontAwesomeIconAllMetadata {
	solid: FontAwesomeIconMetadata[];
	regular: FontAwesomeIconMetadata[];
	brands: FontAwesomeIconMetadata[];
}
const icons: FontAwesomeIconAllMetadata = charList;

module.exports = icons;
export default icons;
