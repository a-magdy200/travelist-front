import { useState } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import CustomInputField from "../../components/Form/CustomInputField";
import { IForgetPasswordRequest } from "../../config/interfaces/IForgetPasswordRequest.interface";
import { IForgetPasswordResponse } from "../../config/interfaces/IForgetPasswordResponse.interface";
import api from "../../config/api";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

function ForgetPassword() {
  const [email, setEmail] = useState("");

  async function sendData(e: any) {
    e.preventDefault();

    try {
      const requestBody: IForgetPasswordRequest = {
        email
      };

      const response: IForgetPasswordResponse = await api({
        url: "/auth/forget_password",
        method: "POST",
        body: JSON.stringify(requestBody)
      });

      if (response.success) {
        console.log("check your mail, verification code has been sent");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box width={"100%"}>
      <form onSubmit={sendData}>
        <Grid container spacing={2} justifyContent={"center"} width={"100%"}>
          <Grid item xs={12}>
            <Typography variant={"h5"}>
              Forget your Password?
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CustomInputField
              type={"email"}
              label={"Email"}
              value={email}
              setValue={setEmail}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default ForgetPassword;
