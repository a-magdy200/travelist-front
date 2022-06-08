import  { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
let login= ():any=>{
    const[ form , setForm ]=useState(true)
    const[ name , setName ]=useState("")
    const[ password , setPass ]=useState("")
    const[ nameError , setNameError ]=useState("")
    const[ passwordError , setPassError ]=useState("")
    const[ token , setToken ]=useState("")

   console.log(name,password)
    async function sendData(e:any) {
        e.preventDefault();  
        let checkSubmit:boolean=true;
        if(name==="")
       {
           setNameError("*Name is required");
           checkSubmit=false;
       } 
        if(password==="")
       {
            setPassError("*password is required");
            checkSubmit=false;
  
       }
       if(checkSubmit)
        {    
      const response= await fetch("http://localhost:3200/auth/login",{
          method:"POST",
          headers:{"Content-type":"application/json"},
          body: JSON.stringify({name:name , password:password})

      })
   
      if(response.ok)
      {
        let data = await response.text();
        console.log(data);

      }   
      else{

        console.log("error");
      } 
    }
        
    }
    return(
        <div>

          {
          form?
           <form onSubmit={sendData}>
               <h1>Login Page</h1>
               
               <div><TextField
          required
          fullWidth 
          id="outlined"
          label="username"
          
            
               onChange={(e):any=>{
                setName(e.target.value)
                if(e.target.value==="")
                  setNameError("*name is required") 
                else
                setNameError(" ") 

                }
            } 
              />
              <div> { nameError !==""?nameError:""}</div>
               </div>
               <br/>
               <div><TextField
            required
          fullWidth 
          id="outlined"
         label="password"
                   type="password" 
                onChange={(e):any=>{
                    setPass(e.target.value)
                    if(e.target.value==="")
                    setPassError("*password is required")  
                    else
                    setPassError(" ")  

                    }
                } 
                />
             <div>{ passwordError !==""?passwordError:""}</div>
               </div>
                <br/>
               <Button variant="contained"type="submit">Login</Button>

           </form>
           :
           <h1>hi </h1>
          }
        </div>
    )
}

export default login;