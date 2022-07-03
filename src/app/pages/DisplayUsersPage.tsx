import React from "react";
import {useDependencyContext} from "../dependency.context";
import "./display-users-page.scss";
import FutureData from "../components/FutureData";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import {routes} from "../Router";
import ErrorPage from "./ErrorPage";

export default function DisplayUsersPage(): JSX.Element {
	const userDao = useDependencyContext().daos.userDao;
	const navigate = useNavigate();

	return (
		<div id={"displayUsersPage"}>
			<FutureData
				repository={() => userDao.findAll()}
				viewFactory={users => (
					<>
						<h3>Display Users Page</h3>
						{users.length > 0 ? (
							<table>
								<tbody>
								<tr>
									<th>Name</th>
									<th>Surname</th>
								</tr>
								{users.map(user => (
									<tr key={user.id} onClick={() => window.open(`#${routes.userDetails}/${user.id}`, "_blank")}>
										<td>{user.name}</td>
										<td>{user.surname}</td>
									</tr>
								))}
								</tbody>
							</table>
						) : (
							<div id={"emptyListMessage"}>
								<span>There are no users in the system.</span>
								<Button onClick={() => navigate(routes.createUser)}>Create user</Button>
							</div>
						)}
					</>
				)}
				onError={error => <ErrorPage error={error} />}
			/>
		</div>
	);
}