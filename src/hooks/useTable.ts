import { useState } from "react";
import { SORT_BY } from "../services/constants";
import { getUsersFromAPI } from "../services/functions";
import type { User } from "../types";

export default function useTable() {
	const [users, setUsers] = useState<Map<string, User> | null>(null);
	const [coloredRows, setColoredRows] = useState(true);
	const [sort, setSort] = useState(SORT_BY.NONE);
	const [initialState, setInitialState] = useState<Map<string, User> | null>(
		null,
	);

	const getUsers = async (num: number) => {
		try {
			const newUsers = await getUsersFromAPI(num);
			setUsers(newUsers);
			setInitialState(newUsers);
		} catch (err) {
			if (err instanceof Error) {
				throw new Error(err.message);
			}
			throw new Error(String(err));
		}
	};

	const sortUsers = (_sort: keyof typeof SORT_BY) => {
		if (!users || _sort === SORT_BY.NONE) return;
		const usersArray = Array.from(users);
		const newUsersArray = [...usersArray].sort((a, b) => {
			if (_sort === SORT_BY.NAME) {
				return a[1].name.localeCompare(b[1].name, undefined, {
					sensitivity: "base",
				});
			} else if (_sort === SORT_BY.COUNTRY) {
				return a[1].country.localeCompare(b[1].country, undefined, {
					sensitivity: "base",
				});
			} else if (_sort === SORT_BY.DATE_OF_BIRTH) {
				return new Date(a[1].dob).getTime() - new Date(b[1].dob).getTime();
			} else {
				return -1;
			}
		});
		const newUsers = new Map(newUsersArray);
		setUsers(newUsers);
		setSort(_sort);
	};

	const changeColoredRows = () => {
		setColoredRows(!coloredRows);
	};

	const deleteUser = (key: string) => {
		setUsers((prev) => {
			const newUsers = new Map(prev);
			newUsers.delete(key);
			return newUsers;
		});
	};

	const backToInitialState = () => {
		setSort(SORT_BY.NONE);
		setUsers(initialState);
	};

	return {
		users,
		getUsers,
		sortUsers,
		backToInitialState,
		coloredRows,
		changeColoredRows,
		deleteUser,
		sort,
	};
}
