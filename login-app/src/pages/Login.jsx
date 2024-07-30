import { useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; 
import Form from '../components/Form';
import Nav from '../components/Nav';
import Notification from '../components/Notification';
import { useNavigate } from 'react-router-dom';

const Login = () => {
	const navigate = useNavigate();

	const initialState = {
		email: '',
		password: '',
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
				'http://localhost:8090/api/v1/auth/signIn',
				formData
			);
			console.log(response.data);
			if (response.status === 200) {
				const { token, id } = response.data;
				localStorage.setItem('token', token);
				localStorage.setItem('userId', id);

				const decodedToken = jwtDecode(token);
				const userRole = decodedToken.role;
				console.log(userRole);
				localStorage.setItem('role', userRole);

				setNotification({
					visible: true,
					type: 'success',
					message: 'Login successful',
				});

				if (userRole === 'ADMIN') {
					navigate('/home');
				} else {
					navigate('/user');
				}
			}
		} catch (error) {
			console.log('Error:', error);
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
			{notification.visible && (
				<Notification
					type={notification.type}
					message={notification.message}
					onClose={onCloseNotification}
				/>
			)}
		</div>
	);
};

export default Login;
