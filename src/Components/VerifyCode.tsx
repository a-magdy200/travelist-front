import { useState } from "react";

import TextField from '@mui/material/TextField/TextField';
import Button from '@mui/material/Button';
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

function VerifyCode() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");

    async function sendData(e: any) {
        e.preventDefault();
        console.log("Send Data");

        try {
            const response = await fetch('http://localhost:4000/auth/verify_code', {
                method: "POST",
                headers: { "content-Type": "application/json" },
                body: JSON.stringify({ email, code })
            });

            if (response.ok) {
                console.log(response.status);
                console.log('Code verified');
                navigate('/reset_password', );
            }

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            <h3>Verify Code</h3>
            <Box sx={{ m: 3 }}>
                <form onSubmit={sendData}>
                    <div>
                        <TextField sx={{ width: '25ch' }} required id="email" type="email" label="email" size="small" onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                    </div><br />
                    <div>
                        <TextField sx={{ width: '25ch' }} required id="email" type="text" label="code" size="small" onChange={(e) => {
                            setCode(e.target.value)
                        }} />
                    </div><br />

                    <Button variant="contained" type="submit">Verify</Button>
                </form>
            </Box>
        </div>
    )
}

export default VerifyCode;