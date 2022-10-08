import { Box, Button, Avatar, Typography } from '@mui/material';
import React, { useState, useEffect} from "react";
import AuthHeader from '../../components/organisms/AuthHeader';
import PopOutCircle from '../../components/atom/PopOutCircle';
import { EnterpriseBannerGirl as BImg } from '../../util/resources';
import { Axios } from 'axios';
import API from '../../redux/api/api';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import jwt_decode from "jwt-decode";
import useMediaQuery from '@mui/material/useMediaQuery';

const VerifyForgotPass = () => {
    const isMobile = useMediaQuery('(max-width:700px)');
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [codeResult, setCodeResult] = useState('');

    const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-details') || '{}'))

    console.log(user);
    const[optResult, setOtpResult] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [codeMsg, setCodeMsg] = useState("");
    
    const [codeCreds, setCodeCreds] = useState({
        code : otp.toString()
    });



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
        console.log(otp.length);
        // console.log(codeCreds);
        if(codeCreds.code?.split('').length <= 5){
            setErrorMsg("Please Enter the Compelete Code")
        }else{
            localStorage.setItem('codeForgot', codeCreds.code)
            navigate('/newpassword')
        }
    }

    return (
        <>
            <AuthHeader />
            <Box className="row">
                <Box className="col text-center">
                    <Typography variant='h4' sx={{marginBottom: "20px", marginTop:"30px"}} fontWeight="700">Email Verifcation</Typography>
                        {!isMobile &&
                        <>
                        <Box className="hidden md:block " sx={{margin: "auto"}}>
                        <PopOutCircle image={BImg}
                            circleBg='bg-contrastAccent-200' imageTop='14px' imageLeft='10px' borderColor='blue' imageSize="2.5" />
                        </Box>
                        <Box className="block md:hidden" sx={{width: "50%", margin: "auto", textAlign: "center"}}>
                            <PopOutCircle image={BImg} circleBg='bg-contrastAccent-200' imagePos='14px' imageTop='10px' imageLeft='0px' imageOverflow='hiden' borderColor='blue' imageSize="2" />
                        </Box>
                        </>
                        }
                    <Typography variant='h6' sx={{marginTop: "100px", marginLeft: "10px", color : '#917EBD',marginRight: "1opx", marginBottom: "20px"}}>Enter the verification code we just sent you on your email address</Typography>

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
                    <Typography className = 'my-10'>
                        
                            <Button
                                className = 'buttonGeneralFirst' 
                                variant="outlined" 
                                style={{
                                    width:"200px", 
                                    marginTop: "20px", 
                                    background: '#917EBD', 
                                    borderColor : '#917EBD', 
                                    color: 'white', 
                                    borderRadius:'10px',
                                    fontSize : '1rem',
                                    fontWeight : '700',
                                    marginRight: "20px"
                                    }} 
                                onClick={e => {
                                    setOtp([...otp.map(v => "")])
                                }}
                            >
                                Clear
                        </Button>
                        <Button
                            className = 'buttonGeneralFirst' 
                            variant="outlined" 
                            style={{width:"200px", marginTop: "20px", background: '#917EBD',  fontSize : '1rem',
                            fontWeight : '600',borderRadius:'10px', borderColor : '#917EBD', color: 'white'}} 
                            onClick={handelCodeSubmit}
                        >
                            Verify OTP
                        </Button>
            
                        
                    </Typography>
                </Box>
                {codeMsg !== '' && 
        <div className ='code_style text-center' style ={{marginTop: '4rem', width: '30%', marginRight : 'auto', marginLeft:'auto'}}>
          {codeMsg}
        </div>}
                {errorMsg !== '' && 
        <div className ='error_style text-center' style ={{marginTop: '4rem', width: '30%', marginRight : 'auto', marginLeft:'auto'}}>
          {errorMsg}
        </div>}

            </Box>
        </>
    );
};

export default VerifyForgotPass;