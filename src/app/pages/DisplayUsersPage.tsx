import React, {useEffect, useState} from "react";
import {useDependencyContext} from "../dependency.context";
import {User, UserListItemDto} from "../domain/entities/user.entity";
import {Link, useNavigate} from "react-router-dom";

export default function DisplayUsersPage(): JSX.Element {
	const userDao = useDependencyContext().daos.userDao;
	const [users, setUsers] = useState<UserListItemDto[]>([]);

	useEffect(() => {
		userDao
			.findAll()
			.then(response => setUsers(response));
	}, []);

	return (
		<div>
			<span>Display Users Page</span>
			<div>
				<div>
					<span>Name</span>
					<span>Surname</span>
				</div>
				{users.map(user => (
					<div key={user.id}>
						<Link to={`/user/${user.id}`}>
								<span>{user.name}</span>
								<span>{user.surname}</span>
					</Link>
					</div>
				))}
			</div>
		</div>
	);
}