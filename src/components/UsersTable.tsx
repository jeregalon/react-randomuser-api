import { useContext, useState } from "react";
import { getScrollbarSize, List } from "react-window";
import { TableContext } from "../context/TableContext";
import { SORT_BY, TABLE_GRID } from "../services/constants";
import ColumnHeaderButtons from "./ColumnHeaderButtons";
import UserRow from "./UserRow";

export default function UsersTable() {
	const context = useContext(TableContext);

	if (!context) {
		throw new Error("TableContext must be used within a TableProvider");
	}

	const { state, filteredUsers, deleteUser } = context;

	const [scrollbarWidth] = useState(() => getScrollbarSize());

	const handleDelete = (userKey: string) => {
		deleteUser(userKey);
	};

	const activeButton = () => {
		if (state.sort === SORT_BY.NAME) return 0;
		else if (state.sort === SORT_BY.GENDER) return 1;
		else if (state.sort === SORT_BY.CITY) return 2;
		else if (state.sort === SORT_BY.STATE) return 3;
		else if (state.sort === SORT_BY.COUNTRY) return 4;
		else if (state.sort === SORT_BY.EMAIL) return 5;
		else if (state.sort === SORT_BY.DATE_OF_BIRTH) return 6;
		else if (state.sort === SORT_BY.AGE) return 7;
		else if (state.sort === SORT_BY.PHONE) return 8;
		else return false;
	};

	return (
		<div className="h-500 flex flex-col">
			<div className="bg-teal-600">
				<div
					className={`grid ${TABLE_GRID} p-1 px-2 font-bold`}
					style={{ paddingRight: scrollbarWidth }}
				>
					<div>Picture</div>
					<ColumnHeaderButtons activeButton={activeButton()} />
					<div className="w-10">Delete</div>
				</div>
			</div>
			<div className="overflow-hidden">
				{filteredUsers && (
					<List
						rowComponent={UserRow}
						rowCount={filteredUsers.length}
						rowHeight={75}
						rowProps={{ filteredUsers, handleDelete }}
					/>
				)}
				{state.error && (
					<div className="flex flex-col items-center w-full">
						<h1 className="text-red-500">Error cargando los datos</h1>
						<h2 className="text-red-500">{state.error}</h2>
					</div>
				)}
				{state.loading && (
					<div className="flex flex-col items-center w-full">
						<h1 className="text-white">Cargando...</h1>
					</div>
				)}
			</div>
		</div>
	);
}
