import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(null);
	const [role, setRole] = useState(null);
	const navigate = useNavigate();

	console.log(token, role);

	useEffect(() => {
		const storedToken = localStorage.getItem('token');
		const storedRole = localStorage.getItem('role');

		if (storedToken && storedRole) {
			setToken(storedToken);
			setRole(storedRole);
		}
	}, []);

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('role');
		localStorage.removeItem('refreshToken');
		setToken(null);
		setRole(null);
		navigate('/login');
	};

	const updateToken = (newToken) => {
		if (newToken) {
			localStorage.setItem('token', newToken);
			const decodedToken = jwtDecode(newToken);
			setToken(newToken);
			setRole(decodedToken.role);
		} else {
			localStorage.removeItem('token');
			setToken(null);
			setRole(null);
		}
	};

	return (
		<AuthContext.Provider
			value={{ token, setToken: updateToken, role, setRole, logout }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
