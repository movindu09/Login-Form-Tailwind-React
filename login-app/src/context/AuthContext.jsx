import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(null);
	const [role, setRole] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const storedToken = localStorage.getItem('token');
		const storedRole = localStorage.getItem('role');
		if (storedToken && storedRole) {
			setToken(storedToken);
			setRole(storedRole);
			navigate('/home');
		}
	}, [navigate]);

	const logout = () => {
		console.log('Logging out...');
		localStorage.removeItem('token');
		localStorage.removeItem('role');
		localStorage.removeItem('refreshToken');
		setToken(null);
		setRole(null);
		navigate('/login');
	};

	return (
		<AuthContext.Provider
			value={{ token, setToken, role, setRole, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};
