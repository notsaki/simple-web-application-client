import React, {useEffect, useState} from "react";
import "./labeled-element.scss";
import {emit} from "process";

interface LabeledElementProps<T> extends
	React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
	label: string;
	error: string | null;
	value: T;
	children: JSX.Element | JSX.Element[];
	validator?(value: T): boolean;
	onValidation?(isValid: boolean);
	emitOn: "blur" | "change";
}

LabeledElement.defaultProps = {
	error: null,
	emitOn: "blur",
};

/**
 * Component that accepts a label and a validator. It displays the specified error if the validator returns false. The
 * validator can be executed either on input change or the blur event.
 */
export default function LabeledElement<T>(props: LabeledElementProps<T>): JSX.Element {
	const [error, setError] = useState<string | null>(null);
	const { children, label, onValidation, validator, value, emitOn, ...labelProps } = props;

	const isValid = !validator ? true : validator(value);

	function validate() {
		// We don't show the error if value doesn't exist because the user may have not yet filled the field.
		setError(isValid || !value ? null : props.error);
	}

	useEffect(() => {
		// However, we emit invalid on the onValidation because in reality it isn't.
		onValidation && onValidation(isValid);
		if(emitOn === "change") validate();
	}, [value]);

	const emitOnBlurProps = emitOn === "blur" ? { onBlur: () => validate() } : {};

	return (
		<div {...emitOnBlurProps} className={"labeled-element"}>
			<div className={"label"}>
				<label {...labelProps}>{label}</label>
				{error && <span className={"error"}>{error}</span>}
			</div>
			<div className={`input ${error ? "error" : ""}`}>
				{children}
			</div>
		</div>
	);
}