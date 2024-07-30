import axios from 'axios';


const api = axios.create({
	baseURL: 'http://localhost:8090/api/v1/', // base URL
	headers: {
		'Content-Type': 'application/json',
	},
});

const setAuthToken = (token) => {
	if (token) {
		api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
	} else {
		delete api.defaults.headers.common['Authorization'];
	}
};

const initializeAuthToken = () => {
	const token = localStorage.getItem('token');
	setAuthToken(token);
};


export const fetchTodos = async () => {
	initializeAuthToken();
	return api.get('todo');
};

export const addTodo = async (data) => {
	initializeAuthToken();
	return api.post('todo', data);
};

export const deleteTodo = async (id) => {
	initializeAuthToken();
	return api.delete(`todo/${id}`);
};

export const updateTodo = async (id, data) => {
	initializeAuthToken();
	return api.put(`todo/${id}`, data);
};


export default api;
