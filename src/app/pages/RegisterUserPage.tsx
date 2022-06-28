import React, {useState} from "react";
import Gender from "../domain/entities/gender";
import DateSelector from "../components/DateSelector";
import {UserDto} from "../domain/entities/user.entity";
import {useDependencyContext} from "../dependency.context";
import LabeledElement from "../components/LabeledElement";
import "./register-user-page.scss";
import FormButton from "../components/FormButton";
import DropDown from "../components/DropDown";
import {isGender, isName, isPastDate, isValidAddress} from "../utils/validators";
import {unwrapValue} from "../utils/event.utils";
import NullableInput from "../components/NullableInput";
import SuccessMessage from "../components/SuccessMessage";
import {useResetState} from "../hooks/useResetState";

export default function RegisterUserPage(): JSX.Element {
	const userDao = useDependencyContext().daos.userDao;

	const initialDate = () => {
		const date = new Date(Date.now());
		date.setDate(date.getDate() - 1);
		return date;
	};

	const [name, setName] = useState<string>("");
	const [surname, setSurname] = useState<string>("");
	const [gender, setGender] = useState<Gender>(Gender.MALE);
	const [birthdate, setBirthdate] = useState<Date>(initialDate);
	const [workAddress, setWorkAddress] = useState<string | null>(null);
	const [homeAddress, setHomeAddress] = useState<string | null>(null);

	const [validName, setValidName] = useState(false);
	const [validSurname, setValidSurname] = useState(false);
	const [validGender, setValidGender] = useState(true);
	const [validBirthdate, setValidBirthdate] = useState(true);
	const [validWorkAddress, setValidWorkAddress] = useState(true);
	const [validHomeAddress, setValidHomeAddress] = useState(true);

	const [message, setMessage] = useResetState<string>(5000);

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
			.then(() => {
				setMessage("User added successfully.");
				setName("");
				setSurname("");
				setGender(Gender.MALE);
				setBirthdate(initialDate);
				setWorkAddress(null);
				setHomeAddress(null);
			})
			.catch(e => setMessage(JSON.stringify(e.message)));
	}

	return (
		<div id={"registerUserPage"}>
			<h3>Register user</h3>
			{message !== null && <SuccessMessage message={message} closer={() => setMessage(null)} />}
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
						onChange={e => setSurname(unwrapValue(e))}
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