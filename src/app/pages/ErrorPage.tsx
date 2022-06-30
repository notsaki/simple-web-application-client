import React from "react";
import "./error-message.scss";
import {errorHandler} from "../utils/error-handler";

interface ErrorPageProps {
	error: any;
	overrides?: { [key: number]: string };
}

export default function ErrorPage(props: ErrorPageProps): JSX.Element {
	return (
		<div id={"errorMessage"}>
			<h3>Error: {errorHandler(props.error, props.overrides)}</h3>
			<h3>Status: {props.error.response.status}</h3>
		</div>
	);
}