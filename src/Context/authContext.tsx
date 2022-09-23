import React, { createContext, ReactElement, useEffect, useState } from 'react';
import { authContextTypes } from '../types';

let timer: NodeJS.Timeout;

export const authContext = createContext<authContextTypes>({
	login: () => {},
	logout: () => {},
	token: null,
});

const calculateRemainingTime = (expiryDate: string | null) => {
	if (expiryDate) {
		const dateNow = new Date().getTime();
		const expirationDate = parseInt(expiryDate);
		const remainingTime = expirationDate - dateNow;
		return remainingTime;
	}
};

const AuthContextProvider = (props: { children: ReactElement }) => {
	const [token, setToken] = useState<string | null>(
		localStorage.getItem('token')
	);
	console.log(localStorage.getItem('token'));
	const [expiresOn, setExpiresOn] = useState<string | null>(
		localStorage.getItem('expiresOn')
	);
	const login = (token: string, expiresOn: string) => {
		localStorage.setItem('token', token);
		localStorage.setItem('expiresOn', expiresOn);
		setToken(token);
		setExpiresOn(expiresOn);
	};

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('expiresOn');
		setToken(null);
		setExpiresOn(null);
		clearTimeout(timer);
	};

	const value: authContextTypes = {
		token,
		login,
		logout,
	};

	useEffect(() => {
		const rem = calculateRemainingTime(expiresOn);
		if (token && rem) {
			if (rem <= 1000) {
				logout();
			} else {
				timer = setTimeout(() => {
					if (rem <= 1000) {
						logout();
					}
				}, rem - 1000);
			}
		}
	});
	return (
		<authContext.Provider value={value}>
			{props.children}
		</authContext.Provider>
	);
};

export default AuthContextProvider;
