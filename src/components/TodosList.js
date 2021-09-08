import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SingleTodo from './SingleTodo';
import { fetchTodos } from 'api';


const TodosList = ({ user }) => {

   const [todos, setTodos] = useState([]); 

   useEffect(() => {
      if(user){
         fetchTodos()
         .then(response => {
            const { data } = response;
            const authorizedData = data.filter(todo => user.profile._id === todo.creator);
            // console.log(authorizedData);
            setTodos(authorizedData);

         }).catch(error => {
            console.log(error);
         })
      } else {
         setTodos([])
      }
      
   }, [user]);
   
   return ( 
      <div className="mt-8">
         <h1 className="text-3xl mb-10 max-w-screen-sm m-auto">{ user ? 'List of todos' : 'You are not currently signed in. Sign in to create and view your todos!'}</h1>
         <div className={ todos.length > 0 ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-screen-lg m-auto px-4 gap-x-4" : "grid max-w-screen-lg m-auto px-4 gap-x-4" }>
            { todos.length > 0 
               && 
               todos.map(todo => (
                  <SingleTodo todo={todo} key={todo._id} />
               ))
            }
            { user && todos.length == 0 
               && 
               <h2 className="text-2xl"> You currently have no todos. Start creating some todos!</h2>
            }   
         </div>
      </div>
   );
}
 
export default TodosList;