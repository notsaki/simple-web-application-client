import React from "react";
import {Link} from "react-router-dom";
import "./home-page.scss";
import {routes} from "../Router";
import Button from "../components/Button";
import {clearAuthTokens} from "axios-jwt";
import {useAuthContext} from "../user.context";

export default function HomePage(): JSX.Element {
	const setIsLoggedIn = useAuthContext()[1];

	function logout() {
		clearAuthTokens();
		setIsLoggedIn(false);
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