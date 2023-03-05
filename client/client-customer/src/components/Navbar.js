import { useNavigate, Link } from "react-router-dom";

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
			</div>
			<div className="flex text-white w-1/4 justify-between text-xl">
				<Link to="/" className="h-full px-6 py-2">Home</Link>
				<Link to="/cart" className="h-full px-4 py-2">Cart</Link>
			</div>
			<button
				className="text-white hover:bg-red-500 h-full px-4 py-2 text-xl"
				onClick={handleLogout}
			>
				Logout
			</button>
		</div>
	);
}
