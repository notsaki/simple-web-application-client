import React from "react";
import "./api-message.scss";
import {useApiMessage} from "../api-message.context";
import {Close} from "@material-ui/icons";

interface ApiMessageProps {
	messages: string[];
}

export default function ApiMessage(props: ApiMessageProps): JSX.Element {
	const setApiMessage = useApiMessage();

	return (
		<div id={"apiMessages"}>
			{props.messages.map((message, i) => (
				<div key={i} className={"message"}>
					<span>{message}</span>
					<Close onClick={() => setApiMessage(props.messages.filter((_, j) => i !== j))} />
				</div>
			))}
		</div>
	);
}