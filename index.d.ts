export interface FontAwesomeIconMetadata {
	id: string;
	aliases?: string[];
	unicode: string;
}

declare const FontAwesomeIconChars: FontAwesomeIconMetadata[];

export default FontAwesomeIconChars;
