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
	users: Map<string, User> | null;
	coloredRows: boolean;
	changeColoredRows: () => void;
	sortUsers: (_sort: keyof typeof SORT_BY) => void;
	backToInitialState: () => void;
	deleteUser: (key: string) => void;
	sort: string;
}
