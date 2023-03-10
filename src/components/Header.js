import React,{useState} from 'react'
import {AppBar, Tabs, Tab,Box,Toolbar, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
 const isLoggedIn = useSelector((state) => state.isLoggedIn);
 const [value,setValue] = useState();
  return (
    <div>
        <AppBar position="sticky">
           <Toolbar>
            <Typography variant="h3">MernAuth</Typography>
            <Box sx={{marginLeft:"auto"}}>
                <Tabs onChange={(e,val)=>setValue(val)} value={value} textColor='inherit' indicatorColor='secondary'>
                    <Tab LinkComponent={Link} to="/login" label="Login"/>
                    <Tab LinkComponent={Link} to="signup" label="Signup"/>
                   {isLoggedIn && <Tab LinkComponent={Link} to="/" label="Logout"/>
                   } 
                </Tabs>
            </Box>
           </Toolbar>
        </AppBar>
    </div>
  )
}

export default Header;
