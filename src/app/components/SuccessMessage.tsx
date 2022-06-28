import React from "react";
import "./success-message.scss";
import {Close} from "@material-ui/icons";

interface SuccessMessageProps {
	message: string;
	closer: () => void;
}

export default function SuccessMessage(props: SuccessMessageProps): JSX.Element {
	return (
		<div className={"success"}>
			<span>{props.message}</span>
			<Close onClick={() => props.closer()} />
		</div>
	);
}