import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { AppBar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const Navbar = () => {
   
   const useStyles = makeStyles(theme => ({

      appBar: {
         padding: '30px',
         backgroundColor: '#5995da',
      },

   }));

   const classes = useStyles();
   const location = useLocation();
   const history = useHistory();

   const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  useEffect(() => {
     if(user !== null){
         const token = user.token;
     }
     setUser(JSON.parse(localStorage.getItem('profile')));

  }, [location])
  
   function logout(){
      localStorage.clear();
      setUser(null);
      history.push('/signin');
   }
   
   return ( 
      <div>
         <AppBar className={classes.appBar} position="static">
         <Link to={user ? '/' : '/signin'} className="text-6xl mb-4">Todo Tracker</Link>
         <nav className="flex justify-center space-x-10">
            { user !== null ? (
               <>
                  <Link className="text-xl bg-black rounded py-2 px-3" to="/">View Your List of Todos</Link>
                  <Link className="text-xl bg-black rounded py-2 px-3" to='/create'>Create a Todo</Link>
                  <button onClick={logout}className="text-xl bg-black rounded py-2 px-3">LOGOUT</button>
               </>
           ) : 
               <Link className="text-xl bg-black rounded py-2 px-3" to='/signin'>Sign In</Link>
           }
            
         </nav>
         </AppBar>
      </div>
    );
}
 
export default Navbar;