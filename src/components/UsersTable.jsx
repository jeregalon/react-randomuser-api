import { useEffect } from "react";
import useTable from "../hooks/useTable";
import { SORT_BY } from "../services/constants";
import { formatCustomDate } from "../services/functions";

export default function UserTable() {
	const {
		users,
		setUsers,
		getUsers,
		coloredRows,
		setColoredRows,
		sort,
		setSort,
	} = useTable();

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

	const handleDelete = (key) => {
		setUsers((prev) => {
			return prev.filter((u) => u.key !== key);
		});
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
							<th className="px-3 py-2 whitespace-nowrap">Delete</th>
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
								<td className="px-3 py-2 whitespace-nowrap">
									<button onClick={() => handleDelete(u.key)} type="button">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="size-6"
										>
											<title>Eliminar fila</title>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
											/>
										</svg>
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</main>
	);
}
