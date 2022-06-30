import React from "react";
import "./success-message.scss";
import {Close} from "@material-ui/icons";

interface SuccessMessageProps {
	message: string;
	closer: () => void;
}

export default function SuccessMessage(props: SuccessMessageProps): JSX.Element {
	return (
		<div className={"success-wrapper"}>
			<div className={"success"}>
				<span className={"success-message"}>{props.message}</span>
				<Close onClick={() => props.closer()} />
			</div>
		</div>
	);
}