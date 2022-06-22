import React, {useState} from "react";
import Gender from "../domain/entities/gender";
import DateSelector from "../components/DateSelector";
import UserDaoImpl from "../dao/user.dao";
import HttpClient from "../utils/http-client";
import {UserDto} from "../domain/entities/user.entity";

export default function RegisterUserPage(): JSX.Element {
	const userDao = new UserDaoImpl(new HttpClient());

	const [name, setName] = useState<string>("");
	const [surname, serSurname] = useState<string>("");
	const [gender, setGender] = useState<Gender>(Gender.MALE);
	const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date(Date.now()));
	const [workAddress, setWorkAddress] = useState<string >("");
	const [homeAddress, setHomeAddress] = useState<string>("");

	const [message, setMessage] = useState<string | null>("");

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		console.log("Sending request.");
		e.preventDefault();
		const user: UserDto = { name, surname, gender, dateOfBirth, workAddress, homeAddress };
		userDao.save(user)
			.then(result => setMessage(JSON.stringify(result)))
			.catch(e => setMessage(JSON.stringify(e.message)));
	}

	return (
		<div>
			<span>Register user</span>
			{message !== null && <span>{message}</span>}
			<form onSubmit={onSubmit}>
				<div>
					<label htmlFor={"name"}>Name</label>
					<input id={"name"} type={"text"} placeholder={"Name"} value={name} onChange={e => setName(e.currentTarget.value)} />
				</div>
				<div>
					<label htmlFor={"surname"}>Surname</label>
					<input id={"surname"} type={"text"} placeholder={"Surname"} value={surname} onChange={e => serSurname(e.currentTarget.value)} />
				</div>
				<div>
					<label htmlFor={"gender"}>Gender</label>
					<select id={"gender"} placeholder={"Gender"} value={gender} onChange={e => {
						if(e.currentTarget.value !== Gender.MALE && e.currentTarget.value !== Gender.FEMALE) setGender(Gender.MALE);
						else setGender(e.currentTarget.value);
					}}>
						<option value={"MALE"}>Male</option>
						<option value={"FEMALE"}>Female</option>
					</select>
				</div>
				<div>
					<label htmlFor={"dateOfBirth"}>Date of Birth</label>
					<DateSelector value={dateOfBirth} onChange={date => setDateOfBirth(date)} />
				</div>
				<div>
					<label htmlFor={"workAddress"}>Work Address</label>
					<input id={"workAddress"} type={"text"} placeholder={"Work Address"} value={workAddress} onChange={e => setWorkAddress(e.currentTarget.value)} />
				</div>
				<div>
					<label htmlFor={"homeAddress"}>Home Address</label>
					<input id={"homeAddress"} type={"text"} placeholder={"Home Address"} value={homeAddress} onChange={e => setHomeAddress(e.currentTarget.value)} />
				</div>
				<div>
					<input type={"submit"} value={"Submit"} />
				</div>
			</form>
		</div>
	);
}