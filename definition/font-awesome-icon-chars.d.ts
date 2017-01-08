declare namespace FontAwesomeIconChars {
	interface Icon {
		id: string;
		aliases?: string[];
		unicode: string;
	}
}

declare let faIconChars: FontAwesomeIconChars.Icon[];

declare module 'font-awesome-icon-chars' {
	export default faIconChars;
}
