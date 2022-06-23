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

interface FormErrors {
	name: string | null;
	surname: string | null;
	gender: string | null;
	birthdate: string | null;
	workAddress: string | null;
	homeAddress: string | null;
}

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

	const [errors, setErrors] = useState<FormErrors>({
		name: null,
		surname: null,
		gender: null,
		birthdate: null,
		workAddress: null,
		homeAddress: null,
	});

	const [message, setMessage] = useState<string | null>("");

	const validateName = () => errorOrNull(name, isName, "Invalid name length (1-64).");
	const validateSurname = () => errorOrNull(surname, isName, "Invalid surname length (1-64)." );
	const validateGender = () => errorOrNull(gender, isGender, "Invalid value. Please select either Male or Female.");
	const validateBirthdate = () => errorOrNull(birthdate, isPastDate, "Birthdate should be in the past.");
	const validateWorkAddress = () => errorOrNull(workAddress, isValidAddress, "Invalid address length. Should be between 1-128 characters long or empty.");
	const validateHomeAddress = () => errorOrNull(homeAddress, isValidAddress, "Invalid address length. Should be between 1-128 characters long or empty.");

	const setError = (key: keyof FormErrors, value: string | null) => setErrors({ ...errors, [key]: value });

	function validateAll(): boolean {
		const errors = {
			name: validateName(),
			surname: validateSurname(),
			gender: validateGender(),
			birthdate: validateBirthdate(),
			workAddress: validateWorkAddress(),
			homeAddress: validateHomeAddress(),
		};

		setErrors(errors);

		return !Object.values(errors).find(value => value !== null);
	}

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if(!validateAll()) return;

		const user: UserDto = { name, surname, gender, birthdate, homeAddress, workAddress };
		userDao.save(user)
			.then(result => setMessage(JSON.stringify(result)))
			.catch(e => setMessage(JSON.stringify(e.message)));
	}

	useEffect(() => {
		setError("birthdate", validateBirthdate());
	}, [birthdate]);

	return (
		<div id={"registerUserPage"}>
			<h3>Register user</h3>
			{message !== null && <span>{message}</span>}
			<form onSubmit={onSubmit}>
				<LabeledElement htmlFor={"name"} label={"Name"} error={errors.name}>
					<input
						id={"name"}
						type={"text"}
						placeholder={"Name"}
						value={name}
						onChange={e => setName(unwrapValue(e))}
						onBlur={() => setError("name", validateName())}
					/>
				</LabeledElement>
				<LabeledElement htmlFor={"surname"} label={"Surname"} error={errors.surname}>
					<input
						id={"surname"}
						type={"text"}
						placeholder={"Surname"}
						value={surname}
						onChange={e => serSurname(unwrapValue(e))}
						onBlur={() => setError("surname", validateSurname())}
					/>
				</LabeledElement>
				<LabeledElement label={"Gender"} htmlFor={"gender"} error={errors.gender}>
					<DropDown
						value={gender}
						onChange={value => value && setGender(value.value)}
						options={[
							{ value: Gender.MALE, label: "Male" },
							{ value: Gender.FEMALE, label: "Female" },
						]}
						onBlur={() => setError("gender", validateGender())}
					/>
				</LabeledElement>
				<LabeledElement label={"Date of Birth"} htmlFor={"birthdate"} error={errors.birthdate}>
					<DateSelector
						value={birthdate}
						onChange={date => setBirthdate(date)}
					/>
				</LabeledElement>
				<LabeledElement label={"Work Address"} htmlFor={"workAddress"} error={errors.workAddress}>
					<NullableInput
						id={"workAddress"}
						type={"text"}
						placeholder={"Work Address"}
						value={workAddress ?? ""}
						onChange={e => setWorkAddress(unwrapValue(e))}
						onBlur={() => setError("workAddress", validateWorkAddress())}
					/>
				</LabeledElement>
				<LabeledElement label={"Home Address"} htmlFor={"homeAddress"} error={errors.homeAddress}>
					<NullableInput
						id={"homeAddress"}
						type={"text"}
						placeholder={"Home Address"}
						value={homeAddress ?? ""}
						onChange={e => setHomeAddress(unwrapValue(e))}
						onBlur={() => setError("homeAddress", validateHomeAddress())}
					/>
				</LabeledElement>
				<div id={"registerActions"}>
					<FormButton type={"submit"} value={"Submit"} />
				</div>
			</form>
		</div>
	);
}