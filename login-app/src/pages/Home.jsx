import { useEffect, useState } from 'react';
import AddNew from '../components/AddNew';
import Nav from '../components/Nav';
import axios from 'axios';
import Table from '../components/Table';

const Home = () => {
	const initialState = {
		title: '',
		description: '',
	};

	const [lists, setLists] = useState([]);
	const [formData, setFormData] = useState(initialState);

	useEffect(() => {
		const fetchTodo = async () => {
			try {
				const response = await axios.get(
					`http://localhost:8090/api/v1/todo`
				);
				setLists(response.data);
				console.log(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchTodo();
	}, []);

	const inputChangeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmitForm = async (e) => {
		e.preventDefault();
		console.log('Form Submitted:', formData);
		try {
			const response = await axios.post(
				'http://localhost:8090/api/v1/todo',
				formData
			);
			console.log(response.data);
			setLists([...lists, response.data]);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteTodo = async (id) => {
		console.log('Attempting to delete todo with id:', id);
		try {
			await axios.delete(`http://localhost:8090/api/v1/todo/${id}`);
			setLists(lists.filter((item) => item.id !== id));
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
			<Table data={lists} deleteTodo={deleteTodo} />
		</div>
	);
};

export default Home;
