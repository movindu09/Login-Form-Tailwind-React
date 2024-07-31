import { useState, useEffect } from 'react';
import AddNew from '../components/AddNew';

const Modal = (props) => {
	const { visible, onClose, todo, onSubmit } = props;

	const [formData, setFormData] = useState({ title: '', description: '' });

	useEffect(() => {
		if (todo) {
			setFormData(todo);
		}
	}, [todo]);

	const inputChangeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
	};

	if (!visible) return null;

	return (
		<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
			<div className="border rounded-lg bg-white">
				<div className="flex flex-col p-5 rounded-lg shadow bg-white">
					<div className="flex justify-end">
						<button onClick={onClose} className="text-gray-600">
							&times;
						</button>
					</div>
					<AddNew
						headerTitle="Edit Todo"
						onSubmitForm={handleSubmit}
						title={formData.title}
						inputChangeHandler={inputChangeHandler}
						description={formData.description}
						buttonName="Update"
					/>
				</div>
			</div>
		</div>
	);
};

export default Modal;
