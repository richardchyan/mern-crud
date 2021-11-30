import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { createTodo } from 'api/index.js';

const CreateTodos = ({ user }) => {

   const [title, setTitle] = useState('');
   const [description, setDescription ] = useState('');
   const [importance, setImportance] = useState('low');
   const [completed, setCompleted] = useState(false);
   // const [formData, setFormData] = useState({ title: '', description: '', importance: 'low', completed: false});

   const history = useHistory();

   const onTitleChange = (e) => {
      setTitle(e.target.value);
   }

   const onDescriptionChange = (e) => {
      setDescription(e.target.value);

   }

   const onImportanceChange = (e) => {
      setImportance(e.target.value);

   }

   const handleSubmit = (e) => {

      e.preventDefault();

      // reset the form
      setDescription('');
      setTitle('');
      setImportance('');

      // Then set the state of a new object to the submitted values
      const newTodo = {

         title: title,
         description: description,
         importance: importance,
         completed: completed,
      };

      // then use axios to post the request from the front end to the back end route where post requests are being made
      // params are the route, then the object 
      try {
         createTodo(newTodo)
         .then(response => {
            if(response){
               history.push('/');
            }
         });
      } catch (error) {
         console.log(error);
      }
   }

   return ( 
      <div className="m-auto p-3">
         <h1 className="text-5xl my-8 underline font-semibold ">Create a New Task</h1>
         <form onSubmit={handleSubmit} className="max-w-screen-lg m-auto py-6">
            <div className="max-w-sm m-auto rounded shadow bg-gray-50 mt-4 p-4 text-xl">
               <div className="py-2">
                  <label for="title" className="text-lg w-full">Title:</label>
                  <input 
                     type="text" 
                     id="title" 
                     value={title}
                     onChange={onTitleChange} 
                     className="bg-gray-200 border-2 border-gray-100 rounded-lg focus:bg-gray-100 focus:ring focus:ring-blue-400 focus:outline-none py-2 px-3 text-lg w-full"
                     placeholder="title"
                     required
                     />
               </div>
               <div className="py-2">
                  <label for="description" className="text-lg">Description:</label>
                  <input 
                     type="text" 
                     id="description" 
                     value={description}
                     onChange={onDescriptionChange} 
                     className="bg-gray-200 border-2 border-gray-100 rounded-lg focus:bg-gray-100 focus:ring focus:ring-blue-400 focus:outline-none py-2 px-3 text-lg w-full"
                     placeholder="description"
                     required
                     />
               </div>
            {/* Radio buttons */}
               <h1 className="text-3xl"> Level of Importance:</h1>
               <div> 
                  <div className="text-xl mb-2">
                     <input type="radio" name="importance" value="Low" checked={importance === 'Low'} onChange={onImportanceChange}/>
                     <label htmlFor="lowImportance">Low</label>
                  </div>
                  <div className="text-xl mb-2">
                     <input type="radio" name="importance" value="Medium" checked={importance === 'Medium'} onChange={onImportanceChange}/>
                     <label htmlFor="medImportance">Medium</label>
                  </div>
                  <div className="text-xl mb-2">
                     <input type="radio" name="importance" value="High" checked={importance === 'High'} onChange={onImportanceChange}/>
                     <label htmlFor="highImportance">High</label>
                  </div>
               </div>
               {/* Submit button */}
               <button type="submit" className="p-2 bg-blue-500 text-xl w-1/4 my-2 rounded text-white">
               Submit
               </button> 
            </div>        
         </form>
      </div>
    );
}
 
export default CreateTodos;