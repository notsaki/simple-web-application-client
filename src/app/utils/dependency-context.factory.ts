import {DependencyContext} from "../dependency.context";
import UserDaoImpl from "../dao/user.dao";
import HttpClient from "./http-client";
import {AuthDao, UserDao} from "../domain/dao";
import {AuthDaoImpl} from "../dao/auth.dao";

type Profile = "impl";

export function dependencyContextFactory(profile: Profile): DependencyContext {
	let userDao: UserDao;
	let authDao: AuthDao;

	if (profile === "impl") {
		const httpClient = new HttpClient();
		userDao = new UserDaoImpl(httpClient);
		authDao = new AuthDaoImpl(httpClient);
	} else {
		throw new Error("Invalid profile.");
	}

	return {
		daos: {
			userDao,
			authDao,
		}
	}
}