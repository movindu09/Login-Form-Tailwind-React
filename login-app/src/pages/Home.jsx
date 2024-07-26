import { useState } from 'react';
import AddNew from '../components/AddNew';
import Nav from '../components/Nav';
import axios from 'axios';
import Table from '../components/Table';

const Home = () => {
	const initialState = {
		title: '',
		description: '',
	};


    const data = [
		{
			_id: '1',
			title: 'Task 1',
			description: 'Description 1',
			status: 'Pending',
		},
		{
			_id: '2',
			title: 'Task 2',
			description: 'Description 2',
			status: 'Completed',
		},
		
	];

	const [formData, setFormData] = useState(initialState);

	const inputChangeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmitForm = async (e) => {
		e.preventDefault();
		console.log('Form Submitted:', formData);
		try {
			const response = await axios.post('', formData);
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const { title, description } = formData;

	return (
		<div>
			<Nav />
			<AddNew
				onSubmitForm={onSubmitForm}
				title={title}
				inputChangeHandler={inputChangeHandler}
				description={description}
			/>
			<Table data={data} />
		</div>
	);
};

export default Home;
