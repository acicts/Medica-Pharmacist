import React, { createContext, ReactElement, useEffect, useState } from "react";
import { authContextTypes } from "../types";

export const authContext = createContext<authContextTypes>({
	token: null,
});

const getCookie = (name: string): string | null => {
	var match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
	if (match) return match[2];

	return null;
};

const AuthContextProvider = (props: { children: ReactElement }) => {
	const [token] = useState<string | null>(
		localStorage.getItem("token") || getCookie("token")
	);

	const value: authContextTypes = {
		token,
	};

	return (
		<authContext.Provider value={value}>{props.children}</authContext.Provider>
	);
};

export default AuthContextProvider;
