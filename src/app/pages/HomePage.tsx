import React from "react";
import {Link} from "react-router-dom";

export default function HomePage(): JSX.Element {
	return (
		<div>
			<h3>Home</h3>
			<ul>
				<li><Link to={"/register"}>Register new user</Link></li>
				<li><Link to={"users"}>Display users</Link></li>
			</ul>
		</div>
	);
}