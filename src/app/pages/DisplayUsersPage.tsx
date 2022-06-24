import React from "react";
import {useDependencyContext} from "../dependency.context";
import "./display-users-page.scss";
import FutureData from "../components/FutureData";

export default function DisplayUsersPage(): JSX.Element {
	const userDao = useDependencyContext().daos.userDao;

	return (
		<div id={"displayUsersPage"}>
			<FutureData
				repository={() => userDao.findAll()}
				viewFactory={users => (
					<>
						<h3>Display Users Page</h3>
						<table>
							<tbody>
							<tr>
								<th>Name</th>
								<th>Surname</th>
							</tr>
							{users.map(user => (
								<tr key={user.id} onClick={() => window.open(`/user/${user.id}`, "_blank")}>
									<td>{user.name}</td>
									<td>{user.surname}</td>
								</tr>
							))}
							</tbody>
						</table>
					</>
				)}
				onError={() => {}}
			/>
		</div>
	);
}