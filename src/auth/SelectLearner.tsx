import React, {useState, useEffect} from "react";
import PersonIcon from "@mui/icons-material/Person";
import UpdateIcon from "@mui/icons-material/Update";
import AddIcon from "@mui/icons-material/Add";
import Header from "../components/organisms/Header";
import { Button,Box } from '@mui/material';
import Footer from "../components/organisms/Footer";
import { HashLink as Link} from "react-router-hash-link";
import { useNavigate } from 'react-router-dom';
import "./auth.css";
import jwt_decode from "jwt-decode";
import API from '../redux/api/api';
import SelectLearnerHeader from "../LoggedInUser/SelectLearnerHeader";
import useMediaQuery from '@mui/material/useMediaQuery'
import HeaderAfterLoggedIn from "../components/organisms/HeaderAfterLoggedIn";
import MobileLoggedHeader from "../LoggedInUser/MobileLoggedHeader";

function SelectLearner() {

  const isMobile = useMediaQuery('(max-width:768px)');
  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-details') || 'null'))
  const [userId, setUserId] = useState<any>(user?.username)
  const [learnerList, setLearnerList] = useState<any>([])
  const [learner, setLearner] = useState<any>('')
  console.log(user)
  const navigate = useNavigate()

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

  console.log(learnerList.length)
  if(user === null){
    return(<h1>Hello</h1>)
  }else{
  return (
   
    <div className="dark:bg-slate-900" style={{marginTop: '-35px'}}>
       <MobileLoggedHeader />
      {/* <SelectLearnerHeader /> */}
      {/* <Link to="/updateparentprofile">
        <Button size='small' style={{background: '#917EBD', color: 'white',paddingLeft: '20px', paddingRight: '20px', fontSize:'15px', float: 'right', marginRight: '50px'}}>
          <UpdateIcon/> <span style={{marginLeft: '10px'}}>Update Profile</span>
        </Button>
      </Link> */}
      <div className="select-learner ">
        <div>
          <h1 className="font-black text-2xl text-center md:text-left pt-10 dark:text-white">Who's Learning?</h1>
          <p className="text-stone-600 text-center  md:text-left dark:text-white mb-10">
            Add a New Learner, if Profile not Found
          </p>
        </div>
        <div className="learner-overview justify-center md:justify-start ">
          {learnerList?.map((dataItem : any, index : any) => 
          <div className="learner-choose w-6/12 md:w-3/12 text-center">
            <PersonIcon
            sx={{width:'100px', height:'100px'}}
              onClick = {() => {
              localStorage.setItem('learner-details', JSON.stringify(dataItem))
               navigate('/')
               window.location.reload();
                }
              }
              className="learner-icon md:w-28 md:h-28 lg:w-36 lg:h-36"
          
              style={{
                color: "#917EBD",
                backgroundColor: "#F9EDF5",
                padding: "20px",
                fontSize: "150px",
                borderRadius: "50%",
              }}
            />
            <Box className="dark:text-white learner-name text-sm text-center md:text-lg mt-4 md:mt-8 font-bold text-stone-700" style={{marginLeft:'-8px'}}>
              {dataItem?.student_name}
            </Box>
          </div>
          )}
          {learnerList.length < 4 &&<div className="learner-choose w-6/12 md:w-3/12 text-center" >
          <Link to="/registerchild">
            <AddIcon
              className="learner-icon w-24 h-24 lg:w-36 lg:h-36"
              style={{
                color: "#C5B6D9",
                backgroundColor: "transparent",
                padding: "20px",
                // fontSize: "150px",
                border : '2px solid #C5B6D9',
                borderRadius: "50%",
              }}
            />
          </Link>
          <p
            className=" dark:text-white learner-name text-center text-md md:text-xl mt-4 md:mt-8 font-bold text-stone-700"
            style={{marginLeft:'-5px'}}
          >
            Add Learner
          </p>
        </div>}
          
        </div>

        
      </div>
      <Footer />
    </div>
  );
  }
}

export default SelectLearner;
