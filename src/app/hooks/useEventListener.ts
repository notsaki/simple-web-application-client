import {MutableRefObject, useEffect, useRef} from "react";

export default function useEventListener(
	eventName: string,
	handler: Function,
	element: any = window,
	useCapture: boolean = false,
): void {
	const savedHandler: MutableRefObject<Function | undefined> = useRef();

	useEffect(() => {
		savedHandler.current = handler;
	}, [handler]);

	useEffect((): void | (() => void) => {
		// Check if the passed element supports event listeners.
		if (!(element && element.addEventListener)) return;

		const eventListener: EventListener = (event: any) => {
			if (savedHandler.current) {
				savedHandler.current(event);
			}
		};

		element.addEventListener(eventName, eventListener, useCapture);

		return () => {
			element.removeEventListener(eventName, eventListener);
		}
	}, [eventName, element]);
}