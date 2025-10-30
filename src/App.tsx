import { useEffect } from "react";
import Header from "./components/Header";
import UsersTable from "./components/UsersTable";
import { TableContext } from "./context/TableContext";
import useTable from "./hooks/useTable";
import { arrayOfTexts, NUMBER_OF_ROWS } from "./services/constants";

function App() {
	const {
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
	} = useTable();

	useEffect(() => {
		getUsers(NUMBER_OF_ROWS);
	}, []);

	return (
		<TableContext
			value={{
				state,
				filteredUsers,
				initialState,
				sortUsers,
				sortUsersByHeaderClicking,
				backToInitialState,
				changeColoredRows,
				deleteUser,
				sortedCountries,
				changeSelectedCountry,
				arrayOfTexts,
			}}
		>
			<main className="bg-black">
				<h1>Technical Test</h1>
				<Header />
				<UsersTable />
			</main>
		</TableContext>
	);
}

export default App;
