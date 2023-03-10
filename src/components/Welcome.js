import React,{useEffect,useState} from 'react'
import axios from 'axios';
axios.defaults.withCredentials = true;
let firstRender = true;

const Welcome = () => {
  const [user,setUser] = useState();

  const refershToken = async()=>{
    const res = await axios.get("http://localhost:5000/api/refresh",{
      withCredentials:true
    }).catch(err => console.log(err))
    const data = await res.data;
    return data;
  }

  const sendRequest = async() => {
    const res = await axios.get('http://localhost:5000/api/user',{
      withCredentials:true
    }).catch(err => {console.log(err)});
    const data = await res.data;
    return data;
  }

  useEffect(() =>{
    if(firstRender){
      firstRender = false;
      sendRequest().then((data)=>setUser(data.user))
    }
    let interval = setInterval(() =>{
      refershToken().then(data=>setUser(data.user));
    },1000*29)

    return ()=> clearInterval(interval);
    
  },[]);

  return (
    <div>
     {user && <h1>Welcome {user.name}</h1>}
     <h1>YOUR LOGIN PROCESS HAS SUCCESSFULLY COMPLETE</h1>
    </div>
  )
}

export default Welcome
