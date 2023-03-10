import { useNavigate } from "react-router-dom";

export default function Navbar() {
	const navigate = useNavigate();
	function handleLogout() {
		localStorage.clear();
		navigate("/login");
	}
	return (
		<div className="w-full h-20 bg-blue-600 shadow-xl flex fixed top-0 items-center px-8 justify-between">
			<div className="flex flex-col">
				<h1 className="text-white font-bold text-2xl">eGroceries.id</h1>
				<h3 className="text-white text-center text-sm">Admin</h3>
			</div>
			<button
				className="text-white hover:bg-red-500 h-full px-4 py-2"
				onClick={handleLogout}
			>
				Logout
			</button>
		</div>
	);
}
