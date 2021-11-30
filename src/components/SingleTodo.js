import { Link } from 'react-router-dom';
import moment from 'moment';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai'

const SingleTodo = ({ todo }) => {

return ( 

      <div className="mb-8 border-2 border-gray-400 rounded-xl py-8 overflow-auto">
            <div className="margin-auto">
                  <span className="text-2xl semibold mr-2">Title:</span><span className={todo.completed ? "completed" : ''}>{todo.title}</span>
            </div>
            <div className="margin-auto">
                  <span className="text-2xl semibold mr-2">Description:</span><span className={todo.completed ? "completed" : ''}> {todo.description}</span>
            </div>
            <div className="margin-auto">
                  <span className="text-2xl semibold mr-2">Importance:</span><span className={todo.completed ? "completed" : ''}> { todo.importance}</span>
            </div>
            <div className="margin-auto">
                  <span className="text-2xl semibold mr-2">Completed: </span><span> {todo.completed ? 'Yes' : 'No'}</span>
            </div>
            <div className="margin-auto">
                  <span>{todo.createdAt === todo.updatedAt ? 'Created: ' : 'Updated: '} </span>
                  <span>{todo.createdAt === todo.updatedAt ? moment(todo.createdAt).fromNow() : moment(todo.updatedAt).fromNow()}</span>
            </div>
            <div className="grid grid-cols-1 mt-4 space-y-6">
                  <Link to={`/edit/${todo._id}`} className="flex justify-center space-x-2 w-1/2 m-auto p-2 text-base tracking-tight text-white bg-green-600 rounded-xl hover:shadow-lg border-2 border-gray-100"><span>Edit</span>  <FiEdit className="text-2xl" /></Link>
                  <Link to={`/delete/${todo._id}`} className="flex justify-center space-x-2 w-1/2 m-auto p-2 text-base tracking-tight text-white bg-red-500 rounded-xl hover:shadow-lg border-2 border-gray-100"><span>Delete</span> <AiOutlineDelete className="text-2xl"/></Link>
                  
                  {/* Using a button with direct onclick to the api call requires refreshing of page without using of async actions with reducers, so it doesn't work. The link redirect to an delete component render can call the api method and then use history to push back to homepage, you can only use the history hook in a function component, not  */}
                  {/* <button onClick={() => deleteTodo(todo._id)} className="w-1/2 m-auto p-2 text-lg text-white bg-red-600 rounded border-2 border-gray-100">Delete Item</button> */}
            </div>
      </div>

    );
}
 
export default SingleTodo;