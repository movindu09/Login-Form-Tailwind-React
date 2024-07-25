import { useState } from 'react';
import axios from 'axios';
import Form from '../components/Form';

const Login = () => {
	const initialState = {
		email: '',
		password: '',
	};

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

	const { email, password } = formData;

	return (
		<Form
			onSubmitForm={onSubmitForm}
			email={email}
			password={password}
			inputChangeHandler={inputChangeHandler}
		/>
	);
};

export default Login;
