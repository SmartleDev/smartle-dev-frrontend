import React, {useState, useEffect} from 'react'
import {Grid, Box, Typography, CardContent, CardActions, Button, Stack, Snackbar, Alert} from '@mui/material';

import { actionCreators } from '../redux';
import { RootState } from '../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import API from "../redux/api/api";
import moment from "moment";
import { useNavigate } from 'react-router-dom';

function BookTrial() {

  const navigate = useNavigate()

  const [instructor, setInstructor] = useState<any>([]);
  console.log(instructor)
  const [sessionId, setSessionId] = useState<any>(null);
  const [msgStatus,setMsgStatus] = useState<any>('error');
  console.log(instructor, "INSTRUCTOR")
	const dispatch = useDispatch();
	const {fetchInstructorID} = bindActionCreators(actionCreators, dispatch)

	const course_id = useSelector((state: RootState) => state.courseIDFetch)
  const instructor_id = useSelector((state: RootState) => state.InstructorIDFetch)
  interface courseInstructorViewer {
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
    instructor_course_id: number;
    instructor_id: number;
    instructor_name: string;
    instructor_email:string;
    instructor_timing : string | null;
    instructor_description : string | null;
}

interface sessionViewer{
  session_id : number;
  session_datetime : string | any;
  session_type : any;
  session_avalibility : number;
  instructor_id : number;
  session_seats : number;

}
const [leanerUser, setLearnerUser] = useState<any>(JSON.parse(localStorage.getItem('learner-details') || 'null'))

  const [sessionDetails, setSessionDetails] = useState<sessionViewer[]>([]);
  const [confrim, setConfrim] = useState<any>('');
  const [selectedDate, setSelectedDate] = useState('Not Selected');
  const [selectedTime, setSelectedTime] = useState('Not Selected');
  const [open, setOpen] = React.useState(false);

  const [msg, setMsg] = useState("");
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  console.log(confrim.message)
  const [instructorCourseView, setInstructorCourseView] = useState<courseInstructorViewer[]>([]);
  console.log(instructorCourseView)




  // const dateToTime = (date : any) => date.toLocaleString('en-US', {
  //   hour: 'numeric',
  //   minute: 'numeric'
  // });
  // var today = new Date()
  // console.log(today)
  // console.log(`${dateToTime(today)}`);

  // const handelConfirmTrial = () => {
  //     setMsgStatus('error')
  //     setMsg('Please select a session in order to confirm a trial');
  //     setOpen(true);
  // }

  const handleProperConfirmTrial = () => {
      API.post('enrollLearner', {courseId : course_id, studentId : leanerUser?.student_id, studentFeeStatus : null, sessionId : sessionId, enrollmentType : 'trial'})
      .then((res)=>{
        setMsgStatus('success');
        setMsg(confrim.message);
        setOpen(true);
        setConfrim(res.data)
        if(open === true){
          navigate('/loggedcourseview/');
        }
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {

      API.get<courseInstructorViewer[]>('getcourseview/'+course_id)
      .then((res)=>{
        setInstructorCourseView(res.data)
      }).catch((err) => {
        console.log(err)
      })

    API.post('getsessionview', {courseId : course_id})
    .then((res)=>{
      setSessionDetails(res.data)
    }).catch((err) => {
      console.log(err)
    })

	  }, []);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={4} style={{height: '98vh',borderRight: '0.83px dashed #917EBD'}}>
         {instructorCourseView?.map((dataItem, index) => 
         <Box width={"90%"} margin="auto">
         <Typography color={"#505D68"} style={{fontSize: '14px', fontWeight: '900'}}>Book a Trial</Typography>
         <Typography variant='h5' fontWeight={"900"} marginTop="10px" mb={"30px"}>Trial Details</Typography>
         <Typography>Course:</Typography>
         <Typography fontSize={"16px"} fontWeight="700">{dataItem?.course_name}</Typography>
         <Typography width={"80%"}>{dataItem?.course_description}</Typography>
         {instructor.length !== 0 &&
         <>
         <Typography fontSize={"16px"} fontWeight="800" mt={"80px"}>Instructor Details:</Typography>
         <Typography fontSize={"18px"} fontWeight="600">{instructor[0]?.instructor_name}</Typography>
         <Typography fontSize={"16px"} fontWeight="500">{instructor[0]?.instructor_description}</Typography>
         </>
         }
         <Typography fontSize={"16px"} fontWeight="500" mt={"80px"}>Session Details:</Typography>
         {/* <Typography fontSize={"16px"} fontWeight="700">{dataItem?.instructor_name}</Typography>
         <Typography fontSize={"14px"} fontWeight="400">{dataItem?.instructor_description}</Typography> */}
         <Box width={'250px'} sx={{background: '#F9EDF5', borderRadius: '7px', padding: '20px'}}>
           <Typography>Date</Typography>
           <Typography variant='h6' fontWeight={600} style={{color: '#5D6878'}}>{selectedDate}</Typography>
           <Typography mt={2}>Time</Typography>
           <Typography variant='h6' fontWeight={600} style={{color: '#5D6878'}}>{selectedTime}</Typography>
         </Box>
       </Box>
         )}
        </Grid>
        <Grid item xs={8}>
          <Box width={"90%"} margin="auto">
          <Typography fontSize={"14px"} fontWeight="600" color={"#505D68"} mt="30px" mb={"20px"}>Select Session</Typography>
          <Stack direction={"row"} spacing={2}>
            {
              sessionDetails.map(session => {
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
                      {moment(session?.session_datetime).format('dddd')}
                      </Typography>
                     
                      <Typography fontSize={"16px"} fontWeight="600">
                        {moment(session?.session_datetime).format("MMM Do")}
                      </Typography>
                      <Typography fontSize={"10px"} fontWeight="400">
                        No. of spots left: {session?.session_avalibility}/{session?.session_seats}
                      </Typography>
                      </Box>
                      <Box 
                  style={{
                    cursor: 'pointer',
                    width: '80px',
                    margin: '10px 0 0 8px',
                    height: '20px',
                    background:"#F9EDF5", 
                    textAlign: 'center',
                    border: '1.08671px solid #917EBD',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#917EBD'}}>{new Date(session?.session_datetime).toLocaleString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric'
                    })}</Box>
                    </CardContent>
                    <CardActions style={{textAlign: 'center'}}>
                      <Box style={{margin: 'auto'}}>
                        <Button onClick = {() => {
                              API.get('getInstructorDetails/'+session?.instructor_id)
                              .then((res)=>{
                                setInstructor(res.data)
                                console.log(res.data)
                              }).catch((err) => {
                                console.log(err)
                              })
                                      
                          fetchInstructorID(session?.instructor_id)
                          // setInstructor(session?.instructor_id)
                          setSessionId(session?.session_id)
                          setSelectedDate(moment(session?.session_datetime).format("MMM Do"))
                          setSelectedTime(new Date(session?.session_datetime).toLocaleString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric'
                          }))
                          }} 
                          size='small' style={{background: '#917EBD', color: 'white',paddingLeft: '20px', paddingRight: '20px', fontSize:'10px'}}>Enroll Now</Button>
                      </Box>
                    </CardActions>
                  </Box>
                )
              })
            }
          </Stack>
          <Typography mt={"80px"} mb="5px" color="#505D68" fontWeight={"600"} fontSize="14px"></Typography>
          {sessionId !== null &&
          <>
          <Box style={{background: '#F9EDF5', height: '150px', borderRadius: '20px', textAlign: 'center'}}>
            <Box paddingTop={"30px"} style={{color: '#505D68', fontSize: '14px'}} fontWeight="900"><Typography >Other details:</Typography></Box>
            <Typography>Zoom conferencing details will be sent to your registered mail upon confirmation.</Typography>
             <Button style={{background: '#917EBD', color: 'white', marginTop: '10px', paddingLeft: '30px', paddingRight: '30px'}} onClick = {handleProperConfirmTrial}>Confirm Trial</Button>
           </Box>
           </>}
          {/* {sessionId !== null ?
          <>
            <Box paddingTop={"30px"} style={{color: '#505D68', fontSize: '14px'}} fontWeight="900"><Typography >Other details:</Typography></Box>
            <Typography>Zoom conferencing details will be sent to your registered mail upon confirmation.</Typography>
             <Button style={{background: '#917EBD', color: 'white', marginTop: '10px', paddingLeft: '30px', paddingRight: '30px'}} onClick = {handleProperConfirmTrial}>Confirm Trial</Button>
             </>
             
              :
              <>
              <Box paddingTop={"30px"} style={{color: '#505D68', fontSize: '14px'}} fontWeight="900">
                <Typography >Note:</Typography></Box>
            <Typography>Select a Session to Move Forward with Booking of the Course.</Typography>
              <Button style={{background: 'gray', color: 'white', marginTop: '10px', paddingLeft: '30px', paddingRight: '30px'}} >Confirm Trial</Button>
           </>} */}
          </Box>
        </Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert variant='filled' onClose={handleClose} severity={msgStatus} sx={{ width: '100%' }}>
          {msg}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default BookTrial