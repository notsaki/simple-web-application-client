import React, {useEffect, useRef, useState} from "react";
import DatePicker from "sassy-datepicker";
import useEventListener from "../hooks/useEventListener";

interface DatePickerProps {
	value: Date;
	onChange(date: Date);
}

export default function DateSelector(props: DatePickerProps): JSX.Element {
	const [selectorOpen, setSelectorOpen] = useState(false);
	const componentRef = useRef() as React.MutableRefObject<HTMLInputElement>;

	useEventListener("click", e => {
		if(!componentRef.current.contains(e.target)) setSelectorOpen(false);
	});

	useEffect(() => {
		setSelectorOpen(false);
	}, [props.value]);

	return (
		<div ref={componentRef}>
			<input value={props.value.toLocaleDateString()} readOnly={true} onClick={() => setSelectorOpen(true)} />
			{selectorOpen && <DatePicker onChange={date => props.onChange(date)} />}
		</div>
	);
}