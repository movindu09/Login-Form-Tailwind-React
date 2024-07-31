const Table = (props) => {
	const { data, deleteTodo, showUpdateModal, role } = props;

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
			title: 'Actions',
			key: 'action',
			render: (text, record) => (
				<div className="flex space-x-4">
					<button
						className="text-indigo-600 hover:text-indigo-900"
						onClick={() => showUpdateModal(record)}
					>
						Edit
					</button>
					{role === 'ADMIN' && ( 
						<button
							className="text-red-600 hover:text-red-900"
							onClick={() => deleteTodo && deleteTodo(record.id)} 
						>
							Delete
						</button>
					)}
				</div>
			),
		},
	];

	return (
		<div className="w-auto mx-16 p-5">
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-500">
					<tr>
						{columns.map((column) => (
							<th
								key={column.key}
								className="px-6 py-3 text-left text-xs font-medium text-slate-950 uppercase tracking-wider"
							>
								{column.title}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{data.map((row) => (
						<tr key={row.id}>
							{columns.map((column) => (
								<td
									key={column.key}
									className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
								>
									{column.render
										? column.render(null, row)
										: row[column.dataIndex]}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
