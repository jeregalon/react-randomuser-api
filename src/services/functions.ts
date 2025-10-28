import type { User } from "../types";
import { RANDOM_USERS_LINK } from "./constants";

export async function getUsersFromAPI(num: number) {
	try {
		const res = await fetch(RANDOM_USERS_LINK + num);
		const data = await res.json();
		const dataMap = new Map<string, User>();
		data.results?.map((d) =>
			dataMap.set(d.login.uuid, {
				picture: d.picture.thumbnail,
				name: `${d.name.first} ${d.name.last}`,
				gender: d.gender,
				city: d.location.city,
				state: d.location.state,
				country: d.location.country,
				email: d.email,
				dob: d.dob.date,
				age: d.dob.age,
				phone: d.phone,
			}),
		);
		return dataMap;
	} catch (err) {
		throw new Error(err);
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
