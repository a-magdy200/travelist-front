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

const EditTraveler=()=> {
  
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
          body: JSON.stringify({  national_id: nationalId, gender, dateOfBirth, isGuide }),
        });

        if (response.ok) {
          console.log(response.status);
          console.log("done");
     
          // navigate('/profile',);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="container" style={{
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}}>
      <div className="left">
        <Card sx={{ maxWidth: 700 }} style={{ minHeight: "150vh" }}>
          <form onSubmit={sendData}>
            <CardContent>
              <h2>Edit Details</h2>
			  <ProfilePictureChanger />
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

export default EditTraveler;
