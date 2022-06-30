import React from "react";
import {Link} from "react-router-dom";
import "./home-page.scss";
import {routes} from "../Router";
import Button from "../components/Button";
import {useSessionStateContext} from "../user.context";
import {useDependencyContext} from "../dependency.context";
import {useApiMessage} from "../api-message.context";

export default function HomePage(): JSX.Element {
	const setLoggedIn = useSessionStateContext()[1];
	const authDao = useDependencyContext().daos.authDao;
	const setApiMessage = useApiMessage();

	function logout() {
		authDao.logout()
			.then(() => setLoggedIn(false))
			.catch(error => setApiMessage(error));
	}

	return (
		<div id={"homePage"}>
			<div id={"homeHeader"}>
				<h3>Home</h3>
				<Button onClick={() => logout()}>Logout</Button>
			</div>
			<ul>
				<Link to={routes.createUser}><li>Register new user</li></Link>
				<Link to={routes.listUsers}><li>Display users</li></Link>
			</ul>
		</div>
	);
}