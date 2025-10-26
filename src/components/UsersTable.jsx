import { useEffect } from "react";
import useTable from "../hooks/useTable";
import { SORT_BY } from "../services/constants";
import { formatCustomDate } from "../services/functions";

export default function UserTable() {
	const { users, getUsers, coloredRows, setColoredRows, sort, setSort } =
		useTable();

	console.log(coloredRows);

	useEffect(() => {
		getUsers(500);
	}, []);

	const handleChange = () => {
		setColoredRows(!coloredRows);
		console.log(coloredRows);
	};

	const handleSortChange = (e) => {
		const newSort = e.target.value;
		setSort(newSort);
	};

	return (
		<main>
			<input
				type="checkbox"
				id="selectColoredRows"
				onChange={handleChange}
				checked={coloredRows}
			/>
			<label for="selectColoredRows" className="text-white">
				Colorear filas
			</label>
			<span className="ml-4 mr-2 text-white">Ordenar por:</span>
			<select
				value={sort}
				onChange={handleSortChange}
				className="bg-neutral-700 text-white px-3 py-1 rounded-md outline-none cursor-pointer"
			>
				<option value={SORT_BY.NAME}>Nombre</option>
				<option value={SORT_BY.COUNTRY}>País</option>
				<option value={SORT_BY.DATE_OF_BIRTH}>Fecha de nacimiento</option>
			</select>
			<div className="overflow-x-auto rounded border border-gray-300 shadow-sm dark:border-gray-600">
				<table className="min-w-full divide-y-2 divide-gray-200 dark:divide-gray-700">
					<thead className="ltr:text-left rtl:text-right">
						<tr className="*:font-medium *:text-gray-900 dark:*:text-white">
							<th className="px-3 py-2 whitespace-nowrap">Picture</th>
							<th className="px-3 py-2 whitespace-nowrap">Name</th>
							<th className="px-3 py-2 whitespace-nowrap">Gender</th>
							<th className="px-3 py-2 whitespace-nowrap">City</th>
							<th className="px-3 py-2 whitespace-nowrap">State</th>
							<th className="px-3 py-2 whitespace-nowrap">Country</th>
							<th className="px-3 py-2 whitespace-nowrap">Email</th>
							<th className="px-3 py-2 whitespace-nowrap">Day of birth</th>
							<th className="px-3 py-2 whitespace-nowrap">Age</th>
							<th className="px-3 py-2 whitespace-nowrap">Phone</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
						{users?.map((u) => (
							<tr
								className={`*:text-gray-900 *:first:font-medium dark:*:text-white 
                  ${
										coloredRows
											? "odd:bg-gray-800 even:bg-gray-700 hover:bg-gray-600"
											: "bg-gray-800"
									}`}
								key={u.key}
							>
								<td className="px-3 py-2 whitespace-nowrap">
									<img src={u.picture} alt={u.name} />
								</td>
								<td className="px-3 py-2 whitespace-nowrap">{u.name}</td>
								<td className="px-3 py-2 whitespace-nowrap">{u.gender}</td>
								<td className="px-3 py-2 whitespace-nowrap">{u.city}</td>
								<td className="px-3 py-2 whitespace-nowrap">{u.state}</td>
								<td className="px-3 py-2 whitespace-nowrap">{u.country}</td>
								<td className="px-3 py-2 whitespace-nowrap">{u.email}</td>
								<td className="px-3 py-2 whitespace-nowrap">
									{formatCustomDate(u.dob)}
								</td>
								<td className="px-3 py-2 whitespace-nowrap">{u.age}</td>
								<td className="px-3 py-2 whitespace-nowrap">{u.phone}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</main>
	);
}
