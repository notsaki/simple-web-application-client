import React from "react";
import {HashRouter, Routes} from "react-router-dom";
import {Navigate, Route} from "react-router";
import HomePage from "./pages/HomePage";
import RegisterUserPage from "./pages/RegisterUserPage";
import DisplayUsersPage from "./pages/DisplayUsersPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import {useSessionStateContext} from "./user.context";
import LoginPage from "./pages/LoginPage";

export const routes = {
	root: "/",
	createUser: "/register",
	listUsers: "/users",
	userDetails: "/user",
	login: "/login",
};

export default function Router(): JSX.Element {
	const loggedIn = useSessionStateContext()[0];

	return (
		<HashRouter>
			<Routes>
				{loggedIn ? (
						<>
							<Route path={routes.root} element={<HomePage />} />
							<Route path={routes.createUser} element={<RegisterUserPage />} />
							<Route path={routes.listUsers} element={<DisplayUsersPage />} />
							<Route path={`${routes.userDetails}/:userId`} element={<UserDetailsPage />} />
							<Route path={routes.login} element={<Navigate replace to={routes.root} />} />
							<Route path={"*"} element={<Navigate replace to={routes.root} />} />
						</>
				) : (
					<>
						<Route path={routes.login} element={<LoginPage />} />
						<Route path="/*" element={<Navigate replace to={routes.login} />} />
					</>
				)}
			</Routes>
		</HashRouter>
	)
}