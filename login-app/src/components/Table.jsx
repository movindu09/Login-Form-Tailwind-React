const Table = (props) => {

    const {data} = props

	const columns = [
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: 'Description',
			dataIndex: 'description',
			key: 'description',
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
		},
		{
			title: 'Actions',
			key: 'action',
		},
	];

	return (
		<div className="w-auto mx-16 p-5">
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						{columns.map((column) => (
							<th
								key={column.key}
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								{column.title}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{data.map((row) => (
						<tr key={row._id}>
							{columns.map((column) => (
								<td
									key={column.key}
									className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
								>
									{row[column.dataIndex]}
								</td>
							))}
							<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
								<button className="text-indigo-600 hover:text-indigo-900">
									Edit
								</button>
								<button className="text-red-600 hover:text-red-900 ml-4">
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
