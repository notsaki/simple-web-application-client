import Gender from "./gender";

export interface User {
	id: number;
	name: string;
	surname: string;
	gender: Gender;
	dateOfBirth: Date;
	workAddress: string;
	homeAddress: string;
}

export interface UserDto extends Omit<User, "id"> {}
