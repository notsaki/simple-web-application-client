import React, {useEffect, useState} from "react";
import {useDependencyContext} from "./dependency.context";
import Router from "./Router";
import "./styles/global.scss";
import { AuthProvider } from "./user.context";
import {clearAuthTokens, getRefreshToken, isLoggedIn, setAccessToken, setAuthTokens} from "axios-jwt";
import { ApiMessageProvider } from "./api-message.context";
import ApiMessage from "./components/ApiMessage";

export default function App(): JSX.Element {
	const authDao = useDependencyContext().daos.authDao;
	const [loggedIn, setLoggedIn] = useState(isLoggedIn());
	const [apiMessage, setApiMessage] = useState<string[]>([]);

	useEffect(() => {
		const refreshToken = getRefreshToken();

		function removeToken() {
			clearAuthTokens();
			setLoggedIn(false);
		}

		if(refreshToken === undefined) {
			removeToken();
			return;
		}

		// @ts-ignore
		// Handled above.
		authDao.refresh({ refreshToken: getRefreshToken() })
			.then(jwt => {
				setAuthTokens({
					accessToken: jwt.access_token,
					refreshToken: jwt.refresh_token
				});

				setAccessToken(jwt.access_token);
				setLoggedIn(true);
			})
			.catch(() => {
				removeToken();
			})
	}, []);

	return (
		<ApiMessageProvider value={setApiMessage}>
			<AuthProvider value={[loggedIn, setLoggedIn]}>
				<div id={"app"}>
					<ApiMessage messages={apiMessage} />
					<Router />
				</div>
			</AuthProvider>
		</ApiMessageProvider>
	);
}