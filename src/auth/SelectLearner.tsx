import React, {useState, useEffect} from "react";
import PersonIcon from "@mui/icons-material/Person";
import UpdateIcon from "@mui/icons-material/Update";
import AddIcon from "@mui/icons-material/Add";
import Header from "../components/organisms/Header";
import { Button } from '@mui/material';
import Footer from "../components/organisms/Footer";
import { HashLink as Link} from "react-router-hash-link";
import { useNavigate } from 'react-router-dom';
import "./auth.css";
import jwt_decode from "jwt-decode";
import API from '../redux/api/api';
import SelectLearnerHeader from "../LoggedInUser/SelectLearnerHeader";

function SelectLearner() {

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
    <>
      {/* <SelectLearnerHeader /> */}
      <Link to="/updateparentprofile">
        <Button size='small' style={{background: '#917EBD', color: 'white',paddingLeft: '20px', paddingRight: '20px', fontSize:'15px', float: 'right', marginRight: '50px'}}>
          <UpdateIcon/> <span style={{marginLeft: '10px'}}>Update Profile</span>
        </Button>
      </Link>
      <div className="select-learner">
        <div>
          <h1 className="font-black text-4xl">Please Select Learner!!</h1>
          <p className="text-stone-600">
            Add a New Learner, if Profile not Found
          </p>
        </div>
        <div className="learner-overview">
          {learnerList?.map((dataItem : any, index : any) => 
          
          <div className="learner-choose">
            <PersonIcon
              onClick = {() => {
              localStorage.setItem('learner-details', JSON.stringify(dataItem))
               navigate('/')
               window.location.reload();
                }
              }
              className="learner-icon"
              style={{
                color: "#917EBD",
                backgroundColor: "#F9EDF5",
                padding: "20px",
                fontSize: "150px",
                borderRadius: "50%",
              }}
            />
            <p className="learner-name md:text-left text-xl md:text-2xl mt-4 md:mt-8 font-bold text-stone-700">
              {dataItem?.student_name}
            </p>
          </div>
          )}
    
          
        </div>
        <hr />

        {learnerList.length < 4 &&<div className="learner-choose" style={{ marginTop: "30px" }}>
          <Link to="/registerchild">
            <AddIcon
              className="learner-icon"
              style={{
                color: "#C5B6D9",
                backgroundColor: "#F9EDF5",
                padding: "20px",
                fontSize: "150px",
                borderRadius: "50%",
              }}
            />
          </Link>
          <p
            style={{ marginLeft: "20px" }}
            className="learner-name md:text-left text-xl md:text-2xl mt-4 md:mt-8 font-bold text-stone-700"
          >
            Add Learner
          </p>
        </div>}
      </div>
      <Footer />
    </>
  );
  }
}

export default SelectLearner;
