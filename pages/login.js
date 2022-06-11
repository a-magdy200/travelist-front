import { useState } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { ChangeEvent } from "react";



function Login(){
    const [form,setForm]=useState(true)
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [nameErr,setNameErr]=useState("")
    const [passwordErr,setPasswordErr]=useState("")
    const [error,setError]=useState(null)
    const [resData,setResData]=useState("")
    
    async function sumbitLogin(e){
      e.preventDefault();
      let canSubmit=true;
      if(name==""){
        setNameErr("Name is required")
        canSubmit=false;
      }else{
        setNameErr("")
      }
      if(password==""){
        setPasswordErr("Password is required")
        canSubmit=false;
      }else{
        setPasswordErr("")
      }
      if(!canSubmit){
        return;
      }
      try{
      const response=await fetch("http://localhost:3000/login",{
        method: "POST",
        headers:{"content-Type":"application/json"},
        body:JSON.stringify({name:name,password:password})
   })
   if (response.ok){
    
     let data=await response.text();
     setResData(data);
     setError(null);
     setForm(false);
     
  } //else there is a problem with the api (the endpoint we are trying to reach doesnot exist or request is denied)
 else{
   throw Error('Could not Login');
 }
    
  }catch(err){ //catch network connection error
   // console.log(err.message);  
   setError(err.message);
  }
}
    
return<div>
   {
form?<div style={{
  display: 'flex',
  flexDirection:'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
}}>
 
     <h1>Login Form</h1>
     <form onSubmit={sumbitLogin}>
    <div> 
        <p>Name</p>
         <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue=""
          onChange={(e)=>{
              setName(e.target.value)
              if(e.target.value==""){
                setNameErr("Name is required")
              }else{
                setNameErr("")
              }
          }}
        />
        
        </div>
        <div>
           {nameErr !=="" ? nameErr: ""}
                </div>
     
      <div>
        <p>Password</p>  
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(e)=>{
            setPassword(e.target.value)
            if(e.target.value==""){
              setPasswordErr("password is required")
            }else{
              setPasswordErr("")
            }
        }}
        />
        </div>
          <div>
                    {passwordErr !=="" ? passwordErr: ""}
                </div>
         
        
         <div>
         <Button variant="contained" type='submit'>Submit</Button>
         </div>
         <div>
                    {error!=="" ? error: ""}
                </div>
         
         
         </form>
 </div>

 :
 <div>{resData}</div>


}
</div>
}

export default Login;