import React, {useEffect, useState} from "react";
import {useDependencyContext} from "../dependency.context";
import {User} from "../domain/entities/user.entity";
import {useParams} from "react-router";
import KeyValueListView from "../components/KeyValueListView";
import {genderToString} from "../utils/gender.utils";
import FormButton from "../components/FormButton";
import FutureData from "../components/FutureData";

interface UserViewData {
	Name: string;
	Surname: string;
	Gender: string;
	Birthdate: string;
	WorkAddress: string;
	HomeAddress: string;
}

export default function UserDetailsPage(): JSX.Element {
	const userDao = useDependencyContext().daos.userDao;

	const { userId } = useParams();

	if(!userId) throw new Error("ID param not found.");
	const id = parseInt(userId);
	if(isNaN(id)) throw new Error("Invalid id format.");

	return (
		<div>
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
							<h3>{user.name} {user.surname}</h3>
							<KeyValueListView items={userViewData}/>
						</>
					);
				}}
				onError={() => {}}
			/>
		</div>
	)
}