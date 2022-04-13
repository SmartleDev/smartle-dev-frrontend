import React, {useState, useEffect} from 'react'
import {Grid, Box, Typography, CardContent, CardActions, Button, Stack} from '@mui/material';

import { actionCreators } from '../redux';
import { RootState } from '../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import API from "../redux/api/api";

function BookTrial() {
  const sessions = [
    {day: 'Monday',
    date: '17 Jan',
    spots: '2/10'
    },
    {day: 'Wednesday',
    date: '24 Jan',
    spots: '2/10'
    }
  ]

  const timings = ["11:00 AM", "6:00 PM"];

  const [instructors, setInstructors] = useState();

	const dispatch = useDispatch();

	const { fetchUsers, fetchCourseID} = bindActionCreators(actionCreators, dispatch)

	const course_id = useSelector((state: RootState) => state.courseIDFetch)

  const [courseView, setCourseView] = useState<courseViewer[]>([]);

  interface courseViewer {
    course_id: number;
    course_name: string;
    course_age: string;
    course_type: string;
    course_cost:string;
    course_description: string;
    course_learningobjective: string;
    course_image: string;
    course_numberofclasses: number;
    course_duration: number;
    course_status: string | null;
}

  useEffect(() => {
		API.post("getinstructorlist", {course_id : course_id})
		  .then((res) => {
			setInstructors(res.data);
		  })
		  .catch((err) => {
			console.log(err);
		  });
    
    API.get<courseViewer[]>('getcourseview/'+course_id)
    .then((res)=>{
      setCourseView(res.data)
    }).catch((err) => {
      console.log(err)
    })

    API.get<courseViewer[]>('instructorId/'+course_id)
    .then((res)=>{
      setCourseView(res.data)
    }).catch((err) => {
      console.log(err)
    })
    
	  }, []);
    console.log(instructors);
    console.log(courseView)

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={4} style={{height: '98vh',borderRight: '0.83px dashed #917EBD'}}>
          <Box width={"90%"} margin="auto">
            <Typography color={"#505D68"} style={{fontSize: '14px', fontWeight: '900'}}>Book a Trial</Typography>
            <Typography variant='h5' fontWeight={"900"} marginTop="10px" mb={"30px"}>Trial Details</Typography>
            <Typography>Course:</Typography>
            <Typography fontSize={"16px"} fontWeight="700">{courseView[0]?.course_name}</Typography>
            <Typography width={"80%"}>{courseView[0]?.course_description}</Typography>
            <Typography fontSize={"16px"} fontWeight="500" mt={"80px"}>Instructor:</Typography>
            <Typography fontSize={"16px"} fontWeight="700">George Smith</Typography>
            <Typography fontSize={"14px"} fontWeight="400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet sapien as.</Typography>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box width={"90%"} margin="auto">
          <Typography fontSize={"14px"} fontWeight="600" color={"#505D68"} mt="30px" mb={"20px"}>Select Session</Typography>
          <Stack direction={"row"} spacing={2}>
            {
              sessions.map(session => {
                return (
                    <Box 
                      sx={{ minWidth: 120 }}
                      style={{
                        background: '#F9EDF5', 
                        borderRadius:'8px', 
                        boxShadow: '1.66298px 8.31489px 23.2817px rgba(0, 0, 0, 0.12)',
                        padding: '10px',
                        }}>
                    <CardContent>
                      <Box style={{textAlign: 'center'}}><Typography fontSize={"14px"} fontWeight="600" margin={"auto"}>
                        {session.day}
                      </Typography>
                     
                      <Typography fontSize={"16px"} fontWeight="600">
                        {session.date}
                      </Typography>
                      <Typography fontSize={"10px"} fontWeight="400">
                        No. of spots left: {session.spots}
                      </Typography>
                      </Box>
                    </CardContent>
                    <CardActions style={{textAlign: 'center'}}>
                      <Box style={{margin: 'auto'}}>
                        <Button size='small' style={{background: '#917EBD', color: 'white',paddingLeft: '20px', paddingRight: '20px', fontSize:'10px'}}>Enroll Now</Button>
                      </Box>
                    </CardActions>
                  </Box>
                )
              })
            }
          </Stack>
          <Typography mt={"60px"} mb="5px" color="#505D68" fontWeight={"600"} fontSize="14px">Select Time</Typography>
          <Stack direction={"row"} spacing={2} marginBottom="60px">
            {timings.map(timing =>{
              return(
                <Box 
                  style={{
                    width: '120px',
                    height: '35px',
                    background:"#F9EDF5", 
                    padding: '5px', 
                    textAlign: 'center',
                    border: '1.08671px solid #917EBD',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#917EBD'}}>{timing}</Box>
              )
            })}
          </Stack>
          <Box style={{background: '#F9EDF5', height: '150px', borderRadius: '20px', textAlign: 'center'}}>
            <Box paddingTop={"30px"} style={{color: '#505D68', fontSize: '14px'}} fontWeight="900"><Typography >Other details:</Typography></Box>
            <Typography>Zoom conferencing details will be sent to your registered mail upon confirmation.</Typography>
            <Button style={{background: '#917EBD', color: 'white', marginTop: '10px', paddingLeft: '30px', paddingRight: '30px'}}>Confirm Trial</Button>
          </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default BookTrial