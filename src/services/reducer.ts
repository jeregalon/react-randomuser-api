import type { Action, State } from "../types";

export const reducer = (state: State, action: Action) => {
	const { type: actionType } = action;
	switch (actionType) {
		case "WAITING_FOR_API": {
			return {
				...state,
				error: null,
				loading: true,
			};
		}
		case "SET_USERS": {
			return {
				...state,
				users: action.payload,
				error: null,
				loading: false,
			};
		}
		case "ERROR": {
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		}
		case "DELETE_USER": {
			const newUsers = new Map(state.users);
			newUsers.delete(action.payload);
			return {
				...state,
				users: newUsers,
			};
		}
		case "SORT_USERS": {
			return {
				...state,
				sort: action.payload,
			};
		}
		case "SET_COLORED_ROWS": {
			return {
				...state,
				coloredRows: action.payload,
			};
		}
		case "SET_SELECTED_COUNTRY": {
			return {
				...state,
				selectedCountry: action.payload,
			};
		}
		case "RESTORE": {
			return {
				...state,
				users: action.payload,
			};
		}
	}
};
