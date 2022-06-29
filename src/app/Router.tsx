import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import {Navigate, Route} from "react-router";
import HomePage from "./pages/HomePage";
import RegisterUserPage from "./pages/RegisterUserPage";
import DisplayUsersPage from "./pages/DisplayUsersPage";
import NotFoundPage from "./pages/NotFoundPage";
import UserDetailsPage from "./pages/UserDetailsPage";
import {useAuthContext} from "./user.context";
import LoginPage from "./pages/LoginPage";

export const routes = {
	home: "/",
	createUser: "/register",
	listUsers: "/users",
	userDetails: "/user",
};

export default function Router(): JSX.Element {
	const { token } = useAuthContext();

	return (
		<BrowserRouter>
			<Routes>
				{token ? (
						<>
							<Route path={routes.home} element={<HomePage />} />
							<Route path={routes.createUser} element={<RegisterUserPage />} />
							<Route path={routes.listUsers} element={<DisplayUsersPage />} />
							<Route path={`${routes.userDetails}/:userId`} element={<UserDetailsPage />} />
							<Route path={"/login"} element={<Navigate replace to={"/"} />} />
							<Route path={"*"} element={<Navigate replace to={"/"} />} />
						</>
				) : (
					<>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/*" element={<Navigate replace to={"/login"} />} />
					</>
				)}
			</Routes>
		</BrowserRouter>
	)
}