import React, {useState} from "react";
import { DependencyProvider } from "./dependency.context";
import Router from "./Router";
import {dependencyContextFactory} from "./utils/dependency-context.factory";
import "./styles/global.scss";
import { AuthProvider } from "./user.context";
import {isLoggedIn} from "axios-jwt";
import { ApiMessageProvider } from "./api-message.context";
import ApiMessage from "./components/ApiMessage";

export default function App(): JSX.Element {
	const loggedIn = useState(isLoggedIn());
	const [apiMessage, setApiMessage] = useState<string[]>([]);

	return (
		<DependencyProvider value={dependencyContextFactory("impl")}>
			<ApiMessageProvider value={setApiMessage}>
				<AuthProvider value={loggedIn}>
					<div id={"app"}>
						<ApiMessage messages={apiMessage} />
						<Router />
					</div>
				</AuthProvider>
			</ApiMessageProvider>
		</DependencyProvider>
	);
}