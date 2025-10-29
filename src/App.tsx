import { useEffect } from "react";
import Header from "./components/Header";
import UsersTable from "./components/UsersTable";
import { TableContext } from "./context/TableContext";
import useTable from "./hooks/useTable";
import { NUMBER_OF_ROWS } from "./services/constants";

function App() {
	const {
		users,
		filteredUsers,
		getUsers,
		sortUsers,
		backToInitialState,
		coloredRows,
		changeColoredRows,
		deleteUser,
		sort,
		sortedCountries,
		selectedCountry,
		changeSelectedCountry,
		error,
		loading,
	} = useTable();

	useEffect(() => {
		getUsers(NUMBER_OF_ROWS);
	}, []);

	return (
		<TableContext
			value={{
				users,
				filteredUsers,
				coloredRows,
				changeColoredRows,
				sortUsers,
				backToInitialState,
				deleteUser,
				sort,
				sortedCountries,
				selectedCountry,
				changeSelectedCountry,
				error,
				loading,
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
