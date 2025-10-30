import { useMemo, useReducer, useState } from "react";
import {
	countryFilterInitialValue,
	ORDER,
	SORT_BY,
} from "../services/constants";
import { getUsersFromAPI } from "../services/functions";
import { reducer } from "../services/reducer";
import type { Order, SortBy, State, User } from "../types";

export default function useTable() {
	const [initialState, setInitialState] = useState<State>({
		users: new Map<string, User>(),
		sort: SORT_BY.NONE as SortBy,
		order: ORDER.NONE as Order,
		coloredRows: true,
		selectedCountry: countryFilterInitialValue,
		error: null,
		loading: false,
	});

	const [state, dispatch] = useReducer(reducer, initialState);

	const usersArray = useMemo(() => {
		if (!state.users) return [];
		return Array.from(state.users);
	}, [state.users]);

	const setOfCountries = useMemo(() => {
		const countries: Set<string> = new Set();
		state.users?.forEach((user) => {
			countries.add(user.country);
		});
		return countries;
	}, [state.users]);

	const sortedCountries = useMemo(() => {
		return [...setOfCountries].sort();
	}, [setOfCountries]);

	const sortedUsers = useMemo(() => {
		return state.sort === SORT_BY.NONE
			? usersArray
			: [...usersArray].sort((a, b) => {
					if (state.sort === SORT_BY.NAME) {
						return a[1].name.localeCompare(b[1].name, undefined, {
							sensitivity: "base",
						});
					} else if (state.sort === SORT_BY.COUNTRY) {
						return a[1].country.localeCompare(b[1].country, undefined, {
							sensitivity: "base",
						});
					} else if (state.sort === SORT_BY.DATE_OF_BIRTH) {
						return new Date(a[1].dob).getTime() - new Date(b[1].dob).getTime();
					} else {
						return 0;
					}
				});
	}, [state.sort, usersArray]);

	const filteredUsers = useMemo(() => {
		return state.selectedCountry === countryFilterInitialValue
			? sortedUsers
			: sortedUsers.filter((u) => u[1].country === state.selectedCountry);
	}, [state.selectedCountry, sortedUsers]);

	const changeSelectedCountry = (option: string) => {
		dispatch({ type: "SET_SELECTED_COUNTRY", payload: option });
	};

	const getUsers = async (num: number) => {
		try {
			dispatch({ type: "WAITING_FOR_API" });
			const newUsers = await getUsersFromAPI(num);
			setInitialState((prev) => ({
				...prev,
				users: newUsers,
			}));
			dispatch({ type: "SET_USERS", payload: newUsers });
		} catch (err) {
			if (err instanceof Error) {
				dispatch({ type: "ERROR", payload: err.message });
			}
			dispatch({ type: "ERROR", payload: String(err) });
		}
	};

	const sortUsers = (_sort: SortBy) => {
		dispatch({ type: "SORT_USERS", payload: _sort });
	};

	const sortUsersByHeaderClicking = (_sort: SortBy, _order: Order) => {
		console.log(`${_sort} ${_order}`);
		dispatch({
			type: "SORT_USERS_BY_HEADER_CLICKING",
			payload: { sort: _sort, order: _order },
		});
	};

	const changeColoredRows = () => {
		dispatch({ type: "SET_COLORED_ROWS", payload: !state.coloredRows });
	};

	const deleteUser = (key: string) => {
		dispatch({ type: "DELETE_USER", payload: key });
	};

	const backToInitialState = () => {
		dispatch({ type: "RESTORE", payload: initialState.users });
	};

	return {
		state,
		filteredUsers,
		initialState,
		getUsers,
		sortUsers,
		sortUsersByHeaderClicking,
		backToInitialState,
		changeColoredRows,
		deleteUser,
		sortedCountries,
		changeSelectedCountry,
	};
}
