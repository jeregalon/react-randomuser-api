import { useContext } from "react";
import { TableContext } from "../context/TableContext";
import {
	COUNTRY_CODES,
	countryFilterInitialValue,
	SORT_BY,
} from "../services/constants";
import { countryCodeToFlagEmoji } from "../services/functions";

export default function Header() {
	const context = useContext(TableContext);

	if (!context) {
		throw new Error("TableContext must be used within a TableProvider");
	}

	const {
		coloredRows,
		changeColoredRows,
		sortUsers,
		backToInitialState,
		sort,
		sortedCountries,
		selectedCountry,
		changeSelectedCountry,
	} = context;

	const handleChange = () => {
		changeColoredRows();
	};

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newSort = e.target.value as keyof typeof SORT_BY;
		sortUsers(newSort);
	};

	const handleRestore = () => {
		backToInitialState();
	};

	const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newSelectedCountry = e.target.value;
		changeSelectedCountry(newSelectedCountry);
	};

	return (
		<main>
			<input
				type="checkbox"
				id="selectColoredRows"
				onChange={handleChange}
				checked={coloredRows}
			/>
			<label htmlFor="selectColoredRows" className="text-white">
				Colorear filas
			</label>
			<span className="ml-4 mr-2 text-white">Ordenar por:</span>
			<select
				value={sort}
				onChange={handleSortChange}
				className="bg-neutral-700 text-white px-3 py-1 rounded-md outline-none cursor-pointer"
			>
				<option value={SORT_BY.NONE}>Sin orden</option>
				<option value={SORT_BY.NAME}>Nombre</option>
				<option value={SORT_BY.COUNTRY}>País</option>
				<option value={SORT_BY.DATE_OF_BIRTH}>Fecha de nacimiento</option>
			</select>
			<button
				className="rounded-lg cursor-pointer bg-blue-500 text-white ml-4"
				onClick={handleRestore}
				type="button"
			>
				Restaurar
			</button>
			<span className="ml-4 mr-2 text-white">Filtrar por país:</span>
			<select
				value={selectedCountry}
				onChange={handleFilter}
				className="bg-neutral-700 text-white px-3 py-1 rounded-md outline-none cursor-pointer"
			>
				<option
					value={countryFilterInitialValue}
				>{`❌ ${countryFilterInitialValue}`}</option>
				{sortedCountries.map((country) => (
					<option key={country} value={country}>
						{`${countryCodeToFlagEmoji(COUNTRY_CODES[country])} ${country}`}
					</option>
				))}
			</select>
		</main>
	);
}
