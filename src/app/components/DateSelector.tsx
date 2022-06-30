import React, {useEffect, useRef, useState} from "react";
import DatePicker from "sassy-datepicker";
import useEventListener from "../hooks/useEventListener";
import "./date-selector.scss";

interface DatePickerProps {
	value: Date;
	onChange?(date: Date);
}

export default function DateSelector(props: DatePickerProps): JSX.Element {
	const [selectorOpen, setSelectorOpen] = useState(false);
	const dateSelectorRef = useRef() as React.MutableRefObject<HTMLDivElement>;
	const [dateString, setDateString] = useState(props.value.toLocaleDateString());

	/**
	 * Parser interceptor on change event to format the date with /. If the value becomes a valid date it calls the
	 * onChange() callback of the component.
	 */
	function onManualType(event) {
		if(!props.onChange) return;
		let value: string = event.currentTarget.value;

		if(/^\d\d$/.test(value) || /^\d\d\/\d\d$/.test(value)) {
			if(value.length > dateString.length) value += "/";
			else if(value.length < dateString.length) value = value.substring(0, value.length - 1);
		}

		if(/\d\d\/\d\d\/\d\d\d\d/.test(value)) {
			const [day, month, year] = value.split("/");
			props.onChange(new Date(parseInt(year), parseInt(month) - 1, parseInt(day)));
		}

		setDateString(value);
	}

	/**
	 * Interceptor for blur event. If a valid date is given it calls the onChange() callback. Otherwise, it resets the
	 * input string to the state's value.
	 */
	function onManualBlur(event) {
		if(!props.onChange) return;
		let value: string = event.currentTarget.value;

		if(value.match("\d\d\d\d-\d\d-\d\d")) props.onChange(new Date(Date.parse(value)));
		else setDateString(props.value.toLocaleDateString());
	}

	useEventListener("click", e => {
		if(!dateSelectorRef.current || !dateSelectorRef.current.contains(e.target)) setSelectorOpen(false);
	});

	useEffect(() => {
		setSelectorOpen(false);
	}, [props.value]);

	return (
		<div className={"date-picker"} ref={dateSelectorRef}>
			<input
				value={dateString}
				onClick={() => setSelectorOpen(!selectorOpen)}
				onChange={onManualType}
				onBlur={onManualBlur}
			/>
			{selectorOpen && (
				<DatePicker
					onChange={date => props.onChange && props.onChange(date)}
					selected={props.value}
				/>
			)}
		</div>
	);
}