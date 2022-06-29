import React from "react";
import {Link} from "react-router-dom";
import "./home-page.scss";
import {routes} from "../Router";
import Button from "../components/Button";
import {useAuthContext} from "../user.context";

export default function HomePage(): JSX.Element {
	const { clearToken } = useAuthContext();

	function logout() {
		clearToken();
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