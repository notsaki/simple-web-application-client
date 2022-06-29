import Gender from "../domain/entities/gender";

export const isName = (name: string) => name.length > 0 && name.length <= 64;
export const isGender = (gender: string | null) => gender === Gender.MALE || gender === Gender.FEMALE;
export const isPastDate = (date: Date | null) => {
	if(date === null) return false;

	const today = new Date(Date.now());

	today.setMilliseconds(0);
	today.setSeconds(0);
	today.setMinutes(0);
	today.setHours(0);

	return date.getTime() < today.getTime();
}
export const isValidAddress = (address: string | null) => address === null || address.length > 0 && address.length <= 128;