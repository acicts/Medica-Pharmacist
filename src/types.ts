export interface authContextTypes {
	token: string | null;
}

export interface authContextTypes {
	login: (token: string, expiresOn: string) => void;
	logout: () => void;
	token: string | null;
}