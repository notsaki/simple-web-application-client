import React, {useEffect, useState} from "react";
import {useDependencyContext} from "./dependency.context";
import Router from "./Router";
import "./styles/global.scss";
import { SessionStateProvider } from "./user.context";
import { ApiMessageProvider } from "./api-message.context";
import ApiMessage from "./components/ApiMessage";
import FutureData from "./components/FutureData";
import ErrorPage from "./pages/ErrorPage";

export default function App(): JSX.Element {
	const authDao = useDependencyContext().daos.authDao;
	const [loggedIn, setLoggedIn] = useState<boolean>(false);
	const [apiMessage, setApiMessage] = useState<string[]>([]);

	function getToken() {
		return authDao.token()
			.then(() => setLoggedIn(true))
			.catch(error => {
				if(error.response.status === 403) setLoggedIn(false);
				else throw error;
			});
	}

	return (
		<FutureData
			repository={() => getToken()}
			viewFactory={() => (
				<SessionStateProvider value={[loggedIn, setLoggedIn]}>
					<ApiMessageProvider value={setApiMessage}>
						<div id={"app"}>
							<ApiMessage messages={apiMessage} />
							<Router />
						</div>
					</ApiMessageProvider>
				</SessionStateProvider>
			)}
			onError={error => <ErrorPage error={error} />}
		/>
	);
}