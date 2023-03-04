export default function TransactionTable() {
	return (
		<div className="py-20 flex flex-col px-60">
			<table className="">
				<thead>
					<tr className="border-b-2">
						<th className="text-left">Product ID</th>
						<th className="text-left">Product name</th>
						<th className="text-left">User ID</th>
						<th className="text-left">User email</th>
					</tr>
				</thead>
				<tbody>
					<tr className="border-b-2">
						<td>1</td>
						<td>Carrot</td>
						<td>100</td>
						<td>user@mail.com</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
