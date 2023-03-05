import Modal from "react-overlays/Modal";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart } from "../store/actions/actionCreator";

export default function CartTable() {
	const [showModal, setShowModal] = useState(false);
	const [form, setForm] = useState({});
	const cart = useSelector((state) => {
		return state.products.cart;
	});
	let grandTotal = 0;

	Object.values(cart).forEach((el) => {
		grandTotal += el.subTotal;
	});
	const handleClose = () => {
		setShowModal(false);
	};
	const dispatch = useDispatch();
	const changeHandler = (e) => {
		const { value, name } = e.target;
		const obj = { ...form };
		obj[name] = value;
		setForm(obj);
	};

	useEffect(() => {
		dispatch(fetchCart());
	}, []);

	const renderBackdrop = (props) => <div className="backdrop" />;
	return (
		<>
			<Modal
				className="modal"
				show={showModal}
				onHide={handleClose}
				renderBackdrop={renderBackdrop}
			>
				<div>
					<div className="modal-header">
						<div className="modal-title">
							<h1>Success</h1>
						</div>
						<div>
							<span
								className="close-button"
								onClick={handleClose}
							>
								x
							</span>
						</div>
					</div>
					<div className="modal-desc">
						<h1>Your cart is checked out</h1>
					</div>
					<div className="flex gap-4 justify-center px-4 py-4 mt-4">
						<button
							className="bg-black text-white px-8 py-1"
							onClick={handleClose}
						>
							OK
						</button>
					</div>
				</div>
			</Modal>
			<button
				className="fixed right-20 bottom-20 py-4 px-6 bg-yellow-300 text-black font-semibold text-xl"
				onClick={() => {
					if (cart !== {}) {
						setShowModal(true);
					}
				}}
			>
				Check out
			</button>
			<div className="py-20 flex flex-col px-60 w-full">
				<h1 className="text-center text-2xl font-bold mb-10">Your Cart</h1>
				<table className="">
					<thead>
						<tr className="border-b-2">
							<th className="text-left">Product name</th>
							<th className="text-left">Price (IDR)</th>
							<th className="text-left">Quantity</th>
							<th className="text-left">Subtotal (IDR)</th>
						</tr>
					</thead>
					<tbody>
						{Object.values(cart).map((product) => {
							// return <h1>{JSON.stringify(product)}</h1>;
							return (
								<tr
									className="border-b-2"
									key={product.name}
								>
									<td>{product.name}</td>
									<td>{product.price}</td>
									<td>{product.quantity}</td>
									<td>{product.subTotal}</td>
								</tr>
							);
						})}
						<tr>
							<td className="font-bold">Grand total</td>
							<td></td>
							<td></td>
							<td>{grandTotal}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
}
