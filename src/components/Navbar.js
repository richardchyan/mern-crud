import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
   const [user, setUser] = useState();
   
   return ( 
      <div>
         <AppBar className={classes.appBar} position="static">
         <Link to="/" className="text-6xl mb-4">Todo Tracker</Link>
         <nav className="flex justify-center space-x-10"> 
            <Link className="text-xl bg-black rounded py-2 px-3" to="/">View Your List of Todos</Link>
            <Link className="text-xl bg-black rounded py-2 px-3" to='/create'>Create a Todo</Link>
            <Link className="text-xl bg-black rounded py-2 px-3" to='/signin'>Sign In</Link>
         </nav>
         </AppBar>
      </div>
    );
}
 
export default Navbar;