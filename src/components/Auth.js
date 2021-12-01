import React, { useState } from 'react';
import { signin, signup } from 'api';
import { useHistory } from 'react-router-dom';
import spinner from 'images/checkout-spinner.gif';

const Auth = () => {

   const [isSignup, setIsSignup] = useState(false);
   const [formData, setFormData] = useState({firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
   const history = useHistory();
   const [pending, setPending] = useState(false);
   const [showAlert, setShowAlert] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();
      setPending(true);
      try {
         if(isSignup){
            const response = await signup(formData);
            localStorage.setItem('profile', JSON.stringify(response.data));
         } else {
            const response = await signin(formData);
            localStorage.setItem('profile', JSON.stringify(response.data));
         }
         setPending(false);
         history.push('/');
      } catch (error) {
         setShowAlert(true);
         setErrorMessage(error.response.data.message);
         setPending(false);
      }
   }

   function handleChange(e){
      setFormData({...formData, [e.target.name]: e.target.value});
   }

   function toggleSignin(e){
      setIsSignup(prevIsSignup => !prevIsSignup);
      setFormData({firstName: '', lastName: '', email: '', password: '', confirmPassword: '' })
      setShowAlert(false);
   }

   return (
      <div>
         <h1 className="text-4xl mt-4">{isSignup ? 'Register Your Account': 'Sign in to Create, View, and Edit your Tasks'} </h1>
         {/* ======= Submit Visual Spinner ====== */}
         {/* <div className="flex justify-center items-center text-xl rounded space-x-2 my-2 p-1 border-2 border-gray-300 max-w-sm w-5/12 m-auto"> 
         <p>Signing up</p><img src={spinner} style={{ height: '25px', width: '25px'}} alt="" /></div> */}
         {/* ====== Login error alert ====== */}
         <div className={ showAlert ? "block bg-gray-100 border-2 border-gray-300 rounded-lg mt-4 text-red-600 m-auto p-4 fade-in max-w-sm w-5/12" : "hidden"}>
            <span className="text-xl">{errorMessage}</span>
         </div>
         {/* Login form */}
         <form onSubmit={handleSubmit} className="px-4">
            <div className="max-w-sm m-auto rounded-lg bg-gray-50 mt-4 p-4 text-2xl border-2 border-gray-300">
               <div>
                  { isSignup && 
                     <>
                        <div className="mb-1 p-1">                        
                           <input onChange={handleChange} value={formData.firstName} className="text-base py-2 px-3 w-full bg-gray-200 focus:bg-gray-100 border-2 border-gray-100 rounded-lg focus:ring focus:ring-blue-400 focus:outline-none" type="text" id="firstName" name="firstName" placeholder="First name" required/>
                        </div>
                        <div className="mb-1 p-1">

                           <input onChange={handleChange} value={formData.lastName} className="text-base py-2 px-3 w-full bg-gray-200 focus:bg-gray-100 border-2 border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" type="text" id="lastName" name="lastName" placeholder="Last name" required/>
                        </div>
                     </>
                   }            
                  <div className="mb-1 p-1">
                     <input onChange={handleChange} value={formData.email} className="text-base py-2 px-3 w-full bg-gray-200 focus:bg-gray-100 border-2 border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" type="text" id="email" name="email" placeholder="email" required/>
                  </div>
                  <div className="mb-1 p-1">                     
                     <input onChange={handleChange} value={formData.password} className="text-base py-2 px-3 w-full bg-gray-200 focus:bg-gray-100 border-2 border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" type="password" id="password" name="password" placeholder="password" required/>
                  </div>
                  { isSignup &&
                     <div className="mb-1 p-1" >                        
                        <input onChange={handleChange} value={formData.confirmPassword} className="text-base py-2 px-3 w-full bg-gray-200 focus:bg-gray-100 border-2 border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" type="password" id="confirmPassword"  name="confirmPassword" placeholder="Confirm password" required/>
                     </div>
                  }
                  <div>
                     <button type="submit" className="border-2 border-black rounded-md bg-blue-600 text-white text-lg p-2 mt-2 w-1/3">{!pending ? 'Submit' : <img src={spinner} style={{ height: '25px', width: '25px'}} alt="spinner" className="m-auto" /> }</button>
                     <button type="button" className="text-sm p-2 mt-2 block m-auto" onClick={toggleSignin}> { !isSignup ? 'Don\'t have an account? Click here to register' : 'Already have an account? Click to sign in' } </button>
                  </div>
               </div>
            </div>
         </form>
      </div>
   )
}

export default Auth;
