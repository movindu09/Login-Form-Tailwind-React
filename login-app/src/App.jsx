import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Home from './pages/Home';
import UserHome from './pages/UserHome';
import SignUp from './pages/SignUp';
import NoPage from './pages/NoPage';

const App = () => {
	const { token, role } = useAuth();

	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/signUp" element={<SignUp />} />
			<Route
				path="/admin"
				element={
					token && role === 'ADMIN' ? (
						<Home />
					) : (
						<Navigate to="/login" replace />
					)
				}
			/>
			<Route
				path="/user"
				element={
					token && role === 'USER' ? (
						<UserHome />
					) : (
						<Navigate to="/login" replace />
					)
				}
			/>
			<Route path="/" element={<NoPage/>} />
		</Routes>
	);
};

export default App;
