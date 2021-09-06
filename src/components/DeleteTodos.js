import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { deleteTodo } from 'api';

const DeleteTodos = () => {

   const { id } = useParams();
   const history = useHistory();

   useEffect(() => {

      // axios.delete(`http://localhost:4000/todos/delete/${id}`)
      deleteTodo(id)
         .then(result => {
            history.push('/');
         })
         .catch(error => console.log(error));
   }, [])

   return ( 
      <div>

      </div>
    );
}
 
export default DeleteTodos;