import React, {useEffect, useState} from 'react'
import {Grid, Box, Typography, CardContent, CardActions, Button, Stack} from '@mui/material';

import { actionCreators } from '../redux';
import { RootState } from '../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import moment from "moment";
import API from "../redux/api/api";
import jwt_decode from "jwt-decode";

function BookCourse() {
	
	const timings = ["11:00 AM", "6:00 PM"];
	interface courseViewer {
		course_id: number;
		course_name: string;
		course_age: string;
		enrollment_type?: string | null;
		course_cost: number;
		course_description: string;
		course_learningobjective: string;
		course_image: string;
		course_numberofclasses: number;
		course_duration: number;
		course_status: string | null;
		course_progress: number;
		course_type: string;
		course_indiancost : string | null;
	  }

	  interface sessionViewer{
		session_id : number;
		session_datetime : string | any;
		session_type : any;
		session_avalibility : number;
		instructor_id : number;
		session_seats : number;
		selected:boolean;
	  
	  }

	  interface courseInstructorViewer {
		course_id: number;
		course_name: string;
		course_age: string;
		course_type: string;
		course_cost:number;
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
		course_indiancost : string | any;
	}

	const [instructors, setInstructors] = useState();
	const [checked, setChecked] = useState<any>(false);
	const [instructor, setInstructor] = useState<any>([]);
	const [sessionID, setSessionID] = useState<any>(null);
	const [selectedDate, setSelectedDate] = useState('Not Selected');
	const [selectedTime, setSelectedTime] = useState('Not Selected');
	console.log(sessionID)
	const course_id = useSelector((state: RootState) => state.courseIDFetch)
	const enrollment_id = useSelector((state: RootState) => state.EnrollmentIDFetch)
	const [sessionDetails, setSessionDetails] = useState<sessionViewer[]>();
	console.log(sessionDetails)
	const [courseView, setCourseView] = useState<courseViewer[]>();
	const [confrim, setConfrim] = useState<any>(false);
	const [instructorCourseView, setInstructorCourseView] = useState<courseInstructorViewer[]>([]);
	console.log(instructorCourseView)
	const [leanerUser, setLearnerUser] = useState<any>(JSON.parse(localStorage.getItem('learner-details') || 'null'))
	const token = JSON.parse(localStorage.getItem('user-details') || '{}');
	const details:any = jwt_decode(token.token);
	//console.log(token.token);
	console.log(leanerUser.parent_id);

	const [couponCode, setCouponCode] = useState("");
	const [region, setRegion] = useState("");
	const [discount, setDiscount] = useState<any>(instructorCourseView[0]?.course_cost);
	const [finalCost, setFinalCost] = useState<any>(''||1);

	const [couponData, setCouponData] = useState<any>("");

	console.log(typeof(instructorCourseView[0]?.course_cost));
	const [couponMsg, setCouponMsg] = useState("");
	console.log(couponCode);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const {fetchEnrollmentID } = bindActionCreators(
		actionCreators,
		dispatch
	  );


	const handleChange = (event: any) =>{
		setCouponCode(event.target.value);
	}


	const handelBuyCourse = () => {
		if(enrollment_id !== 0){
			API.post("convertTrialToBuyCourse", {enrollmentId : enrollment_id})
		  .then((res) => {
			console.log(res.data)

			API.post('enrollCourseEmailService', {emailTo: details?.email,studentName: leanerUser?.student_name , courseId: course_id} )
			.then(res => {
			  console.log(res.data)
			}).catch(err => {
			  console.log(err)
			})

			fetchInstructorID(0)

			API.post("enrolledUserProgressDefault", {enrollmentId : enrollment_id, courseId : course_id})
			.then((res) => {
				console.log(res.data)

			})
			.catch((err) => {
			  console.log(err);
			});
			if(Array.isArray(couponData)){
				API.post("voucherCount", {voucherId : couponData[0]?.voucher_id})
				.then((res) => {
					console.log(res.data)
				})
				.catch((err) => {
				  console.log(err);
				});
			}
			

			navigate('/loggedcourseview')
			window.addEventListener("popstate", () => {
				navigate(1);
			});
		  })
		  .catch((err) => {
			console.log(err);
		  });
		}else{
			if(sessionID === null){
				API.post('enrollLearner', {courseId : course_id, studentId : leanerUser?.student_id, studentFeeStatus : true, sessionId : null, enrollmentType : 'paid'})
				.then((res) => {
					console.log(res.data)
					API.post('enrollCourseEmailService', {emailTo: details?.email,studentName: leanerUser?.student_name , courseId: course_id} )
					.then(res => {
					console.log(res.data)
					}).catch(err => {
					console.log(err)
					})

					if(Array.isArray(couponData)){
						API.post("voucherCount", {voucherId : couponData[0]?.voucher_id})
						.then((res) => {
							console.log(res.data)
						})
						.catch((err) => {
						  console.log(err);
						});
					}	

					navigate('/loggedcourseview')
					window.addEventListener("popstate", () => {
						navigate(1);
					});
					fetchEnrollmentID(0)
				  })
				  .catch((err) => {
					console.log(err);
				  });

				  
			}else{
				API.post('enrollLearner', {courseId : course_id, studentId : leanerUser?.student_id, studentFeeStatus : true, sessionId : sessionID, enrollmentType : 'paid'})
				.then((res) => {
					console.log(res.data)
					
					API.post('enrollCourseEmailService', {emailTo: details?.email,studentName: leanerUser?.student_name , courseId: course_id} )
					.then(res => {
					console.log(res.data)
					}).catch(err => {
					console.log(err)
					})
					
					
					API.post("enrolledUserProgressDefault", {enrollmentId : res.data?.enrolmentId, courseId : course_id})
					.then((res) => {
						console.log(res.data)
					})
					.catch((err) => {
					  console.log(err);
					});


					API.post("updateSessionAvaliablity", {sessionId : sessionID})
					.then((res) => {
					  console.log(res.data)
					})
					.catch((err) => {
					  console.log(err);
					});

					if(Array.isArray(couponData)){
						API.post("voucherCount", {voucherId : couponData[0]?.voucher_id})
						.then((res) => {
							console.log(res.data)
						})
						.catch((err) => {
						console.log(err);
						});
					}	

					navigate('/loggedcourseview')
					window.addEventListener("popstate", () => {
						navigate(1);
					});
					fetchEnrollmentID(0)
				  })
				  .catch((err) => {
					console.log(err);
				  });	
			}
		}	
	}
	console.log(instructorCourseView[0]?.course_numberofclasses);
	console.log(finalCost)
	console.log(instructorCourseView[0]?.course_numberofclasses * (finalCost));

	const handleCouponSubmit = (event: any) =>{
		event.preventDefault();
		console.log(couponCode)

		API.post('checkvoucher', {code: couponCode, course_id: course_id.toString(), parent_id: leanerUser.parent_id} )
		.then(res => {
			if(Array.isArray(res.data)){
				if(discount !== null){
					console.log("discount" , discount)
					console.log("res.data.resul" ,instructorCourseView[0]?.course_cost)

					let k = instructorCourseView[0]?.course_cost - (res.data[0]?.voucher_discount*instructorCourseView[0]?.course_cost)/100;
					setFinalCost(k);
					setCouponMsg("Coupon Applied!")
				}
			}else{
				setCouponMsg("Coupon Invalid!");
				setFinalCost(instructorCourseView[0]?.course_cost);
			}
			setCouponData(res.data);
		  console.log(res.data)
		}).catch(err => {
		  console.log(err)
		})
	}


	useEffect(() => {
		
		API.post('getsessionview', {courseId : course_id})
		.then((res)=>{
			const val = res.data?.map((dataItem:any) => ({ ...dataItem, selected: false }))
		  setSessionDetails(val)
		  console.log("Session Details", sessionDetails);
		  
		}).catch((err) => {
		  console.log(err)
		})

		API.get<courseInstructorViewer[]>('getcourseview/'+course_id)
      .then((res)=>{
        setInstructorCourseView(res.data)
		fetch('https://api.ipregistry.co/?key=tryout')
		.then(function (response) {
			return response.json();
		})
		.then(function (payload) {
			console.log(payload.location.country.name);
			setRegion(payload.location.country.name)
			//setFinalCost(instructorCourseView[0]?.course_indiancost)
		});
		if(region === 'india'){
			setFinalCost(res.data[0]?.course_indiancost)
		}else{
			setFinalCost(res.data[0]?.course_cost)
		}
      }).catch((err) => {
        console.log(err)
      })

	}, [])

	const {fetchInstructorID} = bindActionCreators(actionCreators, dispatch)


	  console.log(instructors);

  return (
	  <>
	     <Box>
			<Grid container spacing={2}>
				<Grid item xs={4} style={{height: '98vh',borderRight: '0.83px dashed #917EBD'}}>
				{instructorCourseView?.map((dataItem, index) => 
         <Box width={"90%"} margin="auto">
         <Typography color={"#505D68"} style={{fontSize: '14px', fontWeight: '900'}}>Book Course</Typography>
         <Typography variant='h5' fontWeight={"900"} marginTop="10px" mb={"30px"}>Course Details</Typography>
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
         {instructorCourseView[0]?.course_type !== 'Self-Paced' &&
		 <>
		 <Typography fontSize={"16px"} fontWeight="500" mt={"80px"}>Session Details:</Typography>
         {/* <Typography fontSize={"16px"} fontWeight="700">{dataItem?.instructor_name}</Typography>
         <Typography fontSize={"14px"} fontWeight="400">{dataItem?.instructor_description}</Typography> */}
         <Box width={'250px'} sx={{background: '#F9EDF5', borderRadius: '7px', padding: '20px'}}>
           <Typography>Date</Typography>
           <Typography variant='h6' fontWeight={600} style={{color: '#5D6878'}}>{selectedDate}</Typography>
           <Typography mt={2}>Time</Typography>
           <Typography variant='h6' fontWeight={600} style={{color: '#5D6878'}}>{selectedTime}</Typography>
         </Box>
		 </>
	   }
       </Box>
         )}
				</Grid>
				<Grid item xs={8}>
				<Box width={"90%"} margin="auto">
					{instructorCourseView[0]?.course_type !== 'Self-Paced' &&<Typography fontSize={"14px"} fontWeight="600" color={"#505D68"} mb={"10px"}>Select Session</Typography>}
					<Stack direction={"row"} spacing={2}>
					{
						sessionDetails !== undefined  && sessionDetails.map(session => {
							return (
								<>
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
							</Box>
							</CardContent>
							<CardActions style={{textAlign: 'center'}}>
							<Box style={{margin: 'auto'}}>
								{session.selected === false ? <Button 
									onClick = {() => {
									sessionDetails?.filter((dataItem, index) =>{
										 if(dataItem?.selected === true){
											dataItem.selected = false
										 }else{
											 console.log("hello")
										 }
										})
											session.selected = !session.selected	
										API.get('getInstructorDetails/'+session?.instructor_id)
										.then((res)=>{
										  setInstructor(res.data)
										  console.log(res.data)
										}).catch((err) => {
										  console.log(err)
										})
										console.log(session)
									fetchInstructorID(session?.instructor_id)
									// setInstructor(session?.instructor_id)
									setSessionID(session?.session_id)
									setSelectedDate(moment(session?.session_datetime).format("MMM Do"))
									setSelectedTime(new Date(session?.session_datetime).toLocaleString('en-US', {
									  hour: 'numeric',
									  minute: 'numeric'
									}))
									}} 
								size='small' style={{background: '#917EBD', color: 'white',paddingLeft: '20px', paddingRight: '20px', fontSize:'10px'}}> Enroll Now</Button>
								:
								<Button onClick = {() => {
									session.selected = !session.selected
									setSessionID(null)
									fetchInstructorID(0)
									setSelectedDate('Not Selected')
									setSelectedTime('Not Selected')
									}} size='small' style={{background: 'white', color: '#917EBD',paddingLeft: '20px', paddingRight: '20px', fontSize:'10px'}}> Selected</Button>}
							</Box>
							</CardActions>
						</Box>
				</>
						)
					})
				}
				</Stack>
		
				<Box style={{background: '#F9EDF5', borderRadius: '30px', padding: '10px 20px 70px 20px', marginTop : '80px'}}>
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
									<Typography>{instructorCourseView !== undefined && instructorCourseView[0]?.course_name}</Typography>
									<Typography>{instructorCourseView !== undefined && instructorCourseView[0]?.course_type}</Typography>
									<Typography>{instructorCourseView !== undefined && instructorCourseView[0]?.course_numberofclasses}</Typography>
									<Typography>{instructorCourseView !== undefined && instructorCourseView[0]?.course_duration/60} minutes</Typography>
									<Typography>${instructorCourseView !== undefined && instructorCourseView[0]?.course_cost}</Typography>
									{instructorCourseView[0]?.course_type !== 'Self-Paced' ?
									<>
									<Typography>{selectedDate}</Typography>
									<Typography>{selectedTime}</Typography>
									</>
									:
									<>
									<Typography>-</Typography>
									<Typography>-</Typography>
									</>
									}
								</Stack>
							</Grid>
						</Grid>
					</Box>
					<Grid container spacing={2} style={{margin:'10px 0px 10px 0px'}}>
						<Grid item sm={12} md={6}>
							{sessionID !== null &&<Box>
								<Typography fontWeight={900}>Apply Coupon</Typography>
								<Box>
									<form onSubmit={(e) => handleCouponSubmit(e)}>
										<input style={{height: '32px'}} name="coupon" onChange={handleChange}/>
										<Button type="submit" style={{background: '#917EBD', color: 'white',paddingLeft: '20px', paddingRight: '20px', fontSize:'12px', fontWeight:'900', borderRadius:'0px'}}>Apply</Button>
									</form>
								</Box>
								<Typography fontWeight={900}>{couponMsg}</Typography>
								</Box>
							}
						</Grid>
						<Grid item sm={12} md={6}>
						{instructorCourseView[0]?.course_type !== 'Self-Paced' ? 
							finalCost === 1 ? 
							<Typography style={{textAlign: 'right', marginRight: '10px', marginTop: '10px'}} variant='h5' fontWeight={800}>Total Cost : ${instructorCourseView !== undefined && instructorCourseView[0]?.course_numberofclasses * instructorCourseView[0]?.course_cost}</Typography> : 
							<Typography style={{textAlign: 'right', marginRight: '10px', marginTop: '10px'}} variant='h5' fontWeight={800}>Total Cost : ${instructorCourseView !== undefined && instructorCourseView[0]?.course_numberofclasses * finalCost}</Typography>
						
							
						:
						finalCost === 1 ? 
						<Typography style={{textAlign: 'right', marginRight: '10px', marginTop: '10px'}} variant='h5' fontWeight={800}>Total Cost : ${instructorCourseView !== undefined && instructorCourseView[0]?.course_cost}</Typography> :
						<Typography style={{textAlign: 'right', marginRight: '10px', marginTop: '10px'}} variant='h5' fontWeight={800}>Total Cost : ${instructorCourseView !== undefined && finalCost}</Typography>
						}
							{sessionID !== null &&<Button style={{background: '#917EBD', color: 'white', marginTop: '10px', paddingLeft: '70px', paddingRight: '70px', float: 'right', fontWeight:'900'}} onClick = {handelBuyCourse}>Pay Now</Button>}
							{instructorCourseView[0]?.course_type === 'Self-Paced' &&<Button style={{background: '#917EBD', color: 'white', marginTop: '10px', paddingLeft: '70px', paddingRight: '70px', float: 'right', fontWeight:'900'}} onClick = {handelBuyCourse}>Pay Now</Button>}
						</Grid>
					</Grid>
					
				</Box>
				</Box>
				</Grid>
			</Grid>
		</Box>
	  </>
  )
}

export default BookCourse;