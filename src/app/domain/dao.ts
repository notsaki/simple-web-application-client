import {User, UserDto, UserListItemDto} from "./entities/user.entity";

export interface UserDao {
	save(user: UserDto): Promise<User>;
	remove(id: number): Promise<void>;
	findAll(): Promise<UserListItemDto[]>;
	findById(id: number): Promise<User>;
}