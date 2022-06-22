import {DependencyContext} from "../dependency.context";
import UserDaoImpl from "../dao/user.dao";
import HttpClient from "./http-client";
import {UserDao} from "../domain/dao";

type Profile = "impl";

export function dependencyContextFactory(profile: Profile): DependencyContext {
	let userDao: UserDao;
	if (profile === "impl") {
		const httpClient = new HttpClient();
		userDao = new UserDaoImpl(httpClient);
	} else {
		throw new Error("Invalid profile.");
	}

	return {
		daos: {
			userDao,
		}
	}
}