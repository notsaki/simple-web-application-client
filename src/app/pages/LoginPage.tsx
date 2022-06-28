import React, {useState} from "react";
import LabeledElement from "../components/LabeledElement";
import {unwrapValue} from "../utils/event.utils";
import FormButton from "../components/FormButton";
import "./login-page.scss";
import {useDependencyContext} from "../dependency.context";
import {setAccessToken, setAuthTokens} from "axios-jwt";
import {useAuthContext} from "../user.context";
import {errorHandler} from "../utils/error-handler";
import {useApiMessage} from "../api-message.context";

export default function LoginPage(): JSX.Element {
	const authDao = useDependencyContext().daos.authDao;
	const setIsLoggedIn = useAuthContext()[1];
	const setApiMessage = useApiMessage();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const isSubmittable = username.length > 0 && password.length > 0;

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const admin = { username, password };
		authDao
			.login(admin)
			.then(jwt => {
				setApiMessage([]);
			setAuthTokens({
				accessToken: jwt.access_token,
				refreshToken: jwt.refresh_token,
			});

			setAccessToken(jwt.access_token);
			setIsLoggedIn(true);
		})
			.catch(error => setApiMessage(errorHandler(error, { 401: "Invalid username or password. "})));
	}

	return (
		<form id={"loginForm"} onSubmit={onSubmit}>
			<h3>Login</h3>
			<div id={"loginFormInput"}>
				<LabeledElement label={"Username"} value={username}>
					<input value={username} onChange={e => setUsername(unwrapValue(e))} />
				</LabeledElement>
				<LabeledElement label={"Password"} value={password}>
					<input value={password} onChange={e => setPassword(unwrapValue(e))} type={"password"} />
				</LabeledElement>
			</div>
			<div id={"loginFormActions"}>
				<FormButton id={"loginSubmit"} disabled={!isSubmittable} type={"submit"} value={"Submit"} />
			</div>
		</form>
	);
}