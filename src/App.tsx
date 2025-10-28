import { useEffect } from "react";
import UsersTable from "./components/UsersTable";
import useTable from "./hooks/useTable";
import { NUMBER_OF_ROWS } from "./services/constants";

function App() {
	const {
		users,
		getUsers,
		sortUsers,
		backToInitialState,
		coloredRows,
		changeColoredRows,
		deleteUser,
		sort,
	} = useTable();

	useEffect(() => {
		getUsers(NUMBER_OF_ROWS);
	}, []);

	return (
		<main className="bg-black">
			<h1>Technical Test</h1>
			<UsersTable
				users={users}
				coloredRows={coloredRows}
				changeColoredRows={changeColoredRows}
				sortUsers={sortUsers}
				backToInitialState={backToInitialState}
				deleteUser={deleteUser}
				sort={sort}
			/>
		</main>
	);
}

export default App;
