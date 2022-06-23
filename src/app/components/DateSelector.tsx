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

	useEventListener("click", e => {
		if(!dateSelectorRef.current || !dateSelectorRef.current.contains(e.target)) setSelectorOpen(false);
	});

	useEffect(() => {
		setSelectorOpen(false);
	}, [props.value]);

	return (
		<div className={"date-picker"} ref={dateSelectorRef}>
			<input
				value={props.value.toLocaleDateString()}
				readOnly={true}
				onClick={() => setSelectorOpen(!selectorOpen)}
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