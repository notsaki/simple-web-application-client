import {SyntheticEvent} from "react";

export function unwrapValue(event: SyntheticEvent<any>) {
	return event.currentTarget.value;
}