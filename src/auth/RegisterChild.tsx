import React, { useState, useEffect } from "react";
import { Typography, Box, Button} from "@mui/material";
import { HashLink as Link } from "react-router-hash-link";
import Header from "../components/organisms/Header";
import Footer from "../components/organisms/Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import API from '../redux/api/api';
import jwt_decode from "jwt-decode";

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
      studentAge: '',
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
    <>
      <Header />
      <div className="select-learner" style={{ fontFamily: "Nunito Sans" }}>
        <div>
          <h1 className="font-black text-4xl">
            Please Setup Your Child's Account{" "}
          </h1>
          {/* <p className="text-stone-600">
            Already Have an Account, Login in now!
          </p> */}
        </div>
        <p className="text-center md:text-left text-xl md:text-4xl mt-4 md:mt-8 text-stone-600">
          Child Account Details
        </p>
        <Typography fontSize={"14px"}>Exlore the joy of journey!</Typography>
        <Box
          className="form-class"
          width={"40%"}
          style={{
            backgroundColor: "#F9EDF5",
            borderRadius: "5px",
            marginTop: "10px",
            color: "#917EBD",
          }}
        >
          <form onSubmit={(e) => handleSubmit(e)}>
            <Box style={{ width: "80%", margin: "auto", paddingTop: "10px" }}>
              <Box style={{ marginTop: "20px" }}>
                <label style={{ marginTop: "100px" }}>Child Name</label>
              </Box>
              <input
                type={"text"}
                placeholder="Enter your Child Name"
                className="form-input"
                name='studentName'
                value={childCreds.studentName}
                onChange={handelChange} 
                style={{
                  padding: "8px",
                  width: "100%",
                  borderRadius: "3px",
                  marginBottom: "20px",
                }}
              ></input>
            </Box>
            <Box style={{ width: "80%", margin: "auto" }}>
              <div>
                <label>Gender</label>
              </div>
        <Select
		      className="form-input"
          name='studentGender'
          value={childCreds.studentGender}
          onChange={handelChange} 
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
		      style={{ width: "100%", borderRadius: "3px", backgroundColor:'white' }}
        >
         <MenuItem value="">
            <em>Male/Female</em>
          </MenuItem>
          <MenuItem value='male'>Male</MenuItem>
          <MenuItem value='female'>Female</MenuItem>
        </Select>
            </Box>
            <Box
              className="childacc-inline"
              style={{ width: "80%", margin: "auto", paddingTop: "10px" }}
            >
                <label htmlFor="age" style={{marginTop:"20px", marginBottom:"20px"}}>
                    Age: 
                    <select 
                    id="age" 
                    name='studentAge'
                    value={childCreds.studentAge} 
                    onChange={handelChange} 
                    style={{padding: "10px", marginLeft:"10px", fontSize:"20px", borderRadius: "5px"}}
                    >
                        <option />
                        {
                            AGE.map(age => (
                                <option value={age} key={age}>
                                    {age}
                                </option>
                            ))
                        }
                    </select>
                </label>

             
            </Box>
            <Box style={{ width: "80%", margin: "auto", textAlign: "center",paddingBottom: "20px" }}>
              {/* <Link to={"/"}> */}
                <ThemeProvider theme={redTheme}>
                  <Button
                    type="submit"
                    className="auth-button"
                    variant="contained"
                    style={{
                      width: "100%",
                      marginTop: "20px",
                      backgroundColor: "#917EBD",
                    }}
                  >
                    Add Child
                  </Button>
                </ThemeProvider>
              {/* </Link> */}
    
              <h1 style = {{paddingTop : '10px', color : 'red'}}>{err}</h1>
            </Box>
            {/* <Box
              style={{
                width: "80%",
                margin: "auto",
                textAlign: "center",
                marginTop: "20px",
                paddingBottom: "20px",
              }}
            >
              <Link to={"/signup"}>
                <ThemeProvider theme={redTheme}>
                  <Button
                    className="auth-button"
                    style={{
                      width: "100%",
                      color: "#917EBD",
                      borderColor: "#917EBD",
                    }}
                    variant="outlined"
                  >
                    Setup Account
                  </Button>
                </ThemeProvider>
              </Link>
            </Box> */}
          </form>
        </Box>
      </div>
      <Footer />
    </>
  );
}

export default RegisterChild;