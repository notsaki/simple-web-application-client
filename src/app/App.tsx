import React, {useEffect, useState} from "react";
import {useDependencyContext} from "./dependency.context";
import Router from "./Router";
import "./styles/global.scss";
import { SessionStateProvider } from "./user.context";
import { ApiMessageProvider } from "./api-message.context";
import ApiMessage from "./components/ApiMessage";
import FutureData from "./components/FutureData";
import ErrorPage from "./pages/ErrorPage";
import {useResetState} from "./hooks/useResetState";

export default function App(): JSX.Element {
	const authDao = useDependencyContext().daos.authDao;
	const [loggedIn, setLoggedIn] = useState<boolean>(false);
	const [apiMessage, setApiMessage] = useResetState<string[]>(5000);

	function getToken() {
		return authDao.token()
			.then(() => setLoggedIn(true))
			.catch(error => {
				if(error.response.status === 403 || error.response.status === 0) setLoggedIn(false);
				else throw error;
			});
	}

	return (
		<FutureData
			repository={() => getToken()}
			onResolve={() => (
				<SessionStateProvider value={[loggedIn, setLoggedIn]}>
					<ApiMessageProvider value={(value: string[]) => setApiMessage(value)}>
						<div id={"app"}>
							<ApiMessage messages={apiMessage ?? []} />
							<Router />
						</div>
					</ApiMessageProvider>
				</SessionStateProvider>
			)}
			onRejection={error => <ErrorPage error={error} />}
		/>
	);
}