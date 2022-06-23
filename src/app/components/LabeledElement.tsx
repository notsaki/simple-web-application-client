import React from "react";
import "./labeled-element.scss";

interface LabeledElementProps extends
	React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
	label: string;
	error: string | null;
	children: JSX.Element | JSX.Element[];
}

LabeledElement.defaultProps = {
	error: null,
}

export default function LabeledElement(props: LabeledElementProps): JSX.Element {
	const { children, label, ...labelProps } = props;
	return (
		<div className={"labeled-element"}>
			<div className={"label"}>
				<label {...labelProps}>{label}</label>
				{props.error && <span className={"error"}>{props.error}</span>}
			</div>
			<div className={`input ${props.error ? "error" : ""}`}>
				{children}
			</div>
		</div>
	);
}