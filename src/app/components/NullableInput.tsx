import React from "react";
import {unwrapValue} from "../utils/event.utils";

interface NullableEventTarget extends EventTarget {
	value: string | null;
}

interface NullableChangeEvent extends Omit<React.ChangeEvent<HTMLInputElement>, "currentTarget"> {
	currentTarget: NullableEventTarget
}

interface NullableInputProps
	extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	onChange(event: NullableChangeEvent);
}

export default function NullableInput(props: NullableInputProps): JSX.Element {
	const { onChange, onBlur, ...rest } = props;

	function onEventWrapper(event: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) {
		const value = unwrapValue(event);
		const newEvent: NullableChangeEvent = {
			...event,
			currentTarget: {
				...event.currentTarget,
				value: value.length > 0 ? value : null,
			},
		};

		onChange(newEvent);
	}

	return (
		<input {...rest} onChange={onEventWrapper} onBlur={onEventWrapper} />
	);
}