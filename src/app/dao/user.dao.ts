import {UserDao} from "../domain/dao";
import {User, UserDto, UserListItemDto} from "../domain/entities/user.entity";
import HttpClient from "../utils/http-client";

export default class UserDaoImpl implements UserDao {

	public constructor(private httpClient: HttpClient) {}

	public findAll(): Promise<UserListItemDto[]> {
		return this.httpClient.get(["/user"]);
	}

	public updateById(id: number, user: UserDto): Promise<User> {
		return this.httpClient.patch(["/user/{}", id.toString()], user);
	}

	public remove(id: number): Promise<void> {
		return this.httpClient.delete(["/user/{}", id.toString()]);
	}

	public save(user: UserDto): Promise<User> {
		return this.httpClient.post(["/user"], user);
	}

	public findById(id: number): Promise<User> {
		return this.httpClient.get(["/user/{}", id.toString()]);
	}
}