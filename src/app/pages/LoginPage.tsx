import React, {useState} from "react";
import LabeledElement from "../components/LabeledElement";
import {unwrapValue} from "../utils/event.utils";
import FormButton from "../components/FormButton";
import "./login-page.scss";
import {useDependencyContext} from "../dependency.context";
import {errorHandler} from "../utils/error-handler";
import {useApiMessage} from "../api-message.context";
import {useSessionStateContext} from "../user.context";

export default function LoginPage(): JSX.Element {
	const setLoggedIn = useSessionStateContext()[1];
	const authDao = useDependencyContext().daos.authDao;
	const setApiMessage = useApiMessage();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const isSubmittable = username.length > 0 && password.length > 0;

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const admin = { username, password };
		authDao
			.login(admin)
			.then(() => {
				setLoggedIn(true);
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