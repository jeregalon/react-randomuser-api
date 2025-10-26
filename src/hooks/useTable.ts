import { useState } from "react";
import { getUsersFromAPI } from "../services/functions";

export default function useTable() {
	const [users, setUsers] = useState();
	const [coloredRows, setColoredRows] = useState(true);

	const getUsers = async (num: number) => {
		try {
			const newUsers = await getUsersFromAPI(num);
			setUsers(newUsers);
		} catch (e) {
			throw new Error(e);
		}
	};

	return { users, getUsers, coloredRows, setColoredRows };
}
