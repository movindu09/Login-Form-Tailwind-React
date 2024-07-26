import { useState } from 'react';
import axios from 'axios';
import Form from '../components/Form';
import Nav from '../components/Nav';

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
		<div>
			<Nav />
			<Form
				onSubmitForm={onSubmitForm}
				email={email}
				password={password}
				inputChangeHandler={inputChangeHandler}
			/>
		</div>
	);
};

export default Login;
