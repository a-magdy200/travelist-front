import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";
import { IResponseInterface } from "../../config/interfaces/IResponse.interface";
import api from "../../config/api";
import { ILoginRequestBody } from "../../config/interfaces/ILoginRequestBody.interface";
import { LoadingButton } from "@mui/lab";
import useAuth from "../../hooks/useAuth";
import { IUserAuthenticationResponse } from "../../config/interfaces/IUserAuthenticationResponse.interface";
import CustomInputField from "../../components/Form/CustomInputField";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import {ReactComponent as LoginImage} from '../../assets/images/login.svg';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { makeAuth } = useAuth();
  const navigate = useNavigate();

  async function sendData(e: any) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const requestBody: ILoginRequestBody = {
        email,
        password
      };

      const response: IResponseInterface<IUserAuthenticationResponse> =
        await api<IUserAuthenticationResponse>({
          url: "/auth/login",
          method: "POST",
          body: JSON.stringify(requestBody)
        });

      if (response.success) {
        if (response.data) {
          makeAuth(response.data);
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
    return isLoading || email === "" || password === "";
  };
  return (
    <Grid container spacing={4} alignItems={"center"}>
      <Grid item md={6} xs={12}>
        <Card variant={"outlined"}>
          <form onSubmit={sendData}>
            <CardContent>
							<Box py={4}>
								<Typography variant={"h4"}>Welcome Back</Typography>
							</Box>
              <div>
                <CustomInputField
                  type={"email"}
                  label={"Email"}
                  value={email}
                  setValue={setEmail}
                />
              </div>
              <div>
                <CustomInputField
                  type={"password"}
                  label={"Password"}
                  value={password}
                  setValue={setPass}
                />
              </div>
            </CardContent>
            <CardActions>
              <LoadingButton
                disabled={isDisabled()}
                loading={isLoading}
                variant="contained"
                type="submit"
              >
                Log In
              </LoadingButton>
              <Button
                onClick={() => {
                  navigate("/forget_password");
                }}
              >
                Forget Password
              </Button>
            </CardActions>
          </form>
        </Card>
      </Grid>
      <Grid item md={6} xs={12}>
				<LoginImage width={"100%"} />
			</Grid>
    </Grid>
  );
}

export default Login;
