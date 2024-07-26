import { useState } from 'react';
import SForm from '../components/SForm';
import axios from 'axios';
import Nav from '../components/Nav';

const SignUp = () => {
    const initialState = {
        name: '',
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

    const { name, email, password } = formData;

	return (
			<>
				<Nav/>
				<SForm
					onSubmitForm={onSubmitForm}
					name={name}
					email={email}
					password={password}
					inputChangeHandler={inputChangeHandler}
				/>
			</>
		);
};

export default SignUp;
