import Gender from "./gender";

export interface User {
	id: number;
	name: string;
	surname: string;
	gender: Gender;
	birthdate: Date;
	workAddress: string | null;
	homeAddress: string | null;
}

export interface UserDto extends Omit<User, "id"> {}

export interface UserListItemDto extends Omit<User, "gender" | "birthdate" | "workAddress" | "homeAddress"> {}
