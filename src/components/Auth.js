import React, { useState } from 'react';
import { signin, signup } from 'api';
import { useHistory } from 'react-router-dom';

const Auth = () => {

   const [isSignup, setIsSignup] = useState(false);
   const [formData, setFormData] = useState({firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
   const history = useHistory();
   const [showAlert, setShowAlert] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         if(isSignup){
            const response = await signup(formData);
            localStorage.setItem('profile', JSON.stringify(response.data));
         } else {
            const response = await signin(formData);
            localStorage.setItem('profile', JSON.stringify(response.data));
         }
         history.push('/');
      } catch (error) {
         // console.log(error.response.data.message);
         setShowAlert(true);
         setErrorMessage(error.response.data.message);
      }
   }

   function handleChange(e){
      setFormData({...formData, [e.target.name]: e.target.value});
   }

   function toggleSignin(){
      setIsSignup(prevIsSignup => !prevIsSignup);
      setFormData({firstName: '', lastName: '', email: '', password: '', confirmPassword: '' })
      setShowAlert(false);
   }

   return (
      <div>
         <h1 className="text-4xl mt-4">{isSignup ? 'Register Your Account': 'Sign in to Create and View Todos'} </h1>
         {/* Login error alert */}
         <div className={ showAlert ? "block bg-gray-200 border-2 border-gray-300 rounded-md mt-4 text-red-600 m-auto p-4 fade-in max-w-screen-sm w-5/12" : "hidden"}>
            <span className="text-xl">{errorMessage}</span>
         </div>
         {/* Login form */}
         <form onSubmit={handleSubmit} className="max-w-lg m-auto mt-4 p-4 text-2xl">
            { isSignup && 
               <>
                  <div className="flex justify-between mb-1 p-1">
                     <label for="firstName">First name: </label>
                     <input onChange={handleChange} className="border-2 border-black" type="text" id="firstName" name="firstName" placeholder="First name" required/>
                  </div>
                  <div className="flex justify-between mb-1 p-1">
                     <label for="lastName">Last name: </label>
                     <input onChange={handleChange} className="border-2 border-black" type="text" id="lastName" name="lastName" placeholder="Last name" required/>
                  </div>
               </>
            }            
            <div className="flex justify-between mb-1 p-1">
               <label for="email">Email: </label>
               <input onChange={handleChange} className="border-2 border-black" type="text" id="email" name="email" placeholder="email" required/>
            </div>
            <div className="flex justify-between mb-1 p-1">
               <label for="password">Password: </label>
               <input onChange={handleChange} className="border-2 border-black" type="password" id="password" name="password" placeholder="password" required/>
            </div>
            { isSignup &&
               <div className="flex justify-between mb-1 p-1">
                  <label for="confirmPassword">Confirm Password: </label>
                  <input onChange={handleChange} className="border-2 border-black" type="password" id="confirmPassword"  name="confirmPassword" placeholder="Confirm password" required/>
               </div>
            }
            <div>
               <button type="submit"className="border-2 border-black rounded-md bg-blue-600 text-white p-2 mt-2"> Submit</button>
               <button type="button" className="text-sm p-2 mt-2 block m-auto" onClick={toggleSignin}> { !isSignup ? 'Don\'\t have an account? Click here to register' : 'Already have an account? Click to sign in' } </button>
            </div>
         </form>
      </div>
   )
}

export default Auth;
