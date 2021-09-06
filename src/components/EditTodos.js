import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { fetchSingleTodo, editTodo } from 'api/index';

const EditTodos = () => {

   const [title, setTitle] = useState('');
   const [description, setDescription ] = useState('');
   const [importance, setImportance] = useState('low');
   const [completed, setCompleted] = useState(false);

   const history = useHistory();
   const { id } = useParams();

   useEffect(() => {

      // axios.get(`http://localhost:4000/todos/${id}`)
      fetchSingleTodo(id)
         .then(response => {
            
            const { data } = response;

            setTitle(data.title);
            setDescription(data.description);
            setImportance(data.importance);
            setCompleted(data.completed);
         })
         .catch(error => console.log(error));
   },[])

   // Handlers

   const onTitleChange = (e) => {
      setTitle(e.target.value);
   }

   const onDescriptionChange = (e) => {
      setDescription(e.target.value);

   }

   const onImportanceChange = (e) => {
      setImportance(e.target.value);
   }

   const onCompletedChange = (e) => {
      setCompleted(e.target.checked);
   }

   const handleSubmit = (e) => {

      e.preventDefault();

      // Then set the state of a new object to the submitted values

      const updatedTodo = {

         title: title,
         description: description,
         importance: importance,
         completed: completed

      };

      // then use axios to post the request from the front end to the back end route where post requests are being made
      // params are the route, then the object 

      // axios.post(`http://localhost:4000/todos/update/${id}`, updatedTodo)
      editTodo(id, updatedTodo)
         .then(result => {
            console.log(result);
            history.push('/');
         })
         .catch(error => console.log(error));

      } 

   return ( 
      <div className="max-w-screen-lg m-auto p-3">
         <h1 className="text-5xl my-8 underline text-left font-semibold">Edit Your Todo</h1>
         <form onSubmit={handleSubmit} method="POST" action="/" className="grid grid-cols-1">
            {/* text fields */}
            <div className="flex py-2">
               <label for="title" className="text-3xl mr-4 w-2/12 text-left ">Title:</label>
               <input 
                  type="text" 
                  id="title" 
                  value={title}
                  onChange={onTitleChange} 
                  className="border-2 border-black p-1 w-9/12"
                  />
            </div>
            <div className="flex py-2">
               <label for="description" className="text-3xl mr-4 w-2/12 text-left ">Description:</label>
               <input 
                  type="text" 
                  id="description" 
                  value={description}
                  onChange={onDescriptionChange} 
                  className="border-2 border-black p-1 w-9/12"
                  />
            </div>
            {/* Radio buttons */}
            <h1 className="text-3xl text-left"> Level of Importance:</h1>
            <div className="flex space-x-4"> 
               <div className="text-xl">
                  <input type="radio" name="importance" value="Low" checked={importance === 'Low'} onChange={onImportanceChange}/>
                  <label htmlFor="lowImportance">Low</label>
               </div>
               <div className="text-xl">
                  <input type="radio" name="importance" value="Medium" checked={importance === 'Medium'} onChange={onImportanceChange}/>
                  <label htmlFor="medImportance">Medium</label>
               </div>
               <div className="text-xl">
                  <input type="radio" name="importance" value="High" checked={importance === 'High'} onChange={onImportanceChange}/>
                  <label htmlFor="highImportance">High</label>
               </div>
            </div>
            {/* Completed Checkbox */}
               <h1 className="text-3xl text-left">Task Completed?</h1>
               <div className="flex space-x-4 ">
                  <div>
                     <input type="checkbox" id="completedYes" name="completed" checked={completed} onChange={onCompletedChange} />
                     <label for="completedYes" className="text-xl">Yes</label>
                  </div>
               </div>
            {/* Submit button */}
            <button className="p-2 bg-blue-500 text-xl w-1/4 my-2 rounded text-white">
               Submit
            </button>
         </form>
      </div>
    );
}
 
export default EditTodos;