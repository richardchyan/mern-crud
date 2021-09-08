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
      const updatedTodo = {
         title: title,
         description: description,
         importance: importance,
         completed: completed
      };

      editTodo(id, updatedTodo)
         .then(result => history.push('/'))
         .catch(error => console.log(error));

      } 

   return ( 
      <div className="max-w-screen-lg m-auto p-3">
         <h1 className="text-5xl my-8 underline font-semibold">Edit Your Todo</h1>
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
                {/* Completed Checkbox */}
               <h1 className="text-3xl">Task Completed?</h1>
               <div>
                  <input type="checkbox" id="completedYes" name="completed" checked={completed} onChange={onCompletedChange} />
                  <label for="completedYes" className="text-xl">Yes</label>
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
 
export default EditTodos;

