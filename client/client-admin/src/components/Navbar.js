export default function Navbar() {
	return (
		<div className="w-full h-20 bg-blue-600 shadow-xl flex sticky items-center px-8 justify-between">
			<h1 className="text-white font-bold text-2xl">eGroceries.id</h1>
			<div className="flex justify-between items-center w-1/4">
				<h1 className="text-white text-xl">Products</h1>
                <h1 className="text-white text-xl">Transactions</h1>
			</div>
			<button className="text-white hover:bg-red-500 h-full px-4 py-2">
				Logout
			</button>
		</div>
	);
}
