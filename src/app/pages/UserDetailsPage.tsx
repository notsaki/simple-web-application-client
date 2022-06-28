import React from "react";
import {useDependencyContext} from "../dependency.context";
import {useNavigate, useParams} from "react-router";
import KeyValueListView from "../components/KeyValueListView";
import {genderToString} from "../utils/gender.utils";
import FutureData from "../components/FutureData";
import {Delete} from "@material-ui/icons";
import "./user-details-page.scss";
import {routes} from "../Router";
import {useApiMessage} from "../api-message.context";
import {errorHandler} from "../utils/error-handler";

interface UserViewData {
	Name: string;
	Surname: string;
	Gender: string;
	Birthdate: string;
	WorkAddress: string;
	HomeAddress: string;
}

export default function UserDetailsPage(): JSX.Element {
	const setApiMessage = useApiMessage();
	const navigate = useNavigate();
	const userDao = useDependencyContext().daos.userDao;

	const { userId } = useParams();

	if(!userId) throw new Error("ID param not found.");
	const id = parseInt(userId);
	if(isNaN(id)) throw new Error("Invalid id format.");

	function deleteUser() {
		userDao
			.remove(id)
			.then(() => {
				console.log(routes.listUsers)
				navigate(routes.listUsers);
			})
			.catch(e => setApiMessage(errorHandler(e)));
	}

	return (
		<div id={"userDetailsPage"}>
			<FutureData
				repository={() => userDao.findById(id)}
				viewFactory={user => {
					const userViewData: UserViewData = {
						Name: user.name,
						Surname: user.surname,
						Gender: genderToString(user.gender),
						Birthdate: user.birthdate.toLocaleDateString(),
						WorkAddress: user.workAddress ?? "-",
						HomeAddress: user.homeAddress ?? "-",
					};

					return (
						<>
							<div id={"actions"}>
								<h3>{user.name} {user.surname}</h3>
								<Delete className={"action-icon"} onClick={() => deleteUser()} />
							</div>
							<KeyValueListView items={userViewData}/>
						</>
					);
				}}
				onError={() => {}}
			/>
		</div>
	)
}