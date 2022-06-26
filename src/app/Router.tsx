import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import {Route} from "react-router";
import HomePage from "./pages/HomePage";
import RegisterUserPage from "./pages/RegisterUserPage";
import DisplayUsersPage from "./pages/DisplayUsersPage";
import NotFoundPage from "./pages/NotFoundPage";
import UserDetailsPage from "./pages/UserDetailsPage";

export const routes = {
	home: "/",
	createUser: "/register",
	listUsers: "/users",
	userDetails: "/user",
};

export default function Router(): JSX.Element {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={routes.home} element={<HomePage />} />
				<Route path={routes.createUser} element={<RegisterUserPage />} />
				<Route path={routes.listUsers} element={<DisplayUsersPage />} />
				<Route path={`${routes.userDetails}/:userId`} element={<UserDetailsPage />} />
				<Route path={"*"} element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	)
}