import { useState } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';

function Register() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPass] = useState("")
  const [confirmpassword, setPassConfirm] = useState("")
  const [address, setAddress] = useState("")
  const [type, setType] = useState("traveler")
  const [gender, setGender] = useState("")

  const [history, setHistory] = useState("")

  async function sendData(e:any) {
    e.preventDefault();
    let checkSubmit = true;

    if (password !== confirmpassword) {
      checkSubmit = false;
    }

    if (checkSubmit) {
      
      try{
        const response = await fetch ('http://localhost:4000/auth/register', {
          method: "POST",
          headers: {"content-Type":"application/json"},
          body: JSON.stringify({name:name, email:email, password:password, address:address,type:type})
        });

        if (response.ok){
          console.log(response.status);
          console.log('register done');

          // redirect to login
        }

      }catch(error){
       console.log(error);
      }
    }
  }

  return (
    <div className="container">

      <div className="left">
        <Card sx={{maxWidth: 700}} style={{minHeight: '150vh'}}>
          <form onSubmit={sendData}>

            <CardContent>
              <h2>Register Now</h2>
              
              <div>
                <TextField required fullWidth id="name" label="username" size="small" onChange={(e) => {
                  setName(e.target.value)
                }}/>
              </div><br/>
              
              <div>
                <TextField required fullWidth id="email" type="email" label="email" size="small" onChange={(e) => {
                  setEmail(e.target.value)
                }}/>
              </div><br/>

              <div>
                <TextField required fullWidth id="password" type="password" label="password" size="small" onChange={(e) => {
                  setPass(e.target.value)
                }}/>
              </div><br/>

              <div>
                <TextField required fullWidth id="confirmpassword" type="password" label="confirm password" size="small" onChange={(e) => {
                    setPassConfirm(e.target.value)
                  }}/>
              </div><br/>
              <div>
                    <TextField required fullWidth id="address" label="address" size="small" onChange={(e) => {
                    setAddress(e.target.value)
                  }}/>
              </div><br/>

              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label type">User Type</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue="traveler"
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                >
                  <FormControlLabel value="traveler" control={<Radio/>} label="Traveler"/>
                  <FormControlLabel value="company" control={<Radio/>} label="Company"/>
                </RadioGroup>
              </FormControl>
             
              {
                type === 'traveler' ?
                  <div>
  
                    <FormControl>
                      <FormLabel id="demo-row-radio-buttons-group-label gender">Gender</FormLabel>
                      <RadioGroup
                        row
                        value={gender}
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}

                      >
                        <FormControlLabel value="male" control={<Radio/>} label="Male"/>
                        <FormControlLabel value="female" control={<Radio/>} label="Female"/>
                      </RadioGroup>
                    </FormControl>

                  </div>
                  :
                  <div>
                    <TextField id="outlined-multiline-flexible" label="History" size="small" multiline fullWidth
                    maxRows={4} onChange={(e) => {
                      setHistory(e.target.value)
                    }}/>
                  </div>

                }
            </CardContent>

            <CardActions>
              <Button variant="contained" type="submit">Register</Button>
            </CardActions>

          </form>
        </Card>
      </div>

      {/* <div className="right">
        <img className="register" src="/register.png"/>
      </div> */}

    </div>
  )
}

export default Register;
