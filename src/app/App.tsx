import React, {useEffect, useState} from "react";
import {useDependencyContext} from "./dependency.context";
import Router from "./Router";
import "./styles/global.scss";
import { AuthProvider } from "./user.context";
import { ApiMessageProvider } from "./api-message.context";
import ApiMessage from "./components/ApiMessage";
import {useAuthToken} from "./hooks/useAuthToken";

export default function App(): JSX.Element {
	const authDao = useDependencyContext().daos.authDao;
	const { token, setToken, clearToken } = useAuthToken();

	const [apiMessage, setApiMessage] = useState<string[]>([]);

	useEffect(() => {
		if(!token?.refresh_token) {
			clearToken();
			return;
		}

		authDao.refresh({ refreshToken: token?.refresh_token })
			.then(token => setToken(token))
			.catch(() => clearToken())
	}, []);

	return (
		<ApiMessageProvider value={setApiMessage}>
			<AuthProvider value={{ token, setToken, clearToken }}>
				<div id={"app"}>
					<ApiMessage messages={apiMessage} />
					<Router />
				</div>
			</AuthProvider>
		</ApiMessageProvider>
	);
}