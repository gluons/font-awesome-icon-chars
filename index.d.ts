declare namespace FontAwesomeIconChars {
	export interface Icon {
		id: string;
		aliases?: string[];
		unicode: string;
	}
}

declare let faIconChars: FontAwesomeIconChars.Icon[];

declare module 'font-awesome-icon-chars' {
	export = faIconChars;
}
