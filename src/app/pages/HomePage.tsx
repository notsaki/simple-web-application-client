import React from "react";
import {Link} from "react-router-dom";
import "./home-page.scss";
import {routes} from "../Router";

export default function HomePage(): JSX.Element {
	return (
		<div id={"homePage"}>
			<h3>Home</h3>
			<ul>
				<Link to={routes.createUser}><li>Register new user</li></Link>
				<Link to={routes.listUsers}><li>Display users</li></Link>
			</ul>
		</div>
	);
}