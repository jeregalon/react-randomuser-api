import { useContext, useState } from "react";
import { getScrollbarSize, List } from "react-window";
import { TableContext } from "../context/TableContext";
import { TABLE_GRID } from "../services/constants";
import UserRow from "./UserRow";

export default function UsersTable() {
	const context = useContext(TableContext);

	if (!context) {
		throw new Error("TableContext must be used within a TableProvider");
	}

	const { filteredUsers, deleteUser } = context;

	const [scrollbarWidth] = useState(() => getScrollbarSize());

	const handleDelete = (userKey: string) => {
		deleteUser(userKey);
	};

	return (
		<div className="h-500 flex flex-col">
			<div className="bg-teal-600">
				<div
					className={`grid ${TABLE_GRID} p-1 px-2 font-bold`}
					style={{ paddingRight: scrollbarWidth }}
				>
					<div>Picture</div>
					<div>Name</div>
					<div>Gender</div>
					<div>City</div>
					<div>State</div>
					<div>Country</div>
					<div>Email</div>
					<div>Day of birth</div>
					<div>Age</div>
					<div>Phone</div>
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
			</div>
		</div>
	);
}
