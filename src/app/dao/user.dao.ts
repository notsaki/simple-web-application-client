import {UserDao} from "../domain/dao";
import {User, UserDto} from "../domain/entities/user.entity";
import HttpClient from "../utils/http-client";

export default class UserDaoImpl implements UserDao {

	public constructor(private httpClient: HttpClient) {}

	public findAll(): Promise<User[]> {
		return this.httpClient.get(["/user"]);
	}

	public remove(id: number): Promise<void> {
		return this.httpClient.delete(["/user/{}", id.toString()]);
	}

	public save(user: UserDto): Promise<User> {
		return this.httpClient.post(["/user"], user);
	}
}