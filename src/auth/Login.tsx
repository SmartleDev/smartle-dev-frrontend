import { Typography, Box, Button, Grid, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import Footer from '../components/organisms/Footer';
import GradBlobTRsm from '../components/atom/GradBlobTRSm';
import PopOutCircle from '../components/atom/PopOutCircle';
import { EnterpriseBannerGirl as BImg } from '../util/resources';
import AuthHeader from '../components/organisms/AuthHeader';
import useMediaQuery from '@mui/material/useMediaQuery'
import API from '../redux/api/api';
import './auth.css';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import '../styles/general.css'

const Login = () => {

  const navigate = useNavigate()

  const redTheme = createTheme({ palette: { primary:{
    main:  purple[900]}
  } });

  const [errorMsg, setErrorMsg] = useState("");
  const [rememberme, setRemberme] = useState(false);

  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-details') || '{}'))

  const [loginToken, setLoginToken] = useState([]);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const [loginCreds, setLoginCreds] : any = useState(
    {
      email: '',
      password: ''
    }
  );
  console.log(loginCreds)

  const handelChange = (event: any) => {

   const {name , value } : any = event.target
   setLoginCreds({...loginCreds, [name]:value})

  }

  const  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    await API.post('login', loginCreds)
    .then((res)=>{
      console.log(res.data)
      if(typeof res.data === 'object'){
        console.log(res.data.token)
        localStorage.setItem('user-details', JSON.stringify({
          token : res.data.token,
          accessToken : res.data.accessToken,
          username : res.data.username,
        }))
        setErrorMsg('')
        navigate('/learner')
      }else if (res.data === 'User is not confirmed.'){
        localStorage.setItem('username', loginCreds.email)
        localStorage.setItem('username-p', loginCreds.password)
        navigate('/otp')
      }else{
        if(res.data === 'Missing required parameter USERNAME'){
          setErrorMsg('Email cannot be empty');
        }else if(res.data === 'Incorrect username or password.'){
          setErrorMsg('Incorrect username or password. Please try again.');
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

  const isMobile = useMediaQuery('(max-width:700px)');
if(user === undefined || null){
  return (<h1>Alreayd Logged in</h1>)
}else{
  return (
    <>
    <AuthHeader />
   
    <div className="flex flex-wrap justify-center relative mb-20">  
    
      <div className="h-full flex justify-end">
     
    <div className='select-learner'>
    <div>
		<h1 className='font-black text-2xl text-center' style={{margin:'30px 0 30px 0'}}>Get started with smartle</h1>
		</div>
      {/* <Typography variant='h4' fontWeight={"700"}>Get started with smartle</Typography> */}

      <Box className =  'form-class' 
        width={"50%"} 
        style={{borderRadius: "5px", marginTop: "px", color: "#917EBD", marginBottom: "55px"}}>
        <form onSubmit={(e) => handleSubmit(e)} className = 'login_form'>
          <Box style={{width: "80%", margin: "auto", paddingTop: "10px"}} className = 'form_field'>
            <Box style={{marginTop: "0px"}}>
  
            </Box>
            <input type={"text"} 
             placeholder="Email"
             className = 'form-input inputGeneralStyle'
             name = 'email'
              value={loginCreds.email} 
              onChange={handelChange} 
              style={{width: "100%", marginBottom: "20px"}}></input>
          </Box>
         <Box style={{width: "80%", margin: "auto"}} className = 'form_field'>
           <div>
           </div>
          <input 
          className = 'form-input inputGeneralStyle'
            type={"password"}
            placeholder="Password"
            name = 'password'
            value={loginCreds.password} 
            onChange={handelChange}
            style={{ width: "100%"}}></input>
         </Box>
         <Box style={{width: "80%", margin: "auto", marginTop: "10px", marginBottom: "10px"}}>
         <Grid container spacing={2}>
            <Grid item xs={6}>
     
            </Grid>
            <Grid item xs={6}>
              <Box textAlign={"right"}><Link to ='/forgotpassword'><Typography sx={{textDecoration: 'underline'}}>Forgot Password?</Typography></Link></Box>
            </Grid>
          </Grid>
         </Box>
          <Box style={{width: "80%", margin: "auto", textAlign:"center"}}>
            {/* <Link to={"/"} > */}
              <ThemeProvider theme={redTheme}>
                <Button type = 'submit' className = 'auth-button buttonGeneralFirst' variant="contained" style={{borderRadius : '13px',width:"65%", height: "20%", padding: '0px',marginTop: "20px", color : 'white',backgroundColor : '#917EBD', maxHeight: '40px', fontWeight:'700'}}>
                    Login
                </Button>
              </ThemeProvider>
            {/* </Link> */}
          </Box>
          <Box style={{width: "80%", margin: "auto", textAlign:"center", marginTop: "10px"}}>
          <Link to={"/signup"}                            
              >
                <ThemeProvider theme={redTheme}>
              <Button className = 'auth-button buttonGeneralSecond' variant="contained" style={{borderRadius : '13px',color : '#735AAC',width:"65%", height: "20%", padding: '0px',marginTop: "20px", backgroundColor : '#DFD1E7', maxHeight: '40px', fontWeight:'700'}}>
                  Signup
              </Button>
              </ThemeProvider>
        </Link>
        <br/>
         {errorMsg !== '' && 
        <div className ='error_style'>
          {errorMsg}
        </div>}
        </Box>
        </form>
      </Box>
    </div>
      </div>  
    </div>
    </>
  );
};
};

export default Login;