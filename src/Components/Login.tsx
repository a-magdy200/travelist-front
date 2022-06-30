import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

function Login() {

  const [name, setName] = useState("")
  const [password, setPass] = useState("")

  const[nameError, setNameError] = useState("")
  const[passwordError, setPasswordError] = useState("")

  async function sendData(e:any) {
    e.preventDefault();
    let checkSubmit = true;

    if (name === "") {
      setNameError('User Name is required');
      checkSubmit = false;
    }

    if (password === "") {
      setPasswordError('Password is required');
      checkSubmit = false;
    }

    if (checkSubmit) {
      
      try{
        const response = await fetch ('http://localhost:3000/auth/login', {
          method: "POST",
          headers: {"content-Type":"application/json"},
          body: JSON.stringify({name:name, password:password})
        });

        if (response.ok){
          console.log('loggind done');
          let USER_TOKEN = await response.text();
          let token =  JSON.parse(USER_TOKEN).token;
          localStorage.setItem('TOKEN', token);
        }

      }catch(error){
       console.log(error);
      }
    }
  }

  return (
    <div className="container">

      <div>
        <Card sx={{maxWidth: 700}} style={{minHeight: '150vh'}}>
          <form onSubmit={sendData}>

            <CardContent>
              <h2>Log In</h2>
              
              <div>
                <TextField required fullWidth id="name" label="username" onChange={(e) => {
                  setName(e.target.value)
                }}/>
              </div><br/>
              
              <div>
                <TextField required fullWidth id="password" type="password" label="password" onChange={(e) => {
                  setPass(e.target.value)
                }}/>
              </div>
            </CardContent>

            <CardActions>
              <Button variant="contained" type="submit">Log In</Button>
            </CardActions>

          </form>
        </Card>
      </div>

    </div>
  )
}

export default Login;
