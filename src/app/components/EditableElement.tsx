import React from "react";

interface EditableElementProps {
	editMode: boolean;
	readView: JSX.Element | JSX.Element[] | string | number | symbol;
	editView: JSX.Element | JSX.Element[] | string | number | symbol;
}

export default function EditableElement(props: EditableElementProps): JSX.Element {
	return (
		<>
			{props.editMode ? props.editView : props.readView}
		</>
	);
}