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
import ProfilePictureChanger from '../../components/Profile/ProfilePictureChanger'
import { useNavigate } from "react-router-dom";

const EditUser=()=>{
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [isGuide, setIsGuide] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");

  const navigate = useNavigate();

  async function sendData(e: any) {
    e.preventDefault();
    let checkSubmit = true;

    if (checkSubmit) {
      try {
        const response = await fetch("http://localhost:4000/", {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify({ name, email, address}),
        });

        if (response.ok) {
          console.log(response.status);
          console.log(" done");
          
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="container"   style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    
    }}>
      <div className="left">
        <Card sx={{ maxWidth: 700 }} style={{ minHeight: "100vh" }}>
          <form onSubmit={sendData}>
            <CardContent>
              <h2>Edit Basic Info</h2>
              <ProfilePictureChanger />
              <div>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="username"
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
                  id="address"
                  label="address"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </div>
              <br />
            

             
            </CardContent>

            <CardActions>
              <Button variant="contained" type="submit">
              Save Changes
              </Button>
            </CardActions>
          </form>
        </Card>
      </div>

    </div>
  );
}
export default EditUser;

