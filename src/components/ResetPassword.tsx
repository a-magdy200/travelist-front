import { useState } from "react";

import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";

function ResetPassword() {
  const [password, setPass] = useState("");
  const [confirmPassword, setPassConfirm] = useState("");

  async function sendData(e: any) {
    e.preventDefault();
    let checkSubmit = true;

    if (password !== confirmPassword) {
      checkSubmit = false;
    }

    if (checkSubmit) {
      try {
        const response = await fetch(
          "http://localhost:4000/auth/reset_password",
          {
            method: "POST",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({ password }),
          }
        );

        if (response.ok) {
          console.log(response.status);
          console.log("Email sent");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="container">
      <h3>Reset Password</h3>
      <Box sx={{ m: 3 }}>
        <form onSubmit={sendData}>
          <div>
            <TextField
              required
              sx={{ width: "25ch" }}
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
              sx={{ width: "25ch" }}
              id="confirmPassword"
              type="password"
              label="confirm password"
              size="small"
              onChange={(e) => {
                setPassConfirm(e.target.value);
              }}
            />
          </div>
          <br />

          <Button variant="contained" type="submit">
            Send Code
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default ResetPassword;
