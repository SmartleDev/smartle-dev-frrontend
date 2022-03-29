import { Typography, Box, Button, Snackbar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import AuthHeader from '../components/organisms/AuthHeader';
import API from '../redux/api/api';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import PasswordChecklist from "react-password-checklist";
import './auth.css'

const Signup = () => {

  const [open, setOpen] = React.useState(false);
  console.log(open);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const redTheme = createTheme({ palette: { primary:{
    main:  purple[900]}
  } });
  
  const [loginToken, setLoginToken] = useState<any>([]);
  const navigate = useNavigate()
  const [name, setName] = useState("");

  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-details') || '{}'))
  
    interface Signup {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    } 
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  console.log(errorMsg);

  const [signupCreds, setSignupCreds] = useState(
    {
      name: '',
      email: '',
      password: '',
      confirmPassword : ''
    }
  );
  console.log(signupCreds)

  const handelChange = (e: any) => {

    const {name, value} = e.target
    setSignupCreds({...signupCreds, [name]:value})
  }

  const [rememberme, setRemberme] = useState(false);

  // console.log("name: " + name + "\nemail: " + email + "\npassword: " + password + "\nremberme: " + rememberme);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    await API.post('signup', signupCreds)
    .then((res)=>{
      if(typeof res.data === 'object'){
        setLoginToken(res.data)
        localStorage.setItem('username', res?.data?.username)
        localStorage.setItem('username-p', signupCreds.password)
        navigate('/otp')
      }else{
        if(signupCreds.name === ''){
          setErrorMsg('Name cannot be empty.')
        }
        else if(signupCreds.password !== signupCreds.confirmPassword){
          setErrorMsg('Password and Confirm Password did not match.')
        }else if(res.data === 'An account with the given email already exists.'){
          setErrorMsg('An account with the given email already exists. Please Use a different email.');
        }
        else{
          setErrorMsg(res.data)
        }
        setOpen(true);
      }
    }).catch((err) => {
      console.log(err)
    })
}

  return (
    <>
    <Box style={{textAlign:"center"}}>
    <AuthHeader />
    <h1 className='font-black text-2xl mt-2'>Get started with smartle</h1>
    <p className='text-xl md:text-2xl mt-3 md:mt-5 text-stone-600'>
            Create Your Account
          </p>
      <Typography fontSize={"14px"}>Explore the joy of learning</Typography>
    </Box>
      <Box width={"40%"} className = 'form-class' style={{
        backgroundColor: "#F9EDF5",
        borderRadius: "5px",
        marginTop: "10px", 
        color: "#917EBD", 
        margin: "auto"}}>
        <form onSubmit={(e) => handleSubmit(e)}>
        <Box style={{width: "80%", margin: "auto", paddingTop: "10px"}}>
            <Box style={{marginTop: "20px"}}>
              <label style={{marginTop: "100px"}}>Name</label>
            </Box>
            <input type={"text"} 
             className = 'form-input'
             placeholder="Enter your Name"
             name='name'
              value={signupCreds.name} 
              onChange={handelChange} 
              style={{padding: "8px", width: "100%", borderRadius: "3px"}}></input>
          </Box>
          <Box style={{width: "80%", margin: "auto"}}>
            <Box style={{marginTop: "20px"}}>
              <label style={{marginTop: "100px"}}>Email</label>
            </Box>
            <input type={"text"} 
             className = 'form-input'
             name='email'
             placeholder="Enter your Email"
              value={signupCreds.email} 
              onChange={handelChange} 
              style={{padding: "6px", width: "100%", borderRadius: "3px", marginBottom: "10px"}}></input>
          </Box>
         <Box style={{width: "80%", margin: "auto"}}>
           <div>
            <label>Create Password</label>
           </div>
          <input 
            type={"password"}
            className = 'form-input'
            name = 'password'
            placeholder="Enter Password"
            value={signupCreds.password} 
            onChange={handelChange}
            style={{padding: "8px", width: "100%", borderRadius: "3px"}}></input>
         </Box>
         <Box style={{width: "80%", margin: "auto", marginTop:"10px"}}>
           <div>
            <label>Confirm Password</label>
           </div>
          <input 
          placeholder="Confirm Password"
            type={"password"}
            name = 'confirmPassword'
            className = 'form-input'
            value={signupCreds.confirmPassword} 
            onChange={handelChange}
            style={{padding: "6px", width: "100%", borderRadius: "3px", marginBottom: '10px'}}></input>
                     <PasswordChecklist
				rules={["minLength","specialChar","number","capital","match"]}
				minLength={8}
				value={signupCreds.password}
				valueAgain={signupCreds.confirmPassword}
				onChange={(isValid) => {}}
			/>
         </Box>

         <Box style={{width: "80%", margin: "auto", textAlign:"center", marginTop: "20px"}}>
                <ThemeProvider theme={redTheme}>
              <Button type='submit' className = 'auth-button' style={{width:"100%", backgroundColor : '#917EBD'}} variant="contained">
                  Signup
              </Button>
              </ThemeProvider>
        </Box>
          <Box style={{width: "80%", margin: "auto", textAlign:"center", paddingBottom: "20px"}}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert variant='filled' onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {errorMsg}
          </Alert>
        </Snackbar>
          </Box>

        </form>
      </Box>
    </>
  );
};

export default Signup;