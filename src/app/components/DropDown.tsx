import React from "react";
import Select, {SingleValue} from "react-select";
import "./dropdown.scss";

type DropDownOption<T> = { value: T, label: string | number | symbol };

interface DropDownProps<T> {
	value: T;
	options: DropDownOption<T>[];
	onChange?(value: SingleValue<DropDownOption<T>>);
	onBlur?(event: React.FocusEvent<HTMLInputElement>);
}

export default function DropDown<T>(props: DropDownProps<T>): JSX.Element {
	return (
		<Select
			className={"dropdown"}
			classNamePrefix={"dropdown"}
			defaultValue={props.options.find(option => option.value === props.value)}
			onChange={props.onChange}
			options={props.options}
			onBlur={props.onBlur}
		/>
	);
}