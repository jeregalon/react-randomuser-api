import type { arrayOfTexts, ORDER, SORT_BY } from "./services/constants";

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
	sortUsersByHeaderClicking: (_sort: SortBy, _order: Order) => void;
	backToInitialState: () => void;
	changeColoredRows: () => void;
	deleteUser: (key: string) => void;
	sortedCountries: Array<string>;
	changeSelectedCountry: (option: string) => void;
	arrayOfTexts: readonly string[];
}

export interface State {
	users: Map<string, User>;
	sort: SortBy;
	order: Order;
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
	| {
			type: "SORT_USERS_BY_HEADER_CLICKING";
			payload: { sort: SortBy; order: Order };
	  }
	| { type: "SET_COLORED_ROWS"; payload: boolean }
	| { type: "SET_SELECTED_COUNTRY"; payload: string }
	| { type: "RESTORE"; payload: Map<string, User> };

export type SortBy = keyof typeof SORT_BY;

export type Order = keyof typeof ORDER;

type ArrayOfTextsIndex = Extract<keyof typeof arrayOfTexts, `${number}`>;
// Resultado: "0" | "1" | "2" | ... | "8"

export type NumericArrayOfTextsIndex =
	ArrayOfTextsIndex extends `${infer N extends number}` ? N : never;
// Resultado: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 ✅

export type ActiveButtonType = NumericArrayOfTextsIndex | false;
