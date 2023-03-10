import { Box,TextField,Button,Typography } from '@mui/material'
import React,{useState} from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Login = () => {
  const history = useNavigate();
  const [inputs,setInputs] = useState({
    email:"",
    password:"",
  });

  const handleChange = (e) => {
    setInputs((prev)=>({
        ...prev,
        [e.target.name]:e.target.value,
    }));
    // console.log(e.target.name,"value",e.target.value);
  };

  const sendRequest = async() => {
    const res = await axios.post('http://localhost:5000/api/login',{
        email:inputs.email,
        password:inputs.password
    }).catch(err => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputs);
    //send http request
    sendRequest().then(()=>{history('/user')});
  };

 

  return (
    <div>
      <form onSubmit={handleSubmit}>
            <Box width={300} marginLeft="auto" marginRight="auto" marginTop={10} display="flex" flexDirection={'column'} justifyContent="center" alignItems="center">
                <Typography variant="h2">Login</Typography>
                <TextField name="email" onChange={handleChange} value={inputs.email} type={"email"} variant="outlined" placeholder="email" margin="normal"/>
                <TextField name="password" onChange={handleChange} value={inputs.password} type={"password"} variant="outlined" placeholder="password" margin="normal"/>
                <Button type="submit" variant="contained">Login</Button>
            </Box>
      </form>
    </div>
  )
}

export default Login
