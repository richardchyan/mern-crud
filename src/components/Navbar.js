import React, { useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import decode from 'jwt-decode';

const Navbar = ({ user, setUser }) => {
   
   const location = useLocation();
   const history = useHistory();

   function logout(){
      localStorage.clear();
      setUser(null);
      history.push('/');
   }

   useEffect(() => {
     if(user !== null){
         const token = user.token;
          // check if token is expired
      if(token){
         const decodedToken = decode(token);
         if(decodedToken.exp * 1000 < new Date().getTime()){
            logout();
         }
      }
   }
      
   setUser(JSON.parse(localStorage.getItem('profile')));

  }, [location])
   
   return ( 
      <div className="bg-niceblue py-10 text-white">
         <h1 className="mb-8">
            <Link to={user ? '/' : '/signin'} className="text-5xl">Todo Tracker and List</Link>
         </h1>
         <nav>
            { user !== null  ? (
               <div className="max-w-sm m-auto">
                  <div className="flex flex-col m-auto justify-center mb-4">
                     <Link className="text-md bg-black rounded-lg mb-2 py-2 px-3 w-3/4 m-auto" to="/">View Your List of Todos</Link>
                     <Link className="text-md bg-black rounded-lg mb-2 py-2 px-3 w-3/4 m-auto" to='/create'>Create a Todo</Link>
                     <button onClick={logout} className="text-md bg-black rounded-lg mb-2 py-2 px-3 w-3/4 m-auto">Logout</button>
                  </div>
                  <div>
                     { user.profile && (
                           <span className="text-white text-xl"> Welcome back, {user.profile.name}</span>
                        )}
                  </div>
               </div>
           ) : 
               <Link className="text-xl bg-black rounded py-2 px-3" to='/signin'>Sign In</Link>
           }
         </nav>
      </div>
    );
}
 
export default Navbar;