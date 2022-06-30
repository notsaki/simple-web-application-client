import React, {useEffect, useState} from "react";
import "./future-data.scss";
import ModalWindow from "./ModalWindow";

interface FutureDataProps<T> {
	repository(): Promise<T>;
	viewFactory(data: T, setData: (data: T) => void): JSX.Element | JSX.Element[];
	onError(error: any);
	trigger?: any;
}

/**
 * Component that handles promises and displays a loading screen until the promise is resolved or rejected.
 */
export default function FutureData<T>(props: FutureDataProps<T>): JSX.Element {
	const [data, setData] = useState<T | null>(null);
	const [error, setError] = useState<any | null>(null);

	useEffect(() => {
		// To show loading view.
		setData(null);

		props.repository()
			.then(setData)
			.catch(setError);
	}, [props.trigger]);

	if(data === null && error === null) {
		return (
			<ModalWindow>
				<div className={"loading-spinner"} />
			</ModalWindow>
		)
	}

	return (
		<>
			{data !== null ? props.viewFactory(data, setData) : props.onError(error)}
		</>
	);
}