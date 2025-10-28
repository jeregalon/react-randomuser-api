import { useContext } from "react";
import { TableContext } from "../context/TableContext";
import { SORT_BY } from "../services/constants";

export default function Header() {
	const {
		coloredRows,
		changeColoredRows,
		sortUsers,
		backToInitialState,
		sort,
	} = useContext(TableContext);

	const handleChange = () => {
		changeColoredRows();
	};

	const handleSortChange = (e) => {
		const newSort = e.target.value;
		sortUsers(newSort);
	};

	const handleRestore = () => {
		backToInitialState();
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
		</main>
	);
}
