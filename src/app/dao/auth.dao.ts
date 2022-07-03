import {AuthDao} from "../domain/dao";
import HttpClient from "../utils/http-client";
import {Admin} from "../domain/entities/admin.entity";
import {Jwt} from "../domain/entities/jwt.entity";

export class AuthDaoImpl implements AuthDao {

	public constructor(private httpClient: HttpClient) {}

	public login(admin: Admin): Promise<void> {
		return this.httpClient.post<void>(["/login"], admin);
	}

	public token(): Promise<void> {
		return this.httpClient.get(["/token"]);
	}

	public logout(): Promise<void> {
		return this.httpClient.post(["/logout"]);
	}

}