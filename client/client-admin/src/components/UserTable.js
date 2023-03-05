export default function UserTable() {
	return (
		<div className="py-20 flex flex-col px-60">
			<table className="">
				<thead>
					<tr className="border-b-2">
						<th className="text-left">ID</th>
						<th className="text-left">Email address</th>
						<th className="text-left">Full name</th>
					</tr>
				</thead>
				<tbody>
					<tr className="border-b-2">
						<td>1</td>
						<td>user@mail.com</td>
						<td>User X</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
