import React, {useEffect, useState} from "react";
import Gender from "../domain/entities/gender";
import DateSelector from "../components/DateSelector";
import {UserDto} from "../domain/entities/user.entity";
import {useDependencyContext} from "../dependency.context";
import LabeledElement from "../components/LabeledElement";
import "./register-user-page.scss";
import FormButton from "../components/FormButton";
import DropDown from "../components/DropDown";
import {errorOrNull, isGender, isName, isPastDate, isValidAddress} from "../utils/validators";
import {unwrapValue} from "../utils/event.utils";
import NullableInput from "../components/NullableInput";

export default function RegisterUserPage(): JSX.Element {
	const userDao = useDependencyContext().daos.userDao;

	const [name, setName] = useState<string>("");
	const [surname, serSurname] = useState<string>("");
	const [gender, setGender] = useState<Gender>(Gender.MALE);
	const [birthdate, setBirthdate] = useState<Date>(() => {
		const date = new Date(Date.now());
		date.setDate(date.getDate() - 1);
		return date;
	});
	const [workAddress, setWorkAddress] = useState<string | null>(null);
	const [homeAddress, setHomeAddress] = useState<string | null>(null);

	const [validName, setValidName] = useState(false);
	const [validSurname, setValidSurname] = useState(false);
	const [validGender, setValidGender] = useState(true);
	const [validBirthdate, setValidBirthdate] = useState(true);
	const [validWorkAddress, setValidWorkAddress] = useState(true);
	const [validHomeAddress, setValidHomeAddress] = useState(true);

	const [message, setMessage] = useState<string | null>("");

	const isSubmittable = [
			validName,
			validSurname,
			validGender,
			validBirthdate,
			validWorkAddress,
			validHomeAddress,
		]
			.find(value => !value) !== undefined;

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const user: UserDto = { name, surname, gender, birthdate, homeAddress, workAddress };
		userDao.save(user)
			.then(result => setMessage(JSON.stringify(result)))
			.catch(e => setMessage(JSON.stringify(e.message)));
	}

	return (
		<div id={"registerUserPage"}>
			<h3>Register user</h3>
			{message !== null && <span>{message}</span>}
			<form onSubmit={onSubmit}>
				<LabeledElement
					value={name}
					onValidation={setValidName}
					validator={isName}
					htmlFor={"name"}
					label={"Name"}
					error={"Invalid name length (1-64)."}
				>
					<input
						id={"name"}
						type={"text"}
						placeholder={"Name"}
						value={name}
						onChange={e => setName(unwrapValue(e))}
					/>
				</LabeledElement>
				<LabeledElement
					htmlFor={"surname"}
					label={"Surname"}
					error={"Invalid surname length (1-64)."}
					onValidation={setValidSurname}
					validator={isName}
					value={surname}
				>
					<input
						id={"surname"}
						type={"text"}
						placeholder={"Surname"}
						value={surname}
						onChange={e => serSurname(unwrapValue(e))}
					/>
				</LabeledElement>
				<LabeledElement
					label={"Gender"}
					htmlFor={"gender"}
					error={"Invalid value. Please select either Male or Female."}
					validator={isGender}
					onValidation={setValidGender}
					value={gender}
				>
					<DropDown
						value={gender}
						onChange={value => value && setGender(value.value)}
						options={[
							{ value: Gender.MALE, label: "Male" },
							{ value: Gender.FEMALE, label: "Female" },
						]}
					/>
				</LabeledElement>
				<LabeledElement
					label={"Date of Birth"}
					htmlFor={"birthdate"}
					error={"Birthdate should be in the past."}
					validator={isPastDate}
					onValidation={setValidBirthdate}
					value={birthdate}
					emitOn={"change"}
				>
					<DateSelector
						value={birthdate}
						onChange={setBirthdate}
					/>
				</LabeledElement>
				<LabeledElement
					label={"Work Address"}
					htmlFor={"workAddress"}
					error={"Invalid address length. Should be between 1-128 characters long or empty."}
					validator={isValidAddress}
					onValidation={setValidWorkAddress}
					value={workAddress}
				>
					<NullableInput
						id={"workAddress"}
						type={"text"}
						placeholder={"Work Address"}
						value={workAddress}
						onChange={e => setWorkAddress(unwrapValue(e))}
					/>
				</LabeledElement>
				<LabeledElement
					label={"Home Address"}
					htmlFor={"homeAddress"}
					error={"Invalid address length. Should be between 1-128 characters long or empty.\""}
					validator={isValidAddress}
					onValidation={setValidHomeAddress}
					value={homeAddress}
				>
					<NullableInput
						id={"homeAddress"}
						type={"text"}
						placeholder={"Home Address"}
						value={homeAddress}
						onChange={e => setHomeAddress(unwrapValue(e))}
					/>
				</LabeledElement>
				<div id={"registerActions"}>
					<FormButton disabled={isSubmittable} type={"submit"} value={"Submit"} />
				</div>
			</form>
		</div>
	);
}