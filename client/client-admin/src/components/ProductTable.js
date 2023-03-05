import Modal from "react-overlays/Modal";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	addProduct,
	deleteProduct,
	editProduct,
	fetchProducts,
} from "../store/actions/actionCreator";

export default function ProductTable() {
	const [showAddModal, setShowAddModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [form, setForm] = useState({});
	const [productInfo, setProductInfo] = useState({});
	const handleClose = () => {
		setShowAddModal(false);
		setShowEditModal(false);
	};
	console.log(productInfo);
	const dispatch = useDispatch();
	const changeHandler = (e) => {
		const { value, name } = e.target;
		const obj = { ...form };
		obj[name] = value;
		setForm(obj);
	};

	const products = useSelector((state) => {
		return state.products.products;
	});

	async function handleDelete(id) {
		try {
			await dispatch(deleteProduct(id)).then(() => dispatch(fetchProducts()));
		} catch (error) {
			console.log(error);
		}
	}
	async function handleAddSubmit() {
		try {
			await dispatch(addProduct(form))
				.then(() => setShowAddModal(false))
				.then(() => dispatch(fetchProducts()));
		} catch (error) {
			console.log(error);
		}
	}

	async function handleEditSubmit() {
		try {
			await dispatch(editProduct(form, productInfo._id))
				.then(() => setProductInfo({}))
				.then(() => setShowEditModal(false))
				.then(() => dispatch(fetchProducts()));
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		dispatch(fetchProducts());
	}, []);

	const renderBackdrop = (props) => <div className="backdrop" />;
	return (
		<>
			<Modal
				className="modal"
				show={showAddModal || showEditModal}
				onHide={handleClose}
				renderBackdrop={renderBackdrop}
			>
				<div>
					<div className="modal-header">
						<div className="modal-title">
							{showEditModal ? (
								<h1>Edit product details</h1>
							) : (
								<h1>Add new product</h1>
							)}
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
						<form className="flex flex-col gap-2">
							<div className="flex gap-2 w-full items-center">
								<label className="w-1/3">Item name:</label>
								<input
									type="text"
									className="border-2 rounded-lg grow py-0.5 px-1"
									name="name"
									onChange={changeHandler}
									defaultValue={productInfo?.name}
								></input>
							</div>
							<div className="flex gap-2 w-full">
								<label className="w-1/3">Price (in IDR):</label>
								<input
									type="number"
									className="border-2 rounded-lg grow py-0.5 px-1"
									name="price"
									onChange={changeHandler}
									defaultValue={productInfo?.price}
								></input>
							</div>
							<div className="flex gap-2 w-full">
								<label className="w-1/3">Image URL:</label>
								<input
									type="text"
									className="border-2 rounded-lg grow py-0.5 px-1"
									name="image"
									onChange={changeHandler}
									defaultValue={productInfo?.image}
								></input>
							</div>
						</form>
					</div>
					<div className="flex gap-4 justify-center px-4 py-4 mt-4">
						<button
							className="bg-black text-white px-8 py-1"
							onClick={showAddModal ? handleAddSubmit : handleEditSubmit}
						>
							Save
						</button>
					</div>
				</div>
			</Modal>
			<button
				className="fixed right-20 bottom-20 py-4 px-6 bg-yellow-300 text-black font-semibold text-xl"
				onClick={() => {
					setShowAddModal(true);
					setShowEditModal(false);
					setProductInfo({});
				}}
			>
				Add new product
			</button>
			<div className="py-20 flex flex-col px-60 w-full">
				<h1 className="text-center text-2xl font-bold mb-10">
					Product Catalogue
				</h1>
				<table className="">
					<thead>
						<tr className="border-b-2">
							<th className="text-left">Product ID</th>
							<th className="text-left">Product name</th>
							<th className="text-left">Price (IDR)</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => {
							return (
								<tr
									className="border-b-2"
									key={product._id}
								>
									<td>{product._id}</td>
									<td>{product.name}</td>
									<td>{product.price}</td>
									<td className="flex justify-center gap-8">
										<button
											className="px-4 py-2 rounded-lg text-red-600"
											onClick={() => handleDelete(product._id)}
										>
											Delete
										</button>
										<button
											className="px-4 py-2 rounded-lg text-blue-600"
											onClick={() => {
												setShowEditModal(true);
												setShowAddModal(false);
												setProductInfo(product);
											}}
										>
											Edit
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
}
