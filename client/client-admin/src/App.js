import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
	return <RouterProvider router={router} />;
}

export default App;
