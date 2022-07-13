import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button";
import ProfilePictureChanger from '../../components/Profile/ProfilePictureChanger'
import { IResponseInterface } from '../../config/interfaces/IResponse.interface'
import { IUserInterface } from '../../config/interfaces/IUser.interface'
import { useNavigate } from "react-router-dom";

const EditUser=()=>{
  const { id } = useParams()
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [user, setUser] = useState<IUserInterface>()
  
  const navigate = useNavigate();

	
	const getUser = async () => {
		try {
			const response: IResponseInterface<IUserInterface> =
				await api<IUserInterface>({
					url: `/api/users/${id}`,
				})

			if (response.success) {
				if (response.data) {
					setName(response.data)
					setEmail(response.data.name)
					setAddress(response.data.max_seats)
					console.log('res', response.data)
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	useEffect(() => {
		getUser()
	}, [])


	async function sendData(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		const requestBody: IUserInterface = {
			name,
			email,
      password,
      address,
      type,
		}
       if(!isDisabled)
	{	try {
			const response: IResponseInterface<IUserInterface> =
				await api<IUserInterface>({
					url: `/api/user/${id}`,
					method: 'PUT',
					body: JSON.stringify(requestBody),
				})

			if (response.success) {
				if (response.data) {
					setUser(response.data)
				//	navigate('/')
				}
			}
		} catch (error: any) {
			console.log(error)
		}
	}
	else
	{
		alert("validation error")
	}
	}
	const isDisabled = (): boolean => {
  return  name==='' ||email===''||address=='';
		
	  };
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

