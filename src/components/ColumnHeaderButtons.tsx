import { useContext } from "react";
import { TableContext } from "../context/TableContext";
import { SORT_BY } from "../services/constants";
import type {
	ActiveButtonType,
	NumericArrayOfTextsIndex,
	SortBy,
} from "../types";
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

	const arrayOfSortBy = [
		SORT_BY.NAME,
		SORT_BY.GENDER,
		SORT_BY.CITY,
		SORT_BY.STATE,
		SORT_BY.COUNTRY,
		SORT_BY.EMAIL,
		SORT_BY.DATE_OF_BIRTH,
		SORT_BY.AGE,
		SORT_BY.PHONE,
	];

	return (
		<>
			{Array.from({ length: arrayOfTexts.length }, (_, index) => (
				<HeaderButton
					key={arrayOfTexts[index]}
					text={arrayOfTexts[index]}
					sort={arrayOfSortBy[index] as SortBy}
					index={index as NumericArrayOfTextsIndex}
					active={activeButton === index}
				/>
			))}
		</>
	);
}
