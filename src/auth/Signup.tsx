import { Typography, Box, Button, Snackbar } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import AuthHeader from '../components/organisms/AuthHeader';
import API from '../redux/api/api';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import PasswordStrengthBar from 'react-password-strength-bar';
import './auth.css'
import '../styles/general.css'
import PhoneInput, {formatPhoneNumberIntl } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import Footer from '../components/organisms/Footer';

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

  const [value, setValue] = useState<any>(0)
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
  const [showPassStrength, setShowPassStrength] = useState(false);

  const [errorMsg, setErrorMsg] = useState("");
  console.log(errorMsg);

  const [signupCreds, setSignupCreds] = useState(
    {
      name: '',
      phoneNumber : value,
      email: '',
      password: '',
      confirmPassword : ''
    }
  );
  console.log(signupCreds)

  const handelChange = (e: any) => {

    const {name, value} = e.target
    setSignupCreds({...signupCreds, [name]:value})
    setShowPassStrength(true)
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
        localStorage.setItem('name', signupCreds.name)
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
    <div className='dark:bg-slate-900'>
    <Box style={{textAlign:"center"}} className=" ">
    <AuthHeader />
    <h1 className='font-black text-2xl mt-2 dark:text-white'>Get started with smartle</h1>
    </Box>
      <Box width={"40%"} className = 'form-class' style={{
        borderRadius: "5px",
        marginTop: "10px", 
        color: "#917EBD", 
        margin: "auto"}}>
        <form onSubmit={(e) => handleSubmit(e)}>
        <Box style={{width: "80%", margin: "auto", paddingTop: "10px"}}>
            <Box style={{marginTop: "10px"}}>
            </Box>
            <input type={"text"} 
             className = 'form-input inputGeneralStyle'
             placeholder="Parent’s Full Name"
             name='name'
              value={signupCreds.name} 
              onChange={handelChange} 
              style={{width: "100%"}}></input>
          </Box>
        <Box style={{width: "80%", margin: "auto", paddingTop: "10px"}}>
            <Box >
            </Box>
            <section>
            <PhoneInput
  international
  defaultCountry="IN"
  countryCallingCodeEditable={false}
  name = 'phoneNumber'
  placeholder = 'Phone Number'
  value={value}
  onChange={setValue}/>
  </section>
          </Box>
          <Box style={{width: "80%", margin: "auto"}}>
            <Box style={{marginTop: "10px"}}>
            </Box>
            <input type={"text"} 
             className = 'form-input inputGeneralStyle'
             name='email'
             placeholder="Email"
              value={signupCreds.email} 
              onChange={handelChange} 
              style={{width: "100%", marginBottom: "10px"}}></input>
          </Box>
         <Box style={{width: "80%", margin: "auto"}}>
           <div>
           </div>
          <input 
            type={"password"}
            className = 'form-input inputGeneralStyle'
            name = 'password'
            placeholder="Password"
            value={signupCreds.password} 
            onChange={handelChange}
            style={{ width: "100%"}}></input>
         </Box>
         <Box style={{width: "80%", margin: "auto", marginTop:"10px"}}>
           <div>
           </div>
          <input 
          placeholder="Confirm Password"
            type={"password"}
            name = 'confirmPassword'
            className = 'form-input inputGeneralStyle'
            value={signupCreds.confirmPassword} 
            onChange={handelChange}
            style={{width: "100%"}}></input>

         {showPassStrength ? <PasswordStrengthBar password={signupCreds.password}/> : null}
         </Box>

         <Box style={{width: "80%", margin: "auto", textAlign:"center", marginTop: "0px"}}>
                <ThemeProvider theme={redTheme}>
              <Button type='submit' className = 'auth-button buttonGeneralFirst' style={{borderRadius : '13px',width:"65%", height: "20%", padding: '0px',marginTop: "10px", color : 'white',backgroundColor : '#917EBD', maxHeight: '40px', fontWeight:'700'}} variant="contained">
                  Sign up
              </Button>
              </ThemeProvider>
        </Box>
          <Box style={{width: "80%", margin: "auto", textAlign:"center", paddingBottom: "20px"}}>
          {errorMsg !== '' && 
        <div className ='error_style' style ={{marginTop: '4rem'}}>
          {errorMsg}
        </div>}
          </Box>

        </form>
      </Box>
      <Footer/>
    </div>
  );
};

export default Signup;