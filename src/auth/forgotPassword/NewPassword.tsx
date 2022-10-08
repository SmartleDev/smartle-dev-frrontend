import React,{useState} from 'react'
import '../../styles/general.css'
import '../auth.css'
import AuthHeader from '../../components/organisms/AuthHeader';
import { Box, Button, Avatar, Typography } from '@mui/material';
import API from '../../redux/api/api';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Footer from '../../components/organisms/Footer'

function NewPassword() {

  const navigate = useNavigate();
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    console.log(password)
    
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSccuessMsg] = useState("");
    const [codeIncorect, setCodeIncorrect] = useState(false);
    console.log(errorMsg);

    const handelEmail = () => {
      console.log(password.localeCompare(confirmPassword))
      if(password.localeCompare(confirmPassword) === 0){

        API.post('forgotPasswordNext', {email : localStorage.getItem('emailForgot'),verificationCode : localStorage.getItem('codeForgot'),newPassword : password})
        .then((res) => {
          if(Array.isArray(res.data)){
            localStorage.removeItem('emailForgot')
            localStorage.removeItem('codeForgot')
            navigate('/login')
          }else if(res.data?.name === "CodeMismatchException"){
            setErrorMsg("Incorrect or Invalid code please Enter the Code Again")
            setCodeIncorrect(true)
            setTimeout(() => {
              navigate('/verfiyforgotpassword')
            }, 5000);
          }else if(typeof res.data === 'object'){
            setErrorMsg(res.data?.name + "Please Try again Later")
          }else if(res.data === 'Password confirmed!'){
            setSccuessMsg("Congratulations your password has been Changed!!")
            localStorage.removeItem('emailForgot')
            localStorage.removeItem('codeForgot')
            setErrorMsg('')
            setTimeout(() => {
              navigate('/login')
            }, 5000);
          }else{
            setErrorMsg(res.data)
          }
          console.log(res.data)
        })

        .catch((err) => {
          console.log(err)
        })
      }else{
        setErrorMsg('Password Mismatch')
      }
    }

    
  return (
    <>
     <AuthHeader />
    <Box style ={{marginLeft:'auto', marginRight: 'auto'}} className = 'forget_password_main w-1/4 flex flex-col items-center'>
    <h1 className='font-black text-2xl mt-2 text-center forgot_heading'>Set a new password</h1>
    <Box style={{marginTop: "20px"}}>
            </Box>
    <input type="password"
             className = 'form-input inputGeneralStyle forgot_password_input'
             name='password'
             value ={password}
             onChange = {(e) => setPassword(e.target.value)}
             placeholder="Enter your new password"
              style={{width: "100%", marginBottom: "10px"}}></input>
              <Box style={{marginTop: "20px"}}>
            </Box>
    <input type="password"
             className = 'form-input inputGeneralStyle forgot_password_input'
             name='password'
             value ={confirmPassword}
             onChange = {(e) => setConfirmPassword(e.target.value)}
             placeholder="Enter your new password"
              style={{width: "100%", marginBottom: "10px"}}></input>
                <Button onClick = {handelEmail} type='submit' className = 'auth-button buttonGeneralFirst' style={{borderRadius : '13px',width:"65%", height: "20%", padding: '0px',marginTop: "20px", color : 'white',backgroundColor : '#917EBD', maxHeight: '40px', fontWeight:'700'}} variant="contained">
                  Reset
              </Button>
              <Box style={{width: "80%", margin: "auto", textAlign:"center", paddingBottom: "20px"}}>
          {errorMsg !== '' && 
        <div className ='error_style' style ={{marginTop: '4rem'}}>
          {errorMsg}
                {codeIncorect &&
                   <>
                     <br />
                      <br />
                       <CircularProgress color="inherit" />
                  </>
                }
        </div>}
          </Box>
              <Box style={{width: "80%", margin: "auto", textAlign:"center", paddingBottom: "20px"}}>
          {successMsg !== '' && 
        <div className ='success_style' style ={{marginTop: '4rem'}}>
          {successMsg}
         <br />
         <br />
          <CircularProgress color="success" />
        </div>}
          </Box>
    </Box>
    <Footer />
    </>

  )
}

export default NewPassword 