import {User, UserDto, UserListItemDto} from "./entities/user.entity";
import {Admin} from "./entities/admin.entity";
import {Jwt, RefreshJwt} from "./entities/jwt.entity";

export interface UserDao {
	save(user: UserDto): Promise<User>;
	remove(id: number): Promise<void>;
	findAll(): Promise<UserListItemDto[]>;
	findById(id: number): Promise<User>;
}

export interface AuthDao {
	login(admin: Admin): Promise<Jwt>;
	refresh(refreshToken: RefreshJwt): Promise<Jwt>;
}