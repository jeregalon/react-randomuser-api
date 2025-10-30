import CountryCodes from "../mocks/CountryCodes.json";

export const RANDOM_USERS_LINK = "https://randomuser.me/api/?results=";

export const SORT_BY = {
	NONE: "none",
	NAME: "Name",
	GENDER: "Gender",
	CITY: "City",
	STATE: "State",
	COUNTRY: "Country",
	EMAIL: "Email",
	DATE_OF_BIRTH: "Day Of Birth",
	AGE: "Age",
	PHONE: "Phone",
};

export const ORDER = {
	NONE: "none",
	ASC: "asc",
	DESC: "desc",
};

export const NUMBER_OF_ROWS = 200;

export const TABLE_GRID =
	"grid-cols-[80px_1.2fr_0.8fr_1fr_1fr_1fr_2.5fr_1fr_0.3fr_1fr_40px]";

export const COUNTRY_CODES = Object.fromEntries(
	Object.entries(CountryCodes).map(([k, v]) => [v, k]),
);

export const countryFilterInitialValue = "Sin filtro";

export const arrayOfTexts = [
	"Name",
	"Gender",
	"City",
	"State",
	"Country",
	"Email",
	"Date of birth",
	"Age",
	"Phone",
] as const;
