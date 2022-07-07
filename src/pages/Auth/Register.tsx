import { useState } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Checkbox from '@mui/material/Checkbox';

import { useNavigate } from "react-router-dom";
import api from "../../config/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [confirmPassword, setPassConfirm] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("traveler");
  const [gender, setGender] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [isGuide, setIsGuide] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  async function sendData(e: any) {
    e.preventDefault();
    let checkSubmit = true;

    if (password !== confirmPassword) {
      checkSubmit = false;
    }

    if (checkSubmit) {
      try {


        // const response: IResponseInterface<IUserAuthenticationResponse> = await api<IUserAuthenticationResponse>({
        //   url: "/auth/register",
        //   method: "POST",
        //   body: JSON.stringify(requestBody),
        // });


        const response = await fetch("http://localhost:4000/auth/register", {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, address, type, national_id: nationalId, gender, dateOfBirth, isGuide }),
        });


        // if (response.success) {
        //   navigatetohome
        // }else{
        //   setPass("");
        //   setPassConfirm("");
        // }


        if (response.ok) {
          console.log(response.status);
          console.log("register done");
          const USER_TOKEN = await response.text();
          const token = JSON.parse(USER_TOKEN).token;
          localStorage.setItem("TOKEN", token);
          // redirect to home
          // navigate('/profile',);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="container">
      <div className="left">
        <Card sx={{ maxWidth: 700 }} style={{ minHeight: "150vh" }}>
          <form onSubmit={sendData}>
            <CardContent>
              <h2>Register Now</h2>

              <div>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="username"
                  size="small"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <br />

              <div>
                <TextField
                  required
                  fullWidth
                  id="email"
                  type="email"
                  label="email"
                  size="small"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <br />

              <div>
                <TextField
                  required
                  fullWidth
                  id="password"
                  type="password"
                  label="password"
                  size="small"
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                />
              </div>
              <br />

              <div>
                <TextField
                  required
                  fullWidth
                  id="confirmpassword"
                  type="password"
                  label="confirm password"
                  size="small"
                  onChange={(e) => {
                    setPassConfirm(e.target.value);
                  }}
                />
              </div>
              <br />
              <div>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="address"
                  size="small"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>
              <br />

              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label type">
                  User Type
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  defaultValue="traveler"
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                >
                  <FormControlLabel
                    value="traveler"
                    control={<Radio />}
                    label="Traveler"
                  />
                  <FormControlLabel
                    value="company"
                    control={<Radio />}
                    label="Company"
                  />
                </RadioGroup>
              </FormControl>
              <div>
                  {/* profile picture */}
                </div>
              {type === "traveler" ? (
                <div>
                  <div>
                    <TextField
                      id="outlined-multiline-flexible"
                      label="National ID"
                      size="small"
                      fullWidth
                      maxRows={4}
                      onChange={(e) => {
                        setNationalId(e.target.value);
                      }}
                    />
                  </div>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label gender">
                      Gender
                    </FormLabel>
                    <RadioGroup
                      row
                      value={gender}
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    >
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                      />
                    </RadioGroup>
                  </FormControl>
                <div>
                  {/* dateof birth */}

                  <TextField
                      id="outlined-flexible"
                      size="small"
                      label="Date of Birth"
                      fullWidth
                      maxRows={4}
                      onChange={(e) => {
                        setDateOfBirth(e.target.value);
                        console.log(dateOfBirth);
                      }}
                    />
                </div>
                <div>
                  <FormControlLabel control={<Checkbox defaultChecked/>} label="Is Guide" onChange={(e) => {
                    setIsGuide(!isGuide)
                    console.log(isGuide)
                  }}/>
                </div>
            </div>

              ) : (
                <div>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Description"
                    size="small"
                    multiline
                    fullWidth
                    maxRows={4}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>
              )}
            </CardContent>

            <CardActions>
              <Button variant="contained" type="submit">
                Register
              </Button>
            </CardActions>
          </form>
        </Card>
      </div>

      {/* <div className="right">
        <img className="register" src="/register.png"/>
      </div> */}
    </div>
  );
}

export default Register;
