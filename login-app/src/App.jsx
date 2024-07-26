import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import NoPage from './pages/NoPage';
import Home from './pages/Home';

function App() {
	return (
		<Routes>
				<Route path="/login" element={<Login/>} />
				<Route path='/signUp' element={<SignUp/>} />
				<Route path='/home' element={<Home/>} />
				<Route path='*' element={<NoPage/>} />
		</Routes>
	);
}

export default App;
