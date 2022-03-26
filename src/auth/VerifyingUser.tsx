import { Box, Button, Avatar, Typography } from '@mui/material';
import React, { useState } from "react";
import AuthHeader from '../components/organisms/AuthHeader';
import PopOutCircle from '../components/atom/PopOutCircle';
import { EnterpriseBannerGirl as BImg } from '../util/resources';
import { Axios } from 'axios';
import API from '../redux/api/api';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

const VerifyingUser = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [codeResult, setCodeResult] = useState('');

    const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-details') || '{}'))

    const[optResult, setOtpResult] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    
    const [codeCreds, setCodeCreds] = useState({
        email : localStorage.getItem('username'),
        code : otp.toString()
    });

    const [loginCreds, setLoginCreds] : any = useState(
        {
          email: localStorage.getItem('username'),
          password: localStorage.getItem('username-p')
        }
      );

      const [parentTable, setParentTable] : any = useState(
        {
          parentId: '',
          parentName: '',
          parentEmail: ''
        }
      );

    const navigate = useNavigate();

    const handleChange = (element:any, index: any) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
        //Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };
    const handelCodeSubmit = async () => {
        codeCreds.code = otp.join("").toString();
        console.log(codeCreds);
        // console.log(codeCreds);
        await API.post('code', codeCreds)
        .then((res)=>{
            if(otp.length <= 5){
                setErrorMsg("Please Enter the Compelete Code")
            }
            else if(typeof res.data === 'object'){
                setErrorMsg(res.data.code)
            }else{
            setCodeResult(res.data);

            API.post('login', loginCreds)
            .then((res)=>{
                    console.log(res.data.token)
                    localStorage.setItem('user-details', JSON.stringify(res.data.token))
                    setErrorMsg('')
                    // setParentTable({ ...parentTable, 
                    //     parentTable.parentId = res.data.username,
                    //     parentTable.parentName = res.data.name,
                    //     parentTable.parentEmail = res.data.email
                    // })
                    console.log(parentTable)
                    navigate('/learner')
                    localStorage.removeItem('username')
                    localStorage.removeItem('username-p')
             API.post('parentpopluate', parentTable)
             .then(res => {
                 console.log(res.data)
             })
            .catch(err => {
                 console.log(err)
             })
             }).catch((err) => {
                console.log(err)
             })
        }
        })
    }

    const handleResendCode = async () => {
        await API.post('resendcode', codeCreds)
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            <AuthHeader />
            <Box className="row">
                <Box className="col text-center">
                    <Typography variant='h4' sx={{marginBottom: "20px", marginTop:"30px"}} fontWeight="700">Email Verifcation</Typography>
                        <Box className="hidden md:block " sx={{margin: "auto"}}>
                        <PopOutCircle image={BImg}
                            circleBg='bg-contrastAccent-200' imageTop='14px' imageLeft='10px' borderColor='blue' imageSize="2.5" />
                        </Box>
                        <Box className="block md:hidden" sx={{width: "50%", margin: "auto", textAlign: "center"}}>
                            <PopOutCircle image={BImg} circleBg='bg-contrastAccent-200' imagePos='14px' imageTop='10px' imageLeft='0px' imageOverflow='hiden' borderColor='blue' imageSize="2" />
                        </Box>
                    <Typography variant='h6' sx={{marginTop: "100px", marginLeft: "10px", marginRight: "1opx", marginBottom: "20px"}}>Enter the verification code we just sent you on your email address</Typography>

                    {otp.map((data, index) => {
                        return (
                            <input
                                className="otp-field"
                                type="text"
                                name="otp"
                                maxLength={1}
                                key={index}
                                value={data}
                                onChange={e => handleChange(e.target, index)}
                                onFocus={e => e.target.select()}
                            />
                        );
                    })}

                    <Typography>OTP Entered - {otp.join("")}</Typography>
                    <Typography>
                        
                            <Button
                                className = 'auth-button' 
                                variant="outlined" 
                                style={{
                                    width:"200px", 
                                    marginTop: "20px", 
                                    background: '#917EBD', 
                                    borderColor : '#917EBD', 
                                    color: 'white', 
                                    marginRight: "20px"
                                    }} 
                                onClick={e => {
                                    setOtp([...otp.map(v => "")])
                                }}
                            >
                                Clear
                        </Button>
                        <Button
                            className = 'auth-button' 
                            variant="outlined" 
                            style={{width:"200px", marginTop: "20px", background: '#917EBD', borderColor : '#917EBD', color: 'white'}} 
                            onClick={handelCodeSubmit}
                        >
                            Verify OTP
                        </Button>
            
                        
                    </Typography>
                </Box>
                {errorMsg !== '' && <Alert style = {{marginTop: "20px", width: "50%"}} variant="outlined" severity="error">
        {errorMsg}
      </Alert>}
            </Box>
        </>
    );
};

export default VerifyingUser;