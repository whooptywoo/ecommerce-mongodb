export default function ProductTable() {
	return (
		<div className="py-20 flex flex-col px-60">
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
					<tr className="border-b-2">
						<td>1</td>
						<td>Carrot</td>
						<td>5000</td>
						<td className="flex justify-center gap-8">
							<button className="px-4 py-2 rounded-lg text-red-600">
								Delete
							</button>
							<button className="px-4 py-2 rounded-lg text-blue-600">
								Edit
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
