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
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { height } from '@mui/system';


const BookingTrial = () => {


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
	console.log(course_id)
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

    const [arrowState, setArrowState] = useState(true);
    const [uparrowState, setUpArrowState] = useState(false);

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
	console.log(sessionDetails?.reverse());

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
			

			navigate('/')
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

					navigate('/')
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

					navigate('/')
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

    const [open, setOpen] = React.useState(false);

    const [msg, setMsg] = useState("");
    const [msgStatus,setMsgStatus] = useState<any>('error');  

    const handleProperConfirmTrial = () => {
        API.post('enrollLearner', {emailTo: details?.email,courseId : course_id, studentId : leanerUser?.student_id, studentFeeStatus : null, sessionId : sessionID, enrollmentType : 'trial'})
        .then((res)=>{
          API.post('enrollTrialCourseEmailService', {emailTo: details?.email,studentName: leanerUser?.student_name , courseId: course_id} )
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
  
          setMsgStatus('success');
          setMsg(confrim.message);
          setOpen(true);
          setConfrim(res.data)
          navigate('/');
          window.addEventListener("popstate", () => {
            navigate(1);
          });
          if(open === true){
            navigate('/');
            window.addEventListener("popstate", () => {
                          navigate(1);
                      });
          }
      }).catch((err) => {
        console.log(err)
      })
    }

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
    let divHeight:string = "450px";
    const handleArrowClick = () =>{

        divHeight = "200px";
        setArrowState(!arrowState);
    }

	const calculateFinalCost = () =>{
		if(region === 'India'){
			console.log("Region India");
		}else{
			console.log("Region outside India");
		}
	}

    return (
        <>
        <Box  style={{background: 'linear-gradient(#F0E9FF, #F5E5FF)', margin:'-30px', borderRadius:'0 0px 20px 20px', boxShadow: '17px 23px 60px #DFD1E7', paddingBottom: '20px'}}>
            <Grid container spacing={2} style={{marginBottom: '0px'}}>
                <Grid item xs={12} md={3}>
                    <Box style={{marginLeft:'90px', marginTop:'40px'}}>
                        <Typography style={{color:'#917EBD', fontSize:'16px'}}>Book Course</Typography>
                        <Typography style={{fontSize:'18px', fontWeight: 'bold'}}>Course Details</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Box style={{marginTop:'40px'}}>
                    {instructorCourseView?.map((dataItem, index) => 
                        <Box width={"90%"} className='ml-20 lg:ml-0'>
                            <Typography style={{color:'#917EBD'}}>Course :</Typography>
                            <Typography fontSize={"16px"} fontWeight="700">{dataItem?.course_name}</Typography>
                            <Typography width={"300px"}>{dataItem?.course_description}</Typography>

                        </Box>
                    )}
                    </Box>
                </Grid>
                {selectedDate !== 'Not Selected' && <Grid item xs={12} md={4} className='ml-20 lg:ml-0'>
                    {instructorCourseView[0]?.course_type !== 'Self-Paced' &&
                        <>
                            <Typography fontSize={"16px"} fontWeight="500" mt={"40px"}>Session Details:</Typography>
                            
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography mt={"20px"} fontSize="18px" fontWeight={700}>Date</Typography>
                                    <Typography fontWeight={600} style={{color: '#917EBD'}} className='text-sm md:text-base' >{selectedDate}</Typography>
                                </Grid>
                                <Grid item xs={6} className='text-center'>
                                    <Typography mt={2} fontSize="18px" fontWeight={700}>Time</Typography>
                                    <Typography variant='h6' fontWeight={600} style={{color: '#917EBD'}} className='text-sm md:text-base'>{selectedTime}</Typography>
                                </Grid>
                            </Grid>
                        </>
                    }
                </Grid>}
            </Grid>
            {arrowState === true && <Stack direction={"row"} spacing={2} style={{justifyContent:'center', marginTop: '50px'}} className='ml-20 lg-ml-0'>
					{
						sessionDetails !== undefined  && sessionDetails.map(session => {
							return (
								<>
							<Box 
							sx={{ width: 180 }}
							style={{
								background: '#F9EDF5', 
								borderRadius:'8px', 
								boxShadow: '1.66298px 8.31489px 23.2817px rgba(0, 0, 0, 0.12)',
								padding: '5px',
								}}>
							<CardContent>
							<Box >
							
							<Typography fontSize={"16px"} fontWeight="600" mt={"-10px"} >
								{moment(session?.session_datetime).format("MMM Do YYYY")}
							</Typography>
                            <Typography fontSize={"16px"} fontWeight="600" margin={"auto"}>
								{moment(session?.session_datetime).format('dddd')}
							</Typography>
                            <Typography 
                                style={{
                                    cursor: 'pointer',
                                    width: '80px',
                                    margin: '5px 0px 10px ',
                                    height: '20px',
                                    background:"#F9EDF5", 
                                    fontSize: '16px',
                                    fontWeight: '700',
                                    color: '#917EBD'}}>{new Date(session?.session_datetime).toLocaleString('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric'
                                    })}
                            </Typography>
		
							
							</Box>
							</CardContent>
							<CardActions style={{textAlign: 'center'}}>
							<Box style={{margin: 'auto'}}>
							{
									session.session_avalibility > 0 ?
<div>								{session.selected === false ? <Button 
									onClick = {() => {
									sessionDetails?.filter((dataItem, index) =>{
										 if(dataItem?.selected === true){
                                            handleArrowClick();
											dataItem.selected = false
										 }else{
                                            handleArrowClick();
										 }
										})
											session.selected = !session.selected	
										API.get('getInstructorDetails/'+session?.instructor_id)
										.then((res)=>{
										  setInstructor(res.data)
										}).catch((err) => {
										  console.log(err)
										})
									fetchInstructorID(session?.instructor_id)
									setSessionID(session?.session_id)
									setSelectedDate(moment(session?.session_datetime).format("MMM Do YYYY"))
									setSelectedTime(new Date(session?.session_datetime).toLocaleString('en-US', {
									  hour: 'numeric',
									  minute: 'numeric'
									}))
									}} 
								size='small' style={{background: '#917EBD', color: 'white',paddingLeft: '20px', paddingRight: '20px', fontSize:'12px', fontWeight:'700'}}> Enroll Me</Button>
								:
								<Button onClick = {() => {
									session.selected = !session.selected
									setSessionID(null)
									fetchInstructorID(0)
									setSelectedDate('Not Selected')
									setSelectedTime('Not Selected')
									}} size='small' style={{background: 'white', color: '#917EBD',paddingLeft: '20px', paddingRight: '20px', fontSize:'12px'}}> Selected</Button>}</div> : 
									<div>
																		<Button disabled={true} size='small' style={{background: 'black', color: 'white',paddingLeft: '20px', paddingRight: '20px', fontSize:'12px'}}> Full</Button>
									</div>
								}
							</Box>
							</CardActions>
							{session?.session_avalibility > 0 ?<Typography fontSize={"14px"} fontWeight="400" textAlign={"center"} mb={"10px"}>
								No. of spots left: {session?.session_avalibility}/{session?.session_seats}
							</Typography>
						:
						<Typography fontSize={"14px"} fontWeight="400" textAlign={"center"} mb={"10px"}>
								Session Seats Full
							</Typography>	
						}
						</Box>
				</>
						)
					})
				}
            </Stack>}
            {!arrowState && 
                <Box 
                    style={{
                        margin: 'auto',
                        width: '60px', 
                        
                        
                        padding:'0px', 
                        textAlign: 'center', 
                        justifyContent: 'center'
                        }} 
                        onClick={handleArrowClick}>
                            <KeyboardArrowDownIcon sx={{fontSize:'50px', color: '#917EBD', marginTop: '0px', position:'absolute',background: 'linear-gradient(91.54deg, #F5E5FF 0.5%, #F0E9FF 99.75%)', borderRadius: '25px', }}/>
                </Box>
            }
            {/* {!uparrowState && 
                <Box 
                    style={{
                        margin: 'auto',
                        width: '60px', 
                        
                        
                        padding:'0px', 
                        textAlign: 'center', 
                        justifyContent: 'center'
                        }} 
                        onClick={handleArrowClick}>
                            <KeyboardArrowUpIcon sx={{fontSize:'50px', color: '#917EBD', marginTop: '0px', position:'absolute',background: 'linear-gradient(91.54deg, #F5E5FF 0.5%, #F0E9FF 99.75%)', borderRadius: '25px', }}/>
                </Box>
            } */}
        </Box>
        {(selectedDate !== 'Not Selected' || instructorCourseView[0]?.course_type === 'Self-Paced') && <Box className='w-full md:w-3/5  m-auto'  >
			<Grid container spacing={2} className='ml-5'>
                <Grid item xs={6}>
                    {instructor.length !== 0 &&
                        <>
                        <Typography fontSize={"16px"} fontWeight="800" mt={"40px"} color='#917EBD' className=''>Instructor Details:</Typography>
                        <Typography fontSize={"18px"} fontWeight="600">{instructor[0]?.instructor_name}</Typography>
                        <Typography fontWeight="500" className='text-sm'>{instructor[0]?.instructor_description}</Typography>
                        </>
                    }
                </Grid>
                <Grid item xs={6} mt="10px">
                    <img style={{marginTop:'20px',borderRadius:'250px'}} className='w-40 h-40 lg:w-40 lg:h-40' src={instructor[0]?.instructor_image} />
                </Grid>
            </Grid>
            {sessionID !== null &&
          <>
          <Box className='p-5 ml-8 w-full' style={{background: 'linear-gradient(271.66deg, #F0E9FF -2.3%, #F5E5FF 100.92%)', height: '180px', borderRadius: '20px', textAlign: 'center', marginTop:'30px'}}>
            <Box paddingTop={"30px"} style={{color: '#505D68', fontSize: '14px'}} fontWeight="900"><Typography >Other details:</Typography></Box>
            <Typography>Zoom conferencing details will be sent to your registered mail upon confirmation.</Typography>
             <Button style={{background: '#917EBD', color: 'white', marginTop: '10px', paddingLeft: '30px', paddingRight: '30px'}} onClick = {handleProperConfirmTrial}>Confirm Trial</Button>
           </Box>
           </>}
        </Box>}
        </>
    );
};

export default BookingTrial;