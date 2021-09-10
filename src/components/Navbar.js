import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import decode from 'jwt-decode';

const Navbar = ({ user, setUser }) => {
   
   const useStyles = makeStyles(theme => ({

      appBar: {
         padding: '30px',
         backgroundColor: '#5995da',
      },

   }));

   const classes = useStyles();
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
      <div>
         <AppBar className={classes.appBar} position="static">
         <Link to={user ? '/' : '/signin'} className="text-6xl mb-4">Todo Tracker</Link>
         <nav >
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
         </AppBar>
      </div>
    );
}
 
export default Navbar;