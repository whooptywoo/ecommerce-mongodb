import Navbar from "../components/Navbar";
import ProductTable from "../components/ProductTable";

export default function HomePage() {
	return (
		<div className="h-screen max-w-screen mt-20 relative">
			<Navbar />
			<ProductTable />
		</div>
	);
}
