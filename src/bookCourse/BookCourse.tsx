import React, {useEffect, useState} from 'react'
import {Grid, Box, Typography, CardContent, CardActions, Button, Stack} from '@mui/material';

import { actionCreators } from '../redux';
import { RootState } from '../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import API from "../redux/api/api";

function BookCourse() {
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
	interface courseViewer {
		course_id: number;
		course_name: string;
		course_age: string;
		enrollment_type?: string | null;
		course_cost: string;
		course_description: string;
		course_learningobjective: string;
		course_image: string;
		course_numberofclasses: number;
		course_duration: number;
		course_status: string | null;
		course_progress: number;
	  }

	const [instructors, setInstructors] = useState();
	const [sessionID, setSessionID] = useState(null);
	console.log(sessionID)
	const course_id = useSelector((state: RootState) => state.courseIDFetch)
	console.log(course_id)
	const enrollment_id = useSelector((state: RootState) => state.EnrollmentIDFetch)
	const [sessionDetails, setSessionDetails] = useState<any>();
	console.log(sessionDetails)
	const [courseView, setCourseView] = useState<any>();
	const [confrim, setConfrim] = useState<any>('');
	const [leanerUser, setLearnerUser] = useState<any>(JSON.parse(localStorage.getItem('learner-details') || 'null'))

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		API.post('getsessionview', {courseId : course_id})
		.then((res)=>{
		  setSessionDetails(res.data)
		  setSessionID(res.data.session_id)
		}).catch((err) => {
		  console.log(err)
		})
		API.get<courseViewer[]>('getcourseview/'+course_id)
		.then((res)=>{
		  setCourseView(res.data)
		}).catch((err) => {
		  console.log(err)
		})

	}, [])

	const { fetchUsers, fetchInstructorID} = bindActionCreators(actionCreators, dispatch)


	// const handelConfirmCourse = () => {
	// 	API.post('enrollLearner', {courseId : course_id, studentId : leanerUser?.student_id, studentFeeStatus : true, sessionId : sessionId, enrollmentType : 'paid'})
	// 	  .then((res)=>{
	// 		setConfrim(res.data)
	// 	}).catch((err) => {
	// 	  console.log(err)
	// 	})
	//   }

	const handelBuyCourse = () => {

		if(enrollment_id !== 0){
			API.post("convertTrialToBuyCourse", {enrollmentId : enrollment_id})
		  .then((res) => {
			console.log(res.data)
			fetchInstructorID(0)
			navigate('/loggedcourseview')
		  })
		  .catch((err) => {
			console.log(err);
		  });
		}else{
			if(sessionID === null){
				API.post('enrollLearner', {courseId : course_id, studentId : leanerUser?.student_id, studentFeeStatus : true, sessionId : null, enrollmentType : 'paid'})
				.then((res) => {
					console.log(res.data)
					navigate('/loggedcourseview')
				  })
				  .catch((err) => {
					console.log(err);
				  });	
			}else{
				API.post('enrollLearner', {courseId : course_id, studentId : leanerUser?.student_id, studentFeeStatus : true, sessionId : sessionID, enrollmentType : 'paid'})
				.then((res) => {
					console.log(res.data)
					navigate('/loggedcourseview')
				  })
				  .catch((err) => {
					console.log(err);
				  });	
			}
		}	
	}

	useEffect(() => {
		// API.post("getinstructorlist", {courseId : course_id})
		//   .then((res) => {
		// 	setInstructors(res.data);
		//   })
		//   .catch((err) => {
		// 	console.log(err);
		//   });
	  }, []);

	  console.log(instructors);

  return (
	  <>
	     <Box>
			<Grid container spacing={2}>
				<Grid item xs={4} style={{height: '98vh',borderRight: '0.83px dashed #917EBD'}}>
				<Box width={"90%"} margin="auto">
					<Typography style={{fontSize: '14px', fontWeight: '900'}}>Buy Course</Typography>
					<Typography marginTop='30px'>Course:</Typography>
					<Typography fontSize={"16px"} fontWeight="700">Financial Literacy</Typography>
					<Typography width={"80%"}>Become financially savvy in managing money matters in a fun & interactive manner, helping develop the right behaviour & attitude towards money... </Typography>
					<Typography fontSize={"16px"} fontWeight="500" mt={"80px"}>Instructor:</Typography>
					<Typography fontSize={"16px"} fontWeight="700">George Smith</Typography>
					<Typography fontSize={"14px"} fontWeight="400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet sapien as.</Typography>
				</Box>
				</Grid>
				<Grid item xs={8}>
				<Box width={"90%"} margin="auto">
				<Typography fontSize={"14px"} fontWeight="600" color={"#505D68"} mb={"10px"}>Select Session</Typography>
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
				<Typography mt={"20px"} mb="5px" color="#505D68" fontWeight={"600"} fontSize="14px">Select Time</Typography>
				<Stack direction={"row"} spacing={2} marginBottom="20px">
					{timings.map(timing =>{
					return(
						<Box 
						style={{
							width: '120px',
							height: '30px',
							background:"#F9EDF5", 
							padding: '5px', 
							textAlign: 'center',
							border: '1.08671px solid #917EBD',
							borderRadius: '8px',
							fontSize: '12px',
							fontWeight: '700',
							color: '#917EBD'}}>{timing}</Box>
					)
					})}
				</Stack>
				<Box style={{background: '#F9EDF5', borderRadius: '30px', padding: '10px 20px 70px 20px'}}>
					<Box style={{color: '#505D68'}} fontWeight="900" ><Typography fontSize={"23px"}>Billing Details</Typography></Box>
					<Box style={{
						borderRadius: '18px',
						borderTop: '1px dashed #917EBD',
						borderLeft: '1px dashed #917EBD',
						borderRight: '1px dashed #917EBD',
						borderBottom: '1px solid #917EBD',
						padding: '15px'}}>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<Stack spacing={1}>
									<Typography>Course Name</Typography>
									<Typography>Course Type</Typography>
									<Typography>Number of sessions:</Typography>
									<Typography>Session Duration:</Typography>
									<Typography>Cost Per session:</Typography>
									<Typography>Start Date</Typography>
									<Typography>Start Time</Typography>
								</Stack>
							</Grid>
							<Grid item xs={6}>
								<Stack spacing={1} style={{float: 'right'}}>
									<Typography>Financial Literacy</Typography>
									<Typography>Hybrid</Typography>
									<Typography>06</Typography>
									<Typography>60 Minutes</Typography>
									<Typography>8$</Typography>
									<Typography>17 Jan</Typography>
									<Typography>11:00 AM</Typography>
								</Stack>
							</Grid>
						</Grid>
					</Box>
					<Button style={{background: '#917EBD', color: 'white', marginTop: '20px', paddingLeft: '30px', paddingRight: '30px', float: 'right'}} onClick = {handelBuyCourse}>Pay Now</Button>
				</Box>
				</Box>
				</Grid>
			</Grid>
		</Box>
	  </>
  )
}

export default BookCourse