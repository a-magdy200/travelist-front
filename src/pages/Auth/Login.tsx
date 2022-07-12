import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField/TextField";
import {useState} from "react";
import {IResponseInterface} from "../../config/interfaces/IResponse.interface";
import api from "../../config/api";
import {ILoginRequestBody} from "../../config/interfaces/ILoginRequestBody.interface";
import {LoadingButton} from "@mui/lab";
import useAuth from "../../hooks/useAuth";
import {IUserAuthenticationResponse} from "../../config/interfaces/IUserAuthenticationResponse.interface";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {login} = useAuth();
  async function sendData(e: any) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const requestBody: ILoginRequestBody = {
        email, password
      }
      const response: IResponseInterface<IUserAuthenticationResponse> = await api<IUserAuthenticationResponse>({
        url: "/auth/login",
        method: "POST",
        body: JSON.stringify(requestBody),
      });

      if (response.success) {
        if (response.data) {
          const {user, access_token} = response.data;
          login(user, access_token);
          console.log(user)
        }
      }
    } catch (error: any) {
      console.log(JSON.stringify(error));
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }
  const isDisabled = (): boolean => {
    return isLoading || email === '' || password === '';
  };
  return (
    <div className="container">
      <div>
        <Card sx={{maxWidth: 700}}>
          <form onSubmit={sendData}>
            <CardContent>
              <h2>Log In</h2>

              <div>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>

              <div>
                <TextField
                  required
                  fullWidth
                  id="password"
                  type="password"
                  label="password"
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                />
              </div>
            </CardContent>

            <CardActions>
              <LoadingButton disabled={isDisabled()} loading={isLoading} variant="contained" type="submit">
                Log In
              </LoadingButton>
            </CardActions>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default Login;
