import api from '../context/AxiosInstance'; 

const todoURL = import.meta.env.VITE_TODO_URL;
const authURL = import.meta.env.VITE_AUTH_URL;

const getTodo = async () => {
	const response = await api.get(`${todoURL}`);
	return response;
};

const deleteTodo = async (id) => {
	await api.delete(`${todoURL}/${id}`);
};

const addTodo = async (todo) => {
	const response = await api.post(`${todoURL}`, todo);
	return response;
};

const updateTodo = async (id, formData) => {
	const response = await api.put(`${todoURL}/${id}`, formData);
	return response;
};

const login = async (formData) => {
	const response = await api.post(`${authURL}/signIn`, formData);
	return response;
};

const signUp = async (formData) => {
	const response = await api.post(`${authURL}/signUp`, formData);
	return response;
};

export { getTodo, deleteTodo, addTodo, updateTodo, login, signUp };
