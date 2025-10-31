import { useContext } from "react";
import { TableContext } from "../context/TableContext";
import { arrayOfSortBy } from "../services/constants";
import type { ActiveButtonType, SortBy } from "../types";
import HeaderButton from "./HeaderButton";

export default function ColumnHeaderButtons({
	activeButton,
}: {
	activeButton: ActiveButtonType;
}) {
	const context = useContext(TableContext);

	if (!context) {
		throw new Error("TableContext must be used within a TableProvider");
	}

	const { arrayOfTexts } = context;

	return (
		<>
			{Array.from({ length: arrayOfTexts.length }, (_, index) => (
				<HeaderButton
					key={arrayOfTexts[index]}
					text={arrayOfTexts[index]}
					sort={arrayOfSortBy[index] as SortBy}
					active={activeButton === index}
				/>
			))}
		</>
	);
}
