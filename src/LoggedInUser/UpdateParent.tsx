import React, {useState, useEffect} from 'react';
import {Box, Typography, Button} from '@mui/material';
import UpdateIcon from "@mui/icons-material/Update";
import API from "../redux/api/api";

const UpdateParent = () => {

    const [parent, setParent] = useState(JSON.parse(localStorage.getItem('user-details') || 'null'))
    console.log(parent?.username);

    const [updateDetails, setUpdateDetails] : any = useState(
        {
          phone: ''
        }
      );

    const handelChange = (event: any) => {

    const {name , value } : any = event.target
    setUpdateDetails({...updateDetails, [name]:value})
    
    }

    const  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(updateDetails);
    }

    interface parentInfo{
        parent_id: string;
		parent_name : string;
		parent_email : string;
		parent_contactno : any;
	  }

      const [parentInfo, setParentInfo] = useState<parentInfo[]>();
      console.log(parentInfo);
    useEffect(() => {

        // API.get<parentInfo[]>('setparentinfo', {parent_id: parent?.username})
        //   .then((res) => {
        //     setParentInfo(res.data);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
      }, []);

    return (
        <Box >
            <Typography sx={{textAlign: 'center', fontSize:'40px', fontWeight: '900', marginBottom: '20px'}}>PROFILE</Typography>
            <form onSubmit={(e) => handleSubmit(e)} >
            <Box
            style={{ display: "flex", flexDirection: "column", width: "724px", margin:'auto' }}
            >
                    <Box><Typography fontSize={20} fontWeight={800}> Name </Typography></Box>
                    <input
                        type={"text"} 
                        placeholder="Name"
                        style={ {background: "#F9EDF5", height: '40px',borderRadius: "3px", padding: "8px" } }
                        name = 'name'
                        value={updateDetails.name} 
                        onChange={handelChange} 
                    />
            
            <Box sx={{marginTop: '20px'}}><Typography fontSize={20} fontWeight={800}> Email Id </Typography></Box>
            <input
                type={"email"} 
                placeholder="abcd123@gmail.com"
                style={ {background: "#F9EDF5", height: '40px',borderRadius: "3px", padding: "8px" } }
                name = 'email'
                value={updateDetails.email} 
                onChange={handelChange} 
            />
           <Box sx={{marginTop: '20px'}}><Typography fontSize={20} fontWeight={800}> Phone </Typography></Box>
            <input
                type={"tel"} 
                placeholder="Enter your mobile phone number"
                style={ {background: "#F9EDF5", height: '40px',borderRadius: "3px", padding: "8px" } }
                name = 'about'
                value={updateDetails.about} 
                onChange={handelChange} 
            />
            </Box>
            <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                width: "600px",
                padding: "40px",
                margin: 'auto'
            }}
            >
            <div>
                
                <Button
                variant="contained"
                style={{ width: 100, background: "#917EBD" }}
                type="submit"
                >
                <UpdateIcon/>
                    Update
                </Button>
            </div>
            </div>
            </form>
        </Box>
    );
};

export default UpdateParent;