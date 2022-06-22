import React from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import {Route} from "react-router";
import HomePage from "./pages/HomePage";
import RegisterUserPage from "./pages/RegisterUserPage";
import DisplayUsersPage from "./pages/DisplayUsersPage";
import NotFoundPage from "./pages/NotFoundPage";
import UserDetailsPage from "./pages/UserDetailsPage";

export default function Router(): JSX.Element {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={"/"} element={<HomePage />} />
				<Route path={"/register"} element={<RegisterUserPage />} />
				<Route path={"/users"} element={<DisplayUsersPage />} />
				<Route path={"user/:userId"} element={<UserDetailsPage />} />
				<Route path={"*"} element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	)
}