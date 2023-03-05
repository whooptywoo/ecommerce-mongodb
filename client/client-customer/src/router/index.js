import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
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
		loader: () => {
			if (!localStorage.access_token) {
				throw redirect("/login");
			} else {
				return null;
			}
		},
	},
	{
		path: "/cart",
		element: <HomePage />,
		loader: () => {
			if (!localStorage.access_token) {
				throw redirect("/login");
			} else {
				return null;
			}
		},
	},
	{
		path: "/login",
		element: <LoginPage />,
		loader: () => {
			if (localStorage.access_token) {
				throw redirect("/");
			} else {
				return null;
			}
		},
	},
	{
		path: "/register",
		element: <RegisterPage />,
		loader: () => {
			if (localStorage.access_token) {
				throw redirect("/");
			} else {
				return null;
			}
		},
	},
]);

export default router;
