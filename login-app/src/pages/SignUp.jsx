import { useState } from 'react';
import SForm from '../components/SForm';
import axios from 'axios';
import Nav from '../components/Nav';
import Notification from '../components/Notification'; // Adjust the path as necessary

const SignUp = () => {
	const initialState = {
		name: '',
		email: '',
		password: '',
		role: 'User',
	};

	const [formData, setFormData] = useState(initialState);
	const [notification, setNotification] = useState({
		visible: false,
		type: '',
		message: '',
	});

	const inputChangeHandler = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onCloseNotification = () => {
		setNotification({ visible: false, type: '', message: '' });
	};

	const onSubmitForm = async (e) => {
		e.preventDefault();
		console.log('Form Submitted:', formData);
		try {
			const response = await axios.post(
				'http://localhost:8090/api/v1/auth/signup',
				formData
			);
			console.log(response.data);
			if (response.status === 200) {
				setNotification({
					visible: true,
					type: 'success',
					message: 'Signup successful',
				});
				setFormData(initialState); // Reset form data
			}
		} catch (error) {
			console.log(error);
			let errorMessage = 'An unexpected error occurred.';
			if (error.response && error.response.data) {
				const errorData = error.response.data;
				if (typeof errorData === 'string') {
					errorMessage = errorData;
				} else if (typeof errorData === 'object') {
					errorMessage = Object.values(errorData).join(' ');
				}
			}
			setNotification({
				visible: true,
				type: 'error',
				message: errorMessage,
			});
		}
	};

	const { name, email, password, role } = formData;

	return (
		<>
			<Nav />
			<SForm
				onSubmitForm={onSubmitForm}
				name={name}
				email={email}
				password={password}
				role={role}
				inputChangeHandler={inputChangeHandler}
			/>
			{notification.visible && (
				<Notification
					type={notification.type}
					message={notification.message}
					onClose={onCloseNotification}
				/>
			)}
		</>
	);
};

export default SignUp;
