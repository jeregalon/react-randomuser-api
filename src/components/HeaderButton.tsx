import { useContext } from "react";
import { TableContext } from "../context/TableContext";
import { ORDER } from "../services/constants";
import type { Order, SortBy } from "../types";

export default function HeaderButton({
	sort,
	text,
	active,
}: {
	sort: SortBy;
	text: string;
	active: boolean;
}) {
	const context = useContext(TableContext);

	if (!context) {
		throw new Error("TableContext must be used within a TableProvider");
	}

	const { state, sortUsersByHeaderClicking } = context;

	const handleClick = () => {
		let order = ORDER.NONE;

		if (state.order === ORDER.NONE || state.order === ORDER.DESC || !active)
			order = ORDER.ASC;
		else order = ORDER.DESC;

		sortUsersByHeaderClicking(sort, order as Order);
	};

	return (
		<button className="cursor-pointer" type="button" onClick={handleClick}>
			{`${text} `} {active && state.order === ORDER.ASC && "▼"}{" "}
			{active && state.order === ORDER.DESC && "▲"}
		</button>
	);
}
