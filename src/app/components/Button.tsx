import React from "react";
import "./button.scss";

interface FormButtonProps
	extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export default function Button(props: FormButtonProps): JSX.Element {
	const { className, children, ...rest } = props;
	return (
		<button {...rest} className={`${className} button`}>
			{children}
		</button>
	);
}