import { Typography, Box, Button, Grid } from '@mui/material';
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

const Login = () => {

  const navigate = useNavigate()

  const redTheme = createTheme({ palette: { primary:{
    main:  purple[900]}
  } });

  const [errorMsg, setErrorMsg] = useState("");
  const [rememberme, setRemberme] = useState(false);

  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-details') || '{}'))

  const [loginToken, setLoginToken] = useState([]);

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
        localStorage.setItem('user-details', JSON.stringify(res.data.token))
        setErrorMsg('')
        navigate('/learner')
      }else if (res.data === 'User is not confirmed.'){
        localStorage.setItem('username', loginCreds.email)
        navigate('/otp')
      }else{
        setErrorMsg(res.data)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  const isMobile = useMediaQuery('(max-width:1200px)');
if(user === undefined || null){
  return (<h1>Alreayd Logged in</h1>)
}else{
  return (
    <>
    <AuthHeader />

     {!isMobile ? <><div className="hidden md:block"><GradBlobTRsm /></div>
    
    <div className="flex flex-wrap flex-col-reverse md:flex-row  md:px-32 relative mb-32">  
    
      <div className="md:w-1/2 h-full flex justify-end">
     
    <div className='select-learner'>
    <div>
		<h1 className='font-black text-4xl'>Get started with smartle</h1>
		</div>
      {/* <Typography variant='h4' fontWeight={"700"}>Get started with smartle</Typography> */}
      <p style={{fontSize:"25px"}}>  
            Login to your Account
          </p>
      <Typography fontSize={"14px"}>Complete your learning journey!</Typography>
      <Box className =  'form-class' 
        width={"40%"} 
        style={{backgroundColor: "#F9EDF5", borderRadius: "5px", marginTop: "10px", color: "#917EBD", marginBottom: "55px"}}>
        <form onSubmit={(e) => handleSubmit(e)} >
          <Box style={{width: "80%", margin: "auto", paddingTop: "10px"}}>
            <Box style={{marginTop: "20px"}}>
              <label style={{marginTop: "100px"}}>Email</label>
            </Box>
            <input type={"email"} 
             placeholder="Enter your email"
             className = 'form-input'
             name = 'email'
              value={loginCreds.email} 
              onChange={handelChange} 
              style={{padding: "8px", width: "100%", borderRadius: "3px", marginBottom: "20px"}}></input>
          </Box>
         <Box style={{width: "80%", margin: "auto"}}>
           <div>
            <label>Password</label>
           </div>
          <input 
          className = 'form-input'
            type={"password"}
            placeholder="Enter your password"
            name = 'password'
            value={loginCreds.password} 
            onChange={handelChange}
            style={{padding: "8px", width: "100%", borderRadius: "3px"}}></input>
         </Box>
         <Box style={{width: "80%", margin: "auto", marginTop: "10px", marginBottom: "10px"}}>
         <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box>
                <input type={"checkbox"} onChange={() => setRemberme(!rememberme)} />
                <label style={{marginLeft: "5px"}}>Remember Me</label>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box textAlign={"right"}><Typography >Forgot Password?</Typography></Box>
            </Grid>
          </Grid>
         </Box>
          <Box style={{width: "80%", margin: "auto", textAlign:"center"}}>
            {/* <Link to={"/"} > */}
              <ThemeProvider theme={redTheme}>
                <Button type = 'submit' className = 'auth-button' variant="contained" style={{width:"100%", marginTop: "20px", backgroundColor : '#917EBD'}}>
                    Login
                </Button>
              </ThemeProvider>
            {/* </Link> */}
          </Box>
          <Box style={{width: "80%", margin: "auto", textAlign:"center", marginTop: "20px", paddingBottom: "20px"}}>
          <p className = 'text-stone-600'>Don't have an account Signup now !!</p>
          <Link to={"/signup"}                            
              >
                <ThemeProvider theme={redTheme}>
              <Button className = 'auth-button' style={{width:"100%", color : '#917EBD', borderColor : '#917EBD'}} variant="outlined">
                  Signup
              </Button>
              </ThemeProvider>
        </Link>
        <br/>
         {errorMsg !== '' && <Alert style = {{marginTop: "20px"}} variant="outlined" severity="error">
        {errorMsg}
      </Alert>}
        </Box>
        </form>
      </Box>
    </div>
      </div>  
      <div className="select-none md:w-1/2 h-full relative flex md:block justify-center" style={{marginTop: "70px"}}>
        <div className="hidden md:block">
          <PopOutCircle image={BImg}
            circleBg='bg-contrastAccent-200' imageTop='14px' imageLeft='10px' borderColor='blue' imageSize="3" />
        </div>
        <div className="block md:hidden ">
          <PopOutCircle image={BImg} circleBg='bg-contrastAccent-200' imagePos='top' imageTop='-18px' imageLeft='0px' imageOverflow='hiden' borderColor='blue' imageSize="2.5" />
        </div>
      </div>
    </div></> : 
    <>
          <div className='select-learner'>
    <div>
		<h1 className='font-black text-2xl mt-5'>Get started with smartle</h1>
		</div>
      {/* <Typography variant='h4' fontWeight={"700"}>Get started with smartle</Typography> */}
      <p style={{fontSize:"25px"}}>  
            Login to your Account
          </p>
      <Typography fontSize={"14px"}>Complete your learning journey!</Typography>
      <Box className =  'form-class' 
        width={"40%"} 
        style={{backgroundColor: "#F9EDF5", borderRadius: "5px", marginTop: "10px", color: "#917EBD", marginBottom: "55px"}}>
        <form onSubmit={(e) => handleSubmit(e)} >
          <Box style={{width: "80%", margin: "auto", paddingTop: "10px"}}>
            <Box style={{marginTop: "20px"}}>
              <label style={{marginTop: "100px"}}>Email</label>
            </Box>
            <input type={"email"} 
            placeholder="Enter your email"
            className = 'form-input'
            name = 'email'
             value={loginCreds.email} 
             onChange={handelChange} 
              style={{padding: "8px", width: "100%", borderRadius: "3px", marginBottom: "20px"}}></input>
          </Box>
         <Box style={{width: "80%", margin: "auto"}}>
           <div>
            <label>Password</label>
           </div>
          <input 
          className = 'form-input'
            type={"password"}
            placeholder="Enter your password"
            name = 'password'
            value={loginCreds.password} 
            onChange={handelChange}
            style={{padding: "8px", width: "100%", borderRadius: "3px"}}></input>
         </Box>
         <Box style={{width: "80%", margin: "auto", marginTop: "10px", marginBottom: "10px"}}>
         <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box>
                <input type={"checkbox"} onChange={() => setRemberme(!rememberme)} />
                <label style={{marginLeft: "5px"}}>Remember Me</label>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box ><Typography >Forgot Password?</Typography></Box>
            </Grid>
          </Grid>
         </Box>
          <Box style={{width: "80%", margin: "auto", textAlign:"center"}}>
            <Link to={"/"} >
              <ThemeProvider theme={redTheme}>
                <Button type = 'submit' className = 'auth-button' variant="contained" style={{width:"100%", marginTop: "20px", backgroundColor : '#917EBD'}}>
                    Login
                </Button>
              </ThemeProvider>
            </Link>
          </Box>
          <Box style={{width: "80%", margin: "auto", textAlign:"center", marginTop: "20px", paddingBottom: "20px"}}>
          <p className = 'text-stone-600'>Don't have an account Signup now !!</p>
          <Link to={"/signup"}                            
              >
                <ThemeProvider theme={redTheme}>
              <Button className = 'auth-button' style={{width:"100%", color : '#917EBD', borderColor : '#917EBD'}} variant="outlined">
                  Signup
              </Button>
              </ThemeProvider>
        </Link>
        </Box>
        </form>
      </Box>
    </div>
    </>}
    <Footer />

    </>
  );
};
};

export default Login;