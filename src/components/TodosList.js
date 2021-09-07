import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SingleTodo from './SingleTodo';
import { fetchTodos } from 'api';


const TodosList = () => {


   const [todos, setTodos] = useState([]); 
   const user = JSON.parse(localStorage.getItem('profile'));

   useEffect(() => {
      fetchTodos()
         .then(response => {
            const data = response.data;
            setTodos(data);
         }).catch(error => {
            console.log(error);
         })

   }, []);

   return ( 
      <div className="mt-8">
         <h1 className="text-5xl mb-10">List of todos</h1>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-screen-xl m-auto px-4 gap-x-4">
            { todos.map(todo => (
                  <SingleTodo todo={todo} key={todo._id} />
               ))}
         </div>
        
      </div>
   );
}
 
export default TodosList;