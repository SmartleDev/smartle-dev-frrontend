import React,{useState} from 'react'
import '../../styles/general.css'
import '../auth.css'
import AuthHeader from '../../components/organisms/AuthHeader';
import { Box, Button, Avatar, Typography } from '@mui/material';
import API from '../../redux/api/api';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/organisms/Footer'

function ForgotPassword() {

  const navigate = useNavigate();
    const [email, setEmail] = useState('')
    console.log(email)
    
    const [errorMsg, setErrorMsg] = useState("");
    console.log(errorMsg);
console.log(localStorage.getItem('emailForgot'))
    const handelEmail = () => {
        API.post('forgotPassword', {email : email})
        .then((res) => {
          if(Array.isArray(res.data)){
              localStorage.setItem('emailForgot', email)
              navigate('/verfiyforgotpassword')
          }else if(typeof res.data === 'object'){
            setErrorMsg("Forgot Password Limit Exceeding")
          }else{
            setErrorMsg(res.data)
          }
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    
  return (
    <>
     <AuthHeader />
    <Box style ={{marginLeft:'auto', marginRight: 'auto'}} className = 'forget_password_main w-1/4 flex flex-col items-center'>
    <h1 className='forgot_heading'>Forgot Login email or password</h1>
    <Typography variant='h6' width={"450px"} className = 'text-center' sx={{marginTop: "10px", fontSize:'20px', fontWeight: '800',marginLeft: "10px", color : '#917EBD',marginRight: "10px", marginBottom: "20px"}}>Enter the email address you use for Smartle, and we’ll help you set a new password.</Typography>
    <input type={"text"} 
             className = 'form-input inputGeneralStyle forgot_password_input'
             name='email'
             value ={email}
             onChange = {(e) => setEmail(e.target.value)}
             placeholder="Email"
              style={{width: "500px", marginBottom: "10px", marginTop: '50px'}}></input>
                <Button onClick = {handelEmail} type='submit' className = 'auth-button buttonGeneralFirst' style={{borderRadius : '13px',width:"65%", height: "20%", padding: '0px',marginTop: "40px", color : 'white',backgroundColor : '#917EBD', maxHeight: '40px', fontWeight:'700'}} variant="contained">
                  Continue
              </Button>
              <Box style={{width: "80%", margin: "auto", textAlign:"center", paddingBottom: "50px"}}>
          {errorMsg !== '' && 
        <div className ='error_style' style ={{marginTop: '4rem'}}>
          {errorMsg}
        </div>}
          </Box>
    </Box>
          <Footer />
    </>

  )
}

export default ForgotPassword