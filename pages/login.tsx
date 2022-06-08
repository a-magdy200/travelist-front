import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styles from '../styles/Home.module.css'

const Login : NextPage = ()=> {
    
    const[name, setName]=useState('')
    const[password, setPassword]=useState('')

    const[nameError, setNameError]=useState('')
    const[passwordError, setPasswordError]=useState('')

    async function submitLogin(e:any){
        
        e.preventDefault()
        let flag:Boolean=true

        if (name==''){
            setNameError('User Name is required')
            flag=false
        }
        if (password==''){
            setPasswordError('Password is required')
            flag=false
        }
        if (flag){
            try{
                const response = await fetch ('http://localhost:3000/login', {
                    method: "POST",
                    headers:{"content-Type":"application/json"},
                    body:JSON.stringify({name:name,password:password})
                })
        
                if (response.ok){
                   let data = await response.text();
                   console.log(data);
                }
                
            }catch(error){
                console.log(error)
            }
        }
    }

    return (
        <Box        
            component="form"
            className={styles.body}
            sx={{
                '& .MuiTextField-root': { m: 2, width: '75ch' },
                margin: '50px'
            }}
            noValidate
            autoComplete="off"
        >
            <div>
            <Head>
                <title>Login</title>
                <meta name="description" content="Login" />
            </Head>
            <h1>Login Form</h1>
                <TextField
                    required
                    id="outlined-required"
                    label="User Name"
                    defaultValue=""
                    onChange={(e)=>{
                        setName(e.target.value)
                        if (e.target.value==''){
                            setNameError('User Name is required')
                        }else{
                            setNameError('')
                        }
                    }}
                />
                <div>
                    {nameError !=="" ? nameError: ""}
                </div>
                
                <TextField
                    required
                    id="outlined-password-input"
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    onChange={(e)=>{
                        setPassword(e.target.value)
                        if (e.target.value==''){
                            setPasswordError('Password is required')
                        }else{
                            setPasswordError('')
                        }
                    }}
                />
                <div>
                    {passwordError !=="" ? passwordError: ""}
                </div>
                
            </div>

            <Button 
                variant="contained" 
                color="success"
                type="submit"
                onClick={
                    submitLogin
                }
                sx={{
                    margin: '7px'
                }}
            >
            Login
            </Button>
        </Box>
    );
    
}

export default Login