interface Icon {
	id: string;
	aliases?: string[];
	unicode: string;
}

declare let faIconChars: Icon[];

declare module 'font-awesome-icon-chars' {
	export = faIconChars
}
