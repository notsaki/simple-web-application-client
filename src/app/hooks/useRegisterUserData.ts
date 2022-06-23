import {useState} from "react";
import Gender from "../domain/entities/gender";

interface FormData {
	name: string;
	surname: string;
	gender: Gender;
	birthdate: Date;
	workAddress: string | null;
	homeAddress: string | null;
}

export function useRegisterUserData() {
	const [data, setData] = useState<FormData>({
		name: "",
		surname: "",
		gender: Gender.MALE,
		birthdate: new Date(Date.now()),
		workAddress: null,
		homeAddress: null,
	});

	return {
		data,
		setName: (name: string) => setData({ ...data, name }),
		setSurname: (surname: string) => setData({ ...data, surname }),
		setGender: (gender: Gender) => setData({ ...data, gender }),
		setBirthdate: (birthdate: Date) => setData({ ...data, birthdate }),
		setWorkAddress: (workAddress: string | null) => setData({ ...data, workAddress }),
		setHomeAddress: (homeAddress: string | null) => setData({ ...data, homeAddress }),
	}
}