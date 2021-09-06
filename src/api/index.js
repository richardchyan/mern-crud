// login branch

import axios from 'axios';

const url = 'http://localhost:4000';

// Post urls

export const fetchTodos = () => axios.get(`${url}/todos`);
export const fetchSingleTodo = (id) => axios.get(`${url}/todos/${id}`)
export const createTodo = (newTodo) => axios.post(`${url}/todos/add`, newTodo);
export const editTodo = (id, updatedTodo) => axios.patch(`${url}/todos/update/${id}`, updatedTodo);
export const deleteTodo = (id) => axios.delete(`${url}/todos/delete/${id}`);

// Login urls

export const signin = (formData) => axios.post(`${url}/users/signin`, formData);
export const signup = (formData) => axios.post(`${url}/users/signup`, formData);