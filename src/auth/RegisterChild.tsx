import React, { useState, useEffect } from "react";
import { Typography, Box, Button, Grid} from "@mui/material";
import { HashLink as Link } from "react-router-hash-link";
import Header from "../components/organisms/Header";
import Footer from "../components/organisms/Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import API from '../redux/api/api';
import jwt_decode from "jwt-decode";
import '../styles/general.css'
import { BoyDab as BImg, TopRightGradPng } from '../util/resources';
import PopOutCircle from '../components/atom/PopOutCircle';
import { useNavigate } from 'react-router-dom';
import "./auth.css";

function RegisterChild() {
  const redTheme = createTheme({
    palette: {
      primary: {
        main: purple[900],
      },
    },
  });

  const AGE = [5,6,7,8,9,10,11,12,13,14,15,17,18];
  const token = JSON.parse(localStorage.getItem('user-details') || '{}');
  const [userId, setUserId] = useState<any>(token?.username)
  const navigate = useNavigate();

  const [childCreds, setChildCreds] = useState(
    {
      studentName: '',
      studentGender: '',
      studentAge: 'Age',
      parentId: userId
    }
  );
  
  const details:any = jwt_decode(token.token);
  //console.log(token.token);
   console.log(details.email);
  const [learnerList, setLearnerList] = useState<any>([])
  const [err, setErr] = useState<any>('')

  console.log(childCreds)
  useEffect(() =>{
    API.post('selectlearner', {userId : userId})
    .then((res) => {
      setLearnerList(res.data.result)
      console.log(res.data.result)
    })
    .catch((err) => {
      console.log(err)
    })
    
  },[])

  const handelChange = (e: any) => {

    const {name, value} = e.target
    setChildCreds({...childCreds, [name]:value})
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(childCreds.studentName.trim() === ''){
      setErr('Enter Name of The Learner')
    }else if(childCreds.studentGender === ''){
      setErr('Select Gender of The Learner')
    }else if(childCreds.studentAge === ''){
      setErr('Select Age of The Learner')
    } else if(learnerList.length >= 4){
    setErr('You have Reach the maxium number of Children')
   }else{
    await API.post('createchild', childCreds)
    .then(res => {
      console.log(res.data)
      API.post('addLearnerEmailService', {emailTo: details.email,parentId: childCreds.parentId} )
      .then(res => {
        console.log(res.data)
        navigate('/learner')
      }).catch(err => {
        console.log(err)
      })
      //navigate('/learner')
    }).catch(err => {
      console.log(err)
    })
    }
  }

  return (
    <div className="dark:bg-slate-900 " style={{marginTop:'-10px'}}>
      <Header/>
      <div className="select-learner text-center md:text-left " style={{ fontFamily: "Poppins" }}>
        <div>
          <h1 className="font-black text-lg lg:text-3xl dark:text-white" >
            Please Setup Your Child's Account{" "}
          </h1>
        </div>
        

        <Grid container  spacing={2} p={2}>
        <Grid item xs={12} md={9}>
              <Box
              className="md:w-96"
              style={{
                borderRadius: "5px",
                marginTop: "10px",
                color: "#917EBD",
              }}
            >
              <form onSubmit={(e) => handleSubmit(e)}>
                <Box>
                  <Box style={{ marginTop: "20px" }}>
                  </Box>
                  <input
                    type={"text"}
                    placeholder="Child Name"
                    className="form-input inputGeneralStyle text-sm md:text-lg"
                    name='studentName'
                    value={childCreds.studentName}
                    onChange={handelChange} 
                    style={{
                      height : '50px',
                      width: "100%",
                      marginBottom: "20px",
                    }}
                  ></input>
                </Box>
                <div className = 'flex justify-bewteen '>
                <Box style={{ width: "80%", margin: "auto" }}>
            <Select
              className="form-input inputGeneralStyle w-11/12 text-sm md:text-lg"
              name='studentGender'
              value={childCreds.studentGender}
              onChange={handelChange} 
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              style ={{height : '50px', borderRadius:'15px', color : '#917EBD'}}
            >
            <MenuItem value="" className = 'inputGeneralStyle'>
                <em>Gender</em>
              </MenuItem>
              <MenuItem value='male'>Male</MenuItem>
              <MenuItem value='female'>Female</MenuItem>
            </Select>
                </Box>
                <Box
                  className="childacc-inline flex flex-col w-11/12 text-sm md:text-lg"
                >      
                        <select 
                        id="age" 
                        className = 'inputGeneralStyle'
                        name='studentAge'
                        value={childCreds.studentAge} 
                        onChange={handelChange} 
                        style ={{height : '50px', borderRadius:'15px', color : '#917EBD',border: '1px solid #917EBD'}}
                        >
                            <option disabled>Age</option>
                            {
                                AGE.map(age => (
                                    <option value={age} key={age} className = 'inputGeneralStyle'>
                                        {age}
                                    </option>
                                ))
                            }
                        </select>
                </Box>
                </div>
                <Box style={{ width: "80%", margin: "auto", textAlign: "center",paddingBottom: "20px" }}>
                    <ThemeProvider theme={redTheme}>
                      <Button
                        type="submit"
                        className="buttonGeneralFirst text-sm md:text-lg  "
                        variant="contained"
                        style={{marginTop: "50px", backgroundColor : '#917EBD', borderRadius:'20px',fontWeight:'700', padding: '5px 30px 5px 30px'}}
                      >
                        Add Child
                      </Button>
                    </ThemeProvider>
                  {err ? <h1 style = {{marginTop : '30px', color : '#917EBD', border: '1px solid #917EBD', borderRadius: '20px', padding: '8px', fontSize: '15px', fontWeight:'300'}}>{err}</h1> : null}
                </Box>
              </form>
            </Box>
          </Grid>
          <Grid item xs={12} md={3} className="hidden xl:block">
            <Box sx={{ml: '-500px', mt: '-50px'}}>
              <PopOutCircle image={BImg} imageTop="4.7rem" imageLeft="0.2rem" />
            </Box>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
}

export default RegisterChild;