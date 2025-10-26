import { useEffect, useState } from "react";
import { SORT_BY } from "../services/constants";
import { getUsersFromAPI } from "../services/functions";
import type { User } from "../types";

export default function useTable() {
	const [users, setUsers] = useState<User[] | null>(null);
	const [sortedUsers, setSortedUsers] = useState<User[] | null>(null);
	const [coloredRows, setColoredRows] = useState(true);
	const [sort, setSort] = useState(SORT_BY.NAME);

	const getUsers = async (num: number) => {
		try {
			const newUsers = await getUsersFromAPI(num);
			setUsers(newUsers);
			setSortedUsers(newUsers);
		} catch (e) {
			throw new Error(e);
		}
	};

	useEffect(() => {
		if (!users) return;
		const newUsers = [...users].sort((a, b) => {
			if (sort === SORT_BY.NAME) {
				return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
			} else if (sort === SORT_BY.COUNTRY) {
				return a.country.localeCompare(b.country, undefined, {
					sensitivity: "base",
				});
			} else if (sort === SORT_BY.DATE_OF_BIRTH) {
				return new Date(a.dob).getTime() - new Date(b.dob).getTime();
			} else {
				return -1;
			}
		});
		setSortedUsers(newUsers);
	}, [users, sort]);

	return {
		users: sortedUsers,
		getUsers,
		coloredRows,
		setColoredRows,
		sort,
		setSort,
	};
}
