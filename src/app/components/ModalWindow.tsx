import React, {useEffect, useRef} from "react";
import ReactDOM from "react-dom";
import "./modal-window.scss";

interface ModalWindowProps {
	children: JSX.Element | JSX.Element[];
}

/**
 * Modal window that fills the entire screen with a div element and displays the specified element. The modal is being
 * displayed alongside the app's root element.
 */
export default function ModalWindow(props: ModalWindowProps): JSX.Element {
	const modalWindow = document.createElement("div");
	const modalRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const modalRoot = document.getElementById("modalWindow");
		if(modalRoot === null) throw new Error("Root element for modal window not found.");
		modalRoot.append(modalWindow);

		return () => {
			modalRoot.removeChild(modalWindow);
		};
	}, []);

	return ReactDOM.createPortal(
		<div ref={modalRef} className={"modal-window"}>
			{props.children}
		</div>,
		modalWindow,
	);
}