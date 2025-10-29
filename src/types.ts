import type { SORT_BY } from "./services/constants";

export interface User {
	picture: string;
	name: string;
	gender: string;
	city: string;
	state: string;
	country: string;
	email: string;
	dob: string;
	age: string;
	phone: string;
}

export type RandomUser = {
	gender: string;
	name: {
		title: string;
		first: string;
		last: string;
	};
	location: {
		city: string;
		state: string;
		country: string;
	};
	email: string;
	login: {
		uuid: string;
	};
	dob: {
		date: string;
		age: number;
	};
	phone: string;
	picture: {
		thumbnail: string;
	};
};

export type RandomUserResponse = {
	results: RandomUser[];
};

export interface TableContextType {
	state: State;
	filteredUsers: Array<[string, User]>;
	initialState: State;
	sortUsers: (_sort: SortBy) => void;
	backToInitialState: () => void;
	changeColoredRows: () => void;
	deleteUser: (key: string) => void;
	sortedCountries: Array<string>;
	changeSelectedCountry: (option: string) => void;
}

export interface State {
	users: Map<string, User>;
	sort: SortBy;
	coloredRows: boolean;
	selectedCountry: string;
	error: string | null;
	loading: boolean;
}

export type Action =
	| { type: "WAITING_FOR_API" }
	| { type: "SET_USERS"; payload: Map<string, User> }
	| { type: "DELETE_USER"; payload: string }
	| { type: "ERROR"; payload: string }
	| { type: "SORT_USERS"; payload: SortBy }
	| { type: "SET_COLORED_ROWS"; payload: boolean }
	| { type: "SET_SELECTED_COUNTRY"; payload: string }
	| { type: "RESTORE"; payload: Map<string, User> };
// | { type: "RESTORE"; payload: null };

export type SortBy = keyof typeof SORT_BY;
