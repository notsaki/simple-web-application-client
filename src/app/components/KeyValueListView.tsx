import React from "react";
import "./key-value-list-view.scss";

interface KeyValueListViewProps {
	items: object;
}

export default function KeyValueListView(props: KeyValueListViewProps): JSX.Element {
	return (
		<table id={"keyValueListView"}>
			<tbody>
				{Object.keys(props.items).map(key => (
					<tr>
						<th>{key}</th>
						<td>{props.items[key]}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}