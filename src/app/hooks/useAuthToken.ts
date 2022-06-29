import {useEffect, useState} from "react";
import {Jwt} from "../domain/entities/jwt.entity";

export const tokenKey = "token";

export function useAuthToken() {
	const savedToken = localStorage.getItem(tokenKey);

	const [token, setToken] = useState<Jwt | null>(savedToken ? JSON.parse(savedToken) : null);

	useEffect(() => {
		localStorage.setItem(tokenKey, JSON.stringify(token));
	}, [token]);

	function clearToken() {
		setToken(null);
		localStorage.removeItem(tokenKey);
	}

	return { token, setToken, clearToken };
}