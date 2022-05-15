import { Box, Button, Avatar, Typography } from '@mui/material';
import React, { useState, useEffect} from "react";
import AuthHeader from '../components/organisms/AuthHeader';
import PopOutCircle from '../components/atom/PopOutCircle';
import { EnterpriseBannerGirl as BImg } from '../util/resources';
import { Axios } from 'axios';
import API from '../redux/api/api';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import jwt_decode from "jwt-decode";

const VerifyingUser = () => {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [codeResult, setCodeResult] = useState('');

    const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-details') || '{}'))

    console.log(user);
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

      console.log(loginCreds);


      const [parentTable, setParentTable] : any = useState(
        {
          parentId: '',
          parentName: '',
          parentEmail: ''
        }
      );

      console.log(parentTable.parentEmail)

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

            API.post('accountCreationEmailService', {emailTo: localStorage.getItem('username')} )
            .then(res => {
                console.log(localStorage.getItem('username'));
                console.log(parentTable.parentEmail);
                console.log(res.data)
            }).catch(err => {
                console.log(err)
            })
            API.post('login', loginCreds)
            .then( async (res)=>{
                    console.log(res.data.username);
                    console.log(res.data.email);
                    const value: any = jwt_decode(res.data.token);
                    const decodeAccessToken: any = jwt_decode(res.data.accessToken);
                    console.log(value.email);
                    console.log(decodeAccessToken.username);
                    console.log(value.name);
                    localStorage.setItem('user-details', JSON.stringify({
                        token : res.data.token,
                        accessToken : res.data.accessToken,
                        username : res.data.username,
                      }))
                    setErrorMsg('')
                   setParentTable({
                       parentId: decodeAccessToken.username,
                       parentName: value.name,
                       parentEmail: value.email
                    })
             navigate('/learner')
             localStorage.removeItem('username')
             localStorage.removeItem('username-p')
             }).catch((err) => {
                console.log(err)
             })
        }
        })
    }

    useEffect(() => {

        if(parentTable.parentId !== ''){
            console.log(parentTable)
         API.post('parentpopluate', parentTable)
         .then(res => {
                    console.log(res.data)
                })
               .catch(err => {
                    console.log(err)
                })
            }
    }, [parentTable])

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