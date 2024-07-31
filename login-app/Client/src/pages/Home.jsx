import { useContext, useEffect, useState } from 'react';
import AddNew from '../components/AddNew';
import Nav from '../components/Nav';
import Table from '../components/Table';
import Modal from '../components/Modal';
import { getTodo, addTodo, deleteTodo, updateTodo } from '../api/axios';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
	const initialState = {
		title: '',
		description: '',
	};

	const [lists, setLists] = useState([]);
	const [formData, setFormData] = useState(initialState);
	const [updateVisible, setUpdateVisible] = useState(false);
	const [selectedTodo, setSelectedTodo] = useState(null);
	const { role } = useContext(AuthContext);

	const showUpdateModal = (record) => {
		setSelectedTodo(record);
		setUpdateVisible(true);
	};

	const closeModal = () => {
		setUpdateVisible(false);
		setSelectedTodo(null);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getTodo();
				setLists(response.data);
				console.log(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchData();
	}, []);

	const inputChangeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmitForm = async (e) => {
		e.preventDefault();
		console.log('Form Submitted:', formData);
		try {
			const response = await addTodo(formData);
			console.log(response.data);
			setLists([...lists, response.data]);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async (id) => {
		console.log('Record deleted with id: ', id);
		try {
			await deleteTodo(id);
			setLists(lists.filter((item) => item.id !== id));
		} catch (error) {
			console.log(error);
		}
	};

	const handleEdit = async (values) => {
		const id = selectedTodo.id;
		try {
			const response = await updateTodo(id, values);
			const updatedRecords = lists.map((record) =>
				record.id === selectedTodo.id ? response.data : record
			);
			setLists(updatedRecords);
			closeModal();
		} catch (error) {
			console.log(error);
		}
	};

	const { title, description } = formData;

	return (
		<div>
			<Nav />
			<AddNew
				headerTitle="Add a new item"
				onSubmitForm={onSubmitForm}
				title={title}
				inputChangeHandler={inputChangeHandler}
				description={description}
				buttonName="Submit"
			/>
			<Table
				data={lists}
				deleteTodo={handleDelete}
				showUpdateModal={showUpdateModal}
				role={role}
			/>
			<Modal
				visible={updateVisible}
				onClose={closeModal}
				todo={selectedTodo}
				onSubmit={handleEdit}
			/>
		</div>
	);
};

export default Home;
