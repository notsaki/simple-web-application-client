import React, {useEffect, useState} from "react";

interface FutureDataProps<T> {
	repository(): Promise<T>;
	viewFactory(data: T): JSX.Element | JSX.Element[];
	onError(error: Error);
	trigger?: any;
}

export default function FutureData<T>(props: FutureDataProps<T>): JSX.Element {
	const [data, setData] = useState<T | null>(null);

	useEffect(() => {
		props.repository()
			.then(setData)
			.catch(props.onError);
	}, [props.trigger]);

	if(data === null) {
		return (
			<span>Loading...</span>
		)
	} else {
		return (
			<>
				{props.viewFactory(data)}
			</>
		);
	}
}