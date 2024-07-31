const AddNew = (props) => {
	const {
		onSubmitForm,
		title,
		inputChangeHandler,
		description,
		headerTitle,
		buttonName,
	} = props;

	return (
		<div className="bg-white">
			<section className=" mx-20 my-30 rounded-lg shadow bg-blue-300">
				<h1 className="font-bold text-center text-4xl">
					{headerTitle}
				</h1>
				<form
					className="mx-20  w-auto space-y-4"
					onSubmit={onSubmitForm}
				>
					<div>
						<label htmlFor="title" className="sr-only">
							Title
						</label>

						<div className="relative">
							<input
								type="text"
								name="title"
								className="w-full rounded-lg border-gray-200 pe-12 text-sm shadow-sm"
								placeholder="Enter Title"
								value={title}
								onChange={inputChangeHandler}
							/>
						</div>
					</div>

					<div>
						<label htmlFor="description" className="sr-only">
							Description
						</label>

						<div className="relative">
							<textarea
								type="text"
								name="description"
								className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
								placeholder="Enter a description"
								value={description}
								onChange={inputChangeHandler}
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
						>
							{buttonName}
						</button>
					</div>
				</form>
			</section>
		</div>
	);
};

export default AddNew;
