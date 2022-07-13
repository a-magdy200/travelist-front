import { useState ,useEffect} from "react";
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
import { IResponseInterface } from '../../config/interfaces/IResponse.interface';
import {IUserInterface} from '../../config/interfaces/IUser.interface'
import { useParams } from "react-router-dom";
import api from "../../config/api";

const EditUser=()=>{
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [isGuide, setIsGuide] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [userDetails, setUserDetails] = useState<IUserInterface>()
  const {id} = useParams()
  const getUserProfileData = async () => {
		try {
			const response: IResponseInterface<IUserInterface> =
				await api<IUserInterface>({
					url: `/api/users/${id}`,
					method: 'GET',
				})

			if (response.success) {
				if (response.data) {
					setUserDetails(response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}	
  useEffect(() => {
		getUserProfileData()
	}, [])
  console.log('user details',userDetails)

  // async function sendData(e: any) {
  //   e.preventDefault();
  //   let checkSubmit = true;

  //   if (checkSubmit) {
  //     try {
  //       const response = await fetch("http://localhost:4000/", {
  //         method: "POST",
  //         headers: { "content-Type": "application/json" },
  //         body: JSON.stringify({ name, email, address}),
  //       });

  //       if (response.ok) {
  //         console.log(response.status);
  //         console.log(" done");
          
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }

  return (
    <div className="container">
      <div className="left">
        <Card sx={{ maxWidth: 700 }} style={{ minHeight: "150vh" }}>
          <form>
            <CardContent>
              <h2>Edit Basic Info</h2>

              <div>
                <TextField
                  className="inputText"
                  label="Outlined secondary"
                  variant="outlined"
                  required
                  //value ={userDetails?.name}
                  value='ede'
                  size="small"
                  onChange={(e) => {
                    setName(e.target.value)
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
                  value={userDetails?.email}
                  size="small"
                  // onChange={(e) => {
                  //   setEmail(e.target.value);
                  // }}
                  // focused
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
                  value={userDetails?.address}
                  // onChange={(e) => {
                  //   setAddress(e.target.value);
                  // }}
                  // focused
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

