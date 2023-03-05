import Navbar from "../components/Navbar";
import ProductContainer from "../components/ProductContainer";
import CartTable from "../components/CartTable";

export default function HomePage() {
	const pathname = window.location.pathname;
	return (
		<div className="h-screen max-w-screen mt-20 relative">
			<Navbar />
			{pathname === "/cart" ? <CartTable /> : <ProductContainer />}
		</div>
	);
}
