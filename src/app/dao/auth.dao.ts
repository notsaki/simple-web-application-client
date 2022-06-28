import {AuthDao} from "../domain/dao";
import HttpClient from "../utils/http-client";
import {Admin} from "../domain/entities/admin.entity";
import {Jwt, RefreshJwt} from "../domain/entities/jwt.entity";

export class AuthDaoImpl implements AuthDao {

	public constructor(private httpClient: HttpClient) {}

	login(admin: Admin): Promise<Jwt> {
		return this.httpClient.post<Jwt>(["/login"], admin);
	}

	refresh(refreshToken: RefreshJwt): Promise<Jwt> {
		return this.httpClient.post(["/token"], refreshToken);
	}

}