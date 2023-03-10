import React,{useState} from 'react';
import {authActions} from '../store';
import {AppBar, Tabs, Tab,Box,Toolbar, Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
axios.defaults.withCredentials = true;

const Header = () => {
  const dispatch = useDispatch();
 const isLoggedIn = useSelector((state) => state.isLoggedIn);
 const sendLogoutReq = async()=>{
    const res = await axios.post("http://localhost:5000/api/logout", null,{
      withCredentials:true,
    });
    if(res.status === 200){
      return res;
    }
    return new Error("Unable to log out. please try again");
 }
 const handelLogout = ()=>{
  sendLogoutReq().then(()=>dispatch(authActions.logout()))
 }
 const [value,setValue] = useState();

  return (
    <div>
        <AppBar position="sticky">
           <Toolbar>
            <Typography variant="h3">MernAuth</Typography>
            <Box sx={{marginLeft:"auto"}}>
                <Tabs onChange={(e,val)=>setValue(val)} value={value} textColor='inherit' indicatorColor='secondary'>
                    {!isLoggedIn && 
                    <>{" "} 
                    <Tab LinkComponent={Link} to="/login" label="Login"/>
                    <Tab LinkComponent={Link} to="signup" label="Signup"/>
                    </>}
                   {isLoggedIn && <Tab onClick={handelLogout} LinkComponent={Link} to="/" label="Logout"/>
                   } 
                </Tabs>
            </Box>
           </Toolbar>
        </AppBar>
    </div>
  )
}

export default Header;
