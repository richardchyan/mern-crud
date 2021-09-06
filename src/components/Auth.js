import React, { useState } from 'react';
import { signin, signup } from 'api';

const Auth = () => {

   const [isSignup, setIsSignup] = useState(false);
   const [formData, setFormData] = useState({firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });


   const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(formData);
      if(isSignup){
         const response = await signup(formData)
         console.log(response);
      } else {
         const response = await signin(formData);
         console.log(response);
      }
   }

   function handleChange(e){
      setFormData({...formData, [e.target.name]: e.target.value});
   }

   function toggleSignin(){
      setIsSignup(prevIsSignup => !prevIsSignup);
      setFormData({firstName: '', lastName: '', email: '', password: '', confirmPassword: '' })
   }

   return (
      <div>
         <h1 className="text-4xl mt-4">{isSignup ? 'Register Your Account': 'Sign in to Create and View Todos'} </h1>
         <form onSubmit={handleSubmit} className="max-w-lg m-auto mt-4 p-4 text-2xl">
            { isSignup && 
               <>
                  <div className="flex justify-between mb-1 p-1">
                     <label for="firstName">First name: </label>
                     <input onChange={handleChange} className="border-2 border-black" type="text" id="firstName" name="firstName" placeholder="First name" />
                  </div>
                  <div className="flex justify-between mb-1 p-1">
                     <label for="lastName">Last name: </label>
                     <input onChange={handleChange} className="border-2 border-black" type="text" id="lastName" name="lastName" placeholder="Last name" />
                  </div>
               </>
            }            
            <div className="flex justify-between mb-1 p-1">
               <label for="email">Email: </label>
               <input onChange={handleChange} className="border-2 border-black" type="text" id="email" name="email" placeholder="email" />
            </div>
            <div className="flex justify-between mb-1 p-1">
               <label for="password">Password: </label>
               <input onChange={handleChange} className="border-2 border-black" type="password" id="password" name="password" placeholder="password" />
            </div>
            { isSignup &&
               <div className="flex justify-between mb-1 p-1">
                  <label for="confirmPassword">Confirm Password: </label>
                  <input onChange={handleChange} className="border-2 border-black" type="password" id="confirmPassword"  name="confirmPassword" placeholder="Confirm password" />
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
