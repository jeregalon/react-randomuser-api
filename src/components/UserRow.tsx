import { useEffect, useRef } from "react";
import { TABLE_GRID } from "../services/constants";
import { formatCustomDate } from "../services/functions";
import type { User } from "../types";

let renderCount = 0;

interface UserRowProps {
	index: number;
	style: React.CSSProperties;
	usersArray: [string, User][];
	handleDelete: (key: string) => void;
}

export default function UserRow({
	index,
	usersArray,
	style,
	handleDelete,
}: UserRowProps) {
	const hasRendered = useRef(false);
	useEffect(() => {
		if (!hasRendered.current) {
			renderCount++;
			hasRendered.current = true;
			console.log("Total filas renderizadas hasta ahora:", renderCount);
		}
	}, []);

	console.log(`Fila renderizada: ${index} | Total renders: ${renderCount}`);

	const u = usersArray[index];

	return (
		<div
			className={`grid ${TABLE_GRID} items-center p-1 px-2 text-sm text-white border-b border-gray-700`}
			style={style}
		>
			<div>
				<img src={u[1].picture} alt={u[1].name} />
			</div>
			<div>{u[1].name}</div>
			<div>{u[1].gender}</div>
			<div>{u[1].city}</div>
			<div>{u[1].state}</div>
			<div>{u[1].country}</div>
			<div>{u[1].email}</div>
			<div>{formatCustomDate(u[1].dob)}</div>
			<div>{u[1].age}</div>
			<div>{u[1].phone}</div>
			<div className="w-10 text-xs">
				<button
					className="cursor-pointer"
					onClick={() => handleDelete(u[0])}
					type="button"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="size-6"
					>
						<title>Eliminar fila</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
						/>
					</svg>
				</button>
			</div>
		</div>
	);
}
