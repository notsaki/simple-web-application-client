import React, {useEffect, useRef, useState} from "react";

export function useResetState<T>(resetTime: number): [(T | null), React.Dispatch<React.SetStateAction<T | null>>] {
	const [state, setState] = useState<T | null>(null);
	let timeout = useRef<NodeJS.Timeout>();

	useEffect(() => {
		clearTimeout(timeout.current);
		timeout.current = setTimeout(() => {
			setState(null);
		}, resetTime);
	}, [state])

	return [state, setState];
}