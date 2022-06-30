import React, {useEffect, useRef, useState} from "react";

/**
 * A wrapper state hook that resets after the specified amount of time.
 * @param resetTime the milliseconds after which the state will be reset to null.
 * @returns a usual React state.
 */
export function useResetState<T>(
	resetTime: number = 5000,
): [(T | null), React.Dispatch<React.SetStateAction<T | null>>] {
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