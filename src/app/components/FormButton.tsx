import React from "react";
import "./button.scss";

interface FormButtonProps
	extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export default function FormButton(props: FormButtonProps): JSX.Element {
	const { className, ...rest } = props;
	return (
		<input {...rest} className={`${className} button`} />
	);
}