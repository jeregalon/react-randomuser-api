## React-Randomuser-API

An app built with React that does the following:
1. Performs a fetch on the https://randomuser.me API, which returns fake user data (name, gender, email, phone number, country, etc.)
2. Lists the results using react-window to optimize rendering
3. Has options to sort the list by name, country, date of birth, etc., as well as to delete rows individually or restore the list to its initial state.

The app uses a useContext to pass properties (e.g., the list of users) from the main component to its children, avoiding unnecessary prop drilling. Also, the app uses useReducer to handle its global state.

It also lists users in a Map instead of an Array, to make searching for users by their key faster and thus speed up rendering when a row is deleted

To install, clone this repository and type "pnpm install" on the terminal 

