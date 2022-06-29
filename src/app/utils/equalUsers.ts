import {User} from "../domain/entities/user.entity";

export function equalUsers(user1: User, user2: User) {
	return user1.name === user2.name &&
		user1.surname === user2.surname &&
		user1.gender === user2.gender &&
		user1.birthdate === user2.birthdate &&
		user1.workAddress === user2.workAddress &&
		user1.homeAddress === user2.homeAddress;
}