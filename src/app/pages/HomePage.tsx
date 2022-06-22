import React from "react";
import {Link} from "react-router-dom";
import "./home-page.scss";

export default function HomePage(): JSX.Element {
	return (
		<div id={"homePage"}>
			<div id={"homeContainer"}>
				<h3>Home</h3>
				<ul>
					<Link to={"/register"}><li>Register new user</li></Link>
					<Link to={"users"}><li>Display users</li></Link>
				</ul>
			</div>
		</div>
	);
}