import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, addToCart } from "../store/actions/actionCreator";

export default function ProductContainer() {
	const dispatch = useDispatch();
	const products = useSelector((state) => {
		return state.products.products;
	});
	async function handleAddToCart(id) {
		dispatch(addToCart(id)).catch((err) => console.log(err));
	}
	useEffect(() => {
		dispatch(fetchProducts());
	}, []);
	return (
		<>
			<div className="py-20 flex flex-col px-60 w-full">
				<h1 className="text-center text-2xl font-bold mb-10">
					Fresh Produces Everyday
				</h1>
				<div className="flex flex-wrap w-full h-full gap-4">
					{products.map((product) => {
						return (
							<div className="flex flex-col w-48 h-64 border-2 rounded-lg items-center bg-gray-100 justify-between">
								<div className="h-2/3 rounded-lg w-full">
									<img
										src={product.image}
										className="h-full w-full rounded-t-lg"
									/>
								</div>
								<h1 className="font-semibold text-sm text-center">
									{product.name}
								</h1>
								<h1 className="text-sm">{product.price}</h1>
								<h1
									className="bg-white w-full text-center rounded-b-lg cursor-pointer"
									onClick={() => handleAddToCart(product._id)}
								>
									Add to cart
								</h1>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
