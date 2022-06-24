import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router";
import {useDependencyContext} from "../dependency.context";
import {UserListItemDto} from "../domain/entities/user.entity";
import "./display-users-page.scss";

export default function DisplayUsersPage(): JSX.Element {
	const userDao = useDependencyContext().daos.userDao;
	const [users, setUsers] = useState<UserListItemDto[]>([]);

	useEffect(() => {
		userDao
			.findAll()
			.then(response => setUsers(response));
	}, []);

	return (
		<div id={"displayUsersPage"}>
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
		</div>
	);
}