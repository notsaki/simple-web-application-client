import React, {useEffect, useState} from "react";
import {useDependencyContext} from "../dependency.context";
import {User} from "../domain/entities/user.entity";
import {useParams} from "react-router";

export default function UserDetailsPage(): JSX.Element {
	const userDao = useDependencyContext().daos.userDao;

	const [user, setUser] = useState<User | null>(null);
	const { userId } = useParams();

	if(!userId) throw new Error("ID param not found.");
	const id = parseInt(userId);
	if(isNaN(id)) throw new Error("Invalid id format.");

	useEffect(() => {
		userDao.findById(id).then(response => setUser(response));
	}, []);

	return (
		<div>
			<h3>User Details Page</h3>
			{user !== null ? (
				<table>
					<tbody>
					<tr>
						<th>Name</th>
						<th>Surname</th>
						<th>Gender</th>
						<th>Date of Birth</th>
						<th>Work Address</th>
						<th>Home Address</th>
					</tr>
					<tr>
						<td>{user.name}</td>
						<td>{user.surname}</td>
						<td>{user.gender}</td>
						<td>{user.birthdate.toLocaleDateString()}</td>
						<td>{user.workAddress}</td>
						<td>{user.homeAddress}</td>
					</tr>
					</tbody>
				</table>
			) : <span>Loading...</span>}
		</div>
	)
}