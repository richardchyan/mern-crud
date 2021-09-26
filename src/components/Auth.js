import React, { useState } from 'react';
import { signin, signup } from 'api';
import { useHistory } from 'react-router-dom';
import spinner from 'images/checkout-spinner.gif';

const Auth = () => {

   const [isSignup, setIsSignup] = useState(false);
   const [formData, setFormData] = useState({firstName: '', lastName: '', email: '', password: '', confirmPassword: '' });
   const history = useHistory();
   const [submitSpinner, setSubmitSpinner] = useState(false);
   const [showAlert, setShowAlert] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         if(isSignup){
            const response = await signup(formData);
            localStorage.setItem('profile', JSON.stringify(response.data));
            setSubmitSpinner(true);
         } else {
            const response = await signin(formData);
            localStorage.setItem('profile', JSON.stringify(response.data));
            setSubmitSpinner(true);
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

   function toggleSignin(e){
      setIsSignup(prevIsSignup => !prevIsSignup);
      setFormData({firstName: '', lastName: '', email: '', password: '', confirmPassword: '' })
      setShowAlert(false);
   }

   return (
      <div>
         <h1 className="text-4xl mt-4">{isSignup ? 'Register Your Account': 'Sign in to Create, View, and Edit your Todos'} </h1>
         {/* ======= Submit Visual Spinner ====== */}
         <div className={submitSpinner ? "border-2 border-black rounded-md p-4 fade-in max-w-screen-sm m-auto" : "hidden"}>
            { isSignup ? <div className="flex justify-center items-center text-xl rounded space-x-2 my-2 p-1 border-2 border-black max-w-sm w-5/12 m-auto"> <p>Signing up ...</p> <img src={spinner} alt="login spinner style={{ height: '25px', width: '25px'}}" /></div> : <div className="flex justify-center items-center text-xl rounded space-x-2 my-2 p-1 border-2 border-black max-w-sm w-5/12 m-auto"> <p>Signing in ...</p> <img src={spinner} alt="login spinner" style={{ height: '25px', width: '25px'}} /></div>}
         </div>
         {/* <div className="flex justify-center items-center text-xl rounded space-x-2 my-2 p-1 border-2 border-gray-100 max-w-sm w-5/12 m-auto"> 
            <p>Signing up</p>
            <img src={spinner} style={{ height: '25px', width: '25px'}} alt="" />
         </div> */}
         {/* ====== Login error alert ====== */}
         <div className={ showAlert ? "block bg-gray-100 border-2 border-gray-300 rounded-md mt-4 text-red-600 m-auto p-4 fade-in max-w-sm w-5/12" : "hidden"}>
            <span className="text-xl">{errorMessage}</span>
         </div>
         {/* Login form */}
         <form onSubmit={handleSubmit}>
            <div className="max-w-sm m-auto rounded shadow bg-gray-50 mt-4 p-4 text-2xl">
               <div>
                  { isSignup && 
                     <>
                        <div className="mb-1 p-1">
                           {/* <label for="firstName" className="text-lg tracking-wider">First name: </label> */}
                           <input onChange={handleChange} value={formData.firstName} className="text-base py-2 px-3 w-full bg-gray-200 focus:bg-gray-100 border-2 border-gray-100 rounded-lg focus:ring focus:ring-blue-400 focus:outline-none" type="text" id="firstName" name="firstName" placeholder="First name" required/>
                        </div>
                        <div className="mb-1 p-1">
                           {/* <label for="lastName" className="text-lg">Last name: </label> */}
                           <input onChange={handleChange} value={formData.lastName} className="text-base py-2 px-3 w-full bg-gray-200 focus:bg-gray-100 border-2 border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" type="text" id="lastName" name="lastName" placeholder="Last name" required/>
                        </div>
                     </>
                   }            
                  <div className="mb-1 p-1">
                     {/* <label for="email" className="text-lg">Email: </label> */}
                     <input onChange={handleChange} value={formData.email} className="text-base py-2 px-3 w-full bg-gray-200 focus:bg-gray-100 border-2 border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" type="text" id="email" name="email" placeholder="email" required/>
                  </div>
                  <div className="mb-1 p-1">
                     {/* <label for="password" className="text-lg">Password: </label> */}
                     <input onChange={handleChange} value={formData.password} className="text-base py-2 px-3 w-full bg-gray-200 focus:bg-gray-100 border-2 border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" type="password" id="password" name="password" placeholder="password" required/>
                  </div>
                  { isSignup &&
                     <div className="mb-1 p-1" >
                        {/* <label for="confirmPassword" className="text-lg">Confirm Password: </label> */}
                        <input onChange={handleChange} value={formData.confirmPassword} className="text-base py-2 px-3 w-full bg-gray-200 focus:bg-gray-100 border-2 border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" type="password" id="confirmPassword"  name="confirmPassword" placeholder="Confirm password" required/>
                     </div>
                  }
                  <div>
                     <button type="submit" className="border-2 border-black rounded-md bg-blue-600 text-white p-2 mt-2">Submit</button>
                     <button type="button" className="text-sm p-2 mt-2 block m-auto" onClick={toggleSignin}> { !isSignup ? 'Don\'t have an account? Click here to register' : 'Already have an account? Click to sign in' } </button>
                  </div>
               </div>
            </div>
         </form>
      </div>
   )
}

export default Auth;
