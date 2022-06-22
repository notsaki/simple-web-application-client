import {User, UserDto} from "./entities/user.entity";

export interface UserDao {
	save(user: UserDto): Promise<User>;
	remove(id: number): Promise<void>;
	findAll(): Promise<User[]>;
}