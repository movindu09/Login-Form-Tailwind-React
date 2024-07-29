import axios from "axios";

const todoURL = import.meta.env.VITE_TODO_URL;

const getTodo = async () => {
	const response = await axios.get(`${todoURL}/todo`);
	return response.data;
};

const createTodo = async () => {
	const response = await axios.post(`${todoURL}/todo`, FormData);
	return response.data;
};

export { getTodo, createTodo };