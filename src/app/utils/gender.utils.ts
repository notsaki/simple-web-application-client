import Gender from "../domain/entities/gender";

export function genderToString(gender: Gender): string {
	const genderMap = {
		[Gender.MALE]: "Male",
		[Gender.FEMALE]: "Female",
	};

	return genderMap[gender];
}