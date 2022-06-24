import React, {useEffect, useState} from "react";
import "./future-data.scss";
import ModalWindow from "./ModalWindow";

interface FutureDataProps<T> {
	repository(): Promise<T>;
	viewFactory(data: T): JSX.Element | JSX.Element[];
	onError(error: Error);
	trigger?: any;
}

export default function FutureData<T>(props: FutureDataProps<T>): JSX.Element {
	const [data, setData] = useState<T | null>(null);

	useEffect(() => {
		// To show loading view.
		setData(null);

		props.repository()
			.then(setData)
			.catch(props.onError);
	}, [props.trigger]);

	if(data === null) {
		return (
			<ModalWindow>
				<div className={"loading-spinner"} />
			</ModalWindow>
		)
	} else {
		return (
			<>
				{props.viewFactory(data)}
			</>
		);
	}
}