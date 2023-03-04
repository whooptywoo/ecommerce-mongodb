import Navbar from "../components/Navbar";
import ProductTable from "../components/ProductTable";
import TransactionTable from "../components/TransactionTable";

export default function HomePage() {
	return (
		<div className="h-screen max-w-screen">
			<Navbar />
			{/* <ProductTable /> */}
            <TransactionTable />
		</div>
	);
}
