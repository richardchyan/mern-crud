import axios from 'axios';

const url = 'https://task-manager-server-ipp5.onrender.com/';

// Check if a token already exists in local storage

const API = axios.create({

   baseURL: url,
})

API.interceptors.request.use(req => {

   if(localStorage.getItem('profile')){
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
   }
   return req;
})

// Post URLs that uses an interceptor to attach token before any request. Use a base URL instead 

export const fetchTodos = () => API.get('/todos');
export const fetchSingleTodo = (id) => API.get(`/todos/${id}`)
export const createTodo = (newTodo) => API.post('/todos/add', newTodo);
export const editTodo = (id, updatedTodo) => API.patch(`/todos/update/${id}`, updatedTodo);
export const deleteTodo = (id) => API.delete(`/todos/delete/${id}`);

// Login urls

export const signin = (formData) => API.post('/users/signin', formData);
export const signup = (formData) => API.post('/users/signup', formData);

// Post urls

// export const fetchTodos = () => axios.get(`${url}/todos`);
// export const fetchSingleTodo = (id) => axios.get(`${url}/todos/${id}`)
// export const createTodo = (newTodo) => axios.post(`${url}/todos/add`, newTodo);
// export const editTodo = (id, updatedTodo) => axios.patch(`${url}/todos/update/${id}`, updatedTodo);
// export const deleteTodo = (id) => axios.delete(`${url}/todos/delete/${id}`);

// // Login urls

// export const signin = (formData) => axios.post(`${url}/users/signin`, formData);
// export const signup = (formData) => axios.post(`${url}/users/signup`, formData);