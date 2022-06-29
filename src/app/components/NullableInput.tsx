import React from "react";
import {unwrapValue} from "../utils/event.utils";

interface NullableEventTarget extends EventTarget {
	value: string | null;
}

interface NullableChangeEvent extends Omit<React.ChangeEvent<HTMLInputElement>, "currentTarget"> {
	currentTarget: NullableEventTarget
}

interface NullableInputProps extends Omit<
	React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
	"onChange" | "value"
> {
	onChange(event: NullableChangeEvent);
	value: string | null;
}

/**
 * Component wrapper that supports a nullable value. It transforms empty strings into null.
 */
export default function NullableInput(props: NullableInputProps): JSX.Element {
	const { onChange, onBlur, value, ...rest } = props;

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
		<input {...rest} value={value ?? ""} onChange={onEventWrapper} onBlur={onEventWrapper} />
	);
}