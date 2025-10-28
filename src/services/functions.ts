import type { RandomUser, RandomUserResponse, User } from "../types";
import { RANDOM_USERS_LINK } from "./constants";

export async function getUsersFromAPI(num: number) {
	try {
		const res = await fetch(RANDOM_USERS_LINK + num);
		const data: RandomUserResponse = await res.json();
		const dataMap = new Map<string, User>();
		data.results?.map((d: RandomUser) =>
			dataMap.set(d.login.uuid, {
				picture: d.picture.thumbnail,
				name: `${d.name.first} ${d.name.last}`,
				gender: d.gender,
				city: d.location.city,
				state: d.location.state,
				country: d.location.country,
				email: d.email,
				dob: d.dob.date,
				age: `${d.dob.age}`,
				phone: d.phone,
			}),
		);
		return dataMap;
	} catch (err) {
		if (err instanceof Error) {
			throw new Error(err.message);
		}
		throw new Error(String(err));
	}
}

export const formatCustomDate = (dateString: string) => {
	const date = new Date(dateString);

	return date.toLocaleDateString("es-ES", {
		day: "numeric",
		month: "numeric",
		year: "numeric",
	});
};

export function countryCodeToFlagEmoji(countryCode: string): string {
	const code = countryCode.toUpperCase();
	return code
		.split("")
		.map((char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
		.join("");
}
