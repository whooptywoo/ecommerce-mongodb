import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import { redirect } from "react-router-dom";

const protectRoute = () => {
	if (!localStorage.access_token) {
		throw redirect("/login");
	} else {
		return null;
	}
};
const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/transactions",
		element: <HomePage />,
	},
	{
		path: "/login",
		element: <LoginPage />,
		// loader: () => {
		// 	if (localStorage.access_token) {
		// 		throw redirect("/");
		// 	} else {
		// 		return null;
		// 	}
		// }
	},
]);

export default router;
