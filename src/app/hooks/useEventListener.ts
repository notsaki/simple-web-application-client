import {MutableRefObject, useEffect, useRef} from "react";

/**
 * Event listener hook. Attaches an event listener on mount and cleans-up on unmount. The event listener does not get
 * unregistered on re-render.
 * @param eventName Event name (e.g. click).
 * @param handler The event handler.
 * @param element The target element to attach the listener.
 * @param useCapture if the event will be dispatched on capture or bubbling phase. On capture phase, the top nodes are
 * being dispatched first while on bubbling phase it's the opposite. The default value is false meaning the event is
 * being dispatched on bubbling phase.
 */
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