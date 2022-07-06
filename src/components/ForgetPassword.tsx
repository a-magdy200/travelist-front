import { useState } from "react";

import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";

function ForgetPassword() {
  const [email, setEmail] = useState("");

  async function sendData(e: any) {
    e.preventDefault();
    console.log("Send Data");

    try {
      const response = await fetch(
        "http://localhost:4000/auth/forget_password",
        {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify({ email }),
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

  return (
    <div className="container">
      <h3>Forget Password</h3>
      <Box sx={{ m: 3 }}>
        <form onSubmit={sendData}>
          <div>
            <TextField
              sx={{ width: "25ch" }}
              required
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

          <Button variant="contained" type="submit">
            Send Code
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default ForgetPassword;
