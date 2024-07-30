import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import NoPage from './pages/NoPage';
import Home from './pages/Home';
import UserHome from './pages/UserHome';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
	return (
		<AuthProvider>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/signUp" element={<SignUp />} />
				<Route element={<ProtectedRoutes />}>
					<Route path="/home" element={<Home />} />
					<Route path="/user" element={<UserHome />} />
				</Route>
				<Route path="*" element={<NoPage />} />
			</Routes>
		</AuthProvider>
	);
}

export default App;
