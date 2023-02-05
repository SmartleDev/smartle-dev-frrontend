import React, {useEffect, useState} from 'react'
import {Grid, Box, Typography, CardContent, CardActions, Button, Stack} from '@mui/material';

import { actionCreators } from '../redux';
import { RootState } from '../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams  } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import moment from "moment";
import API from "../redux/api/api";
import jwt_decode from "jwt-decode";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const BookingCourse = () => {

	interface courseViewer {
		course_id: any;
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
		course_id: any;
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
		instructor_image: string | null;
		course_indiancost : string | any;
	}

	const [pay, setPay] = useState(0);
	const [discountedPrice, setDiscountedPrice] = useState(0);
	
	const[previousCost,setPreviousCost] = useState(0);

	console.log(previousCost)
	console.log(discountedPrice)
	console.log(pay);
	const [searchParams] = useSearchParams();
	const { id } = useParams<{ id: any }>();

	const [instructors, setInstructors] = useState();
	const [instructor, setInstructor] = useState<any>([]);
	const [sessionID, setSessionID] = useState<any>(null);
	const [selectedDate, setSelectedDate] = useState('Not Selected');
	const [selectedTime, setSelectedTime] = useState('Not Selected');
	const course_id: any = id
	const enrollment_id: any =  searchParams.get('enrollmentId');
	console.log(enrollment_id, "-----------------------")
	const [sessionDetails, setSessionDetails] = useState<sessionViewer[]>();
	const [instructorCourseView, setInstructorCourseView] = useState<courseInstructorViewer[]>([]);
	const [leanerUser, setLearnerUser] = useState<any>(JSON.parse(localStorage.getItem('learner-details') || 'null'))
	const token = JSON.parse(localStorage.getItem('user-details') || '{}');
	const details:any = jwt_decode(token.token);

	const [couponCode, setCouponCode] = useState("");
	const [region, setRegion] = useState("");
	const [discount, setDiscount] = useState<any>(instructorCourseView[0]?.course_cost);
	const [finalCost, setFinalCost] = useState<any>(''||1);

	const [couponData, setCouponData] = useState<any>("");
console.log(couponData)
    const [arrowState, setArrowState] = useState(true);

	const [couponMsg, setCouponMsg] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	const {fetchEnrollmentID } = bindActionCreators(
		actionCreators,
		dispatch
	  );


	const handleChange = (event: any) =>{
		setCouponCode(event.target.value);
	}
		
	useEffect(() => {

		if(enrollment_id == undefined){
		localStorage.removeItem('enrollment_id');
		}
		
		API.post('getsessionview', {courseId : course_id})
		.then((res)=>{
			const val = res.data?.map((dataItem:any) => ({ ...dataItem, selected: false }))
			setSessionDetails(val)
		}).catch((err) => {
			console.log(err)
		})

		API.get<courseInstructorViewer[]>('getcourseview/'+course_id)
		.then((res)=>{
		setInstructorCourseView(res.data)
		fetch('https://api.ipregistry.co/?key=pm3hsjigbozt9shn')
		.then(function (response) {
			return response.json();
		})
		.then(function (payload) {
			setRegion(payload.location.country.name)
		});
		if(region === 'India'){
			if(instructorCourseView[0]?.course_type === 'Hybrid'){
				setPay(res.data[0]?.course_indiancost * instructorCourseView[0]?.course_numberofclasses);
			}else{
				setPay(res.data[0]?.course_indiancost);
			}
		}else{
			setPay(res.data[0]?.course_cost)
			setFinalCost(res.data[0]?.course_cost)
		}
		}).catch((err) => {
		console.log(err)
		})

	}, [sessionID,course_id, region])
	
	const handelBuyCourse = () => {
		
		API.post('create-checkout-session', {course_name: instructorCourseView[0]?.course_name, course_amount: pay, course_img: instructorCourseView[0]?.course_image, course_description : instructorCourseView[0]?.course_description, course_id, student_id: leanerUser?.student_id, parent_id: token?.username, voucher_name: couponCode})
			.then(res => {
			  console.log(res.data)
			  if(parseInt(enrollment_id) !== 0){
				localStorage.setItem('enrollmentId', enrollment_id)
			  }
			  if(res.data.url){
				localStorage.setItem('courseId', course_id)
				localStorage.setItem('sessionId', sessionID)
				window.location.href = res.data?.url
			  }
			}).catch(err => {
			  console.log(err)
			})	
	}


	const handleCouponSubmit = (event: any) =>{
		event.preventDefault();
		console.log(couponCode)

		API.post('checkvoucher', {code: couponCode, course_id: course_id, parent_id: leanerUser.parent_id} )
		.then(res => {
			if(Array.isArray(res.data)){
				if(discount !== null){
					console.log("discount" , discount)
					console.log("res.data.resul" ,instructorCourseView[0]?.course_cost)
					if(region === 'India'){
						let k = instructorCourseView[0]?.course_indiancost - (res.data[0]?.voucher_discount*instructorCourseView[0]?.course_indiancost)/100;
						setFinalCost(k);
						// setPay(k)
						 console.log(k)
						// console.log(pay);
						setCouponMsg("Coupon Applied!")
						console.log(instructorCourseView[0]?.course_numberofclasses * (instructorCourseView[0]?.course_indiancost - k))
						if(instructorCourseView[0]?.course_type === 'Hybrid'){
							setPreviousCost(instructorCourseView[0]?.course_numberofclasses * (instructorCourseView[0]?.course_indiancost))
							setPay(instructorCourseView[0]?.course_numberofclasses *  k)
							setDiscountedPrice((instructorCourseView[0]?.course_numberofclasses *  instructorCourseView[0]?.course_indiancost )- (instructorCourseView[0]?.course_numberofclasses * k))
						}else{
							setPreviousCost((instructorCourseView[0]?.course_indiancost))
							setPay(k)
							setDiscountedPrice((instructorCourseView[0]?.course_indiancost - k))
						}
						
					}else{
						let k = instructorCourseView[0]?.course_cost - (res.data[0]?.voucher_discount*instructorCourseView[0]?.course_cost)/100;
						setFinalCost(k);
						setPay(k)
						 console.log(k)
						console.log(pay);	
						setCouponMsg("Coupon Applied!")
						if(instructorCourseView[0]?.course_type === 'Hybrid'){
							setPreviousCost(instructorCourseView[0]?.course_numberofclasses * (instructorCourseView[0]?.course_cost))
							setPay(instructorCourseView[0]?.course_numberofclasses *  k)
							setDiscountedPrice(instructorCourseView[0]?.course_numberofclasses * (instructorCourseView[0]?.course_cost - k))
						}else{
							setPreviousCost((instructorCourseView[0]?.course_indiancost))
							setPay(k)
							setDiscountedPrice((instructorCourseView[0]?.course_cost - k))
						}
						
					}
				}
			}else{
				if(region === 'India'){
					setCouponMsg("Coupon Invalid!");
					if(instructorCourseView[0]?.course_type === 'Hybrid'){
						setPay(instructorCourseView[0]?.course_numberofclasses * (instructorCourseView[0]?.course_indiancost))
						setDiscountedPrice(0)
					}else{
						setPay((instructorCourseView[0]?.course_indiancost))
						setDiscountedPrice(0)
					}
					
					// setPay(instructorCourseView[0]?.course_indiancost)
					// setFinalCost(instructorCourseView[0]?.course_indiancost);
				}else{
					setCouponMsg("Coupon Invalid!");
					if(instructorCourseView[0]?.course_type === 'Hybrid'){
						setPay(instructorCourseView[0]?.course_numberofclasses * (instructorCourseView[0]?.course_cost))
						setDiscountedPrice(0)
					}else{
						setPay((instructorCourseView[0]?.course_cost))
						setDiscountedPrice(instructorCourseView[0]?.course_cost)
					}
					
					// setPay(instructorCourseView[0]?.course_cost)
					// setFinalCost(instructorCourseView[0]?.course_cost);
				}
			}
			setCouponData(res.data);
		}).catch(err => {
		  console.log(err)
		})
	}

	const {fetchInstructorID} = bindActionCreators(actionCreators, dispatch)

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
        <Box className='pb-10'>
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
        </Box>
        {(selectedDate !== 'Not Selected' || instructorCourseView[0]?.course_type === 'Self-Paced') && <Box className='w-full md:w-3/5  m-auto' >
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
                    {instructorCourseView[0]?.course_type === 'Hybrid' && <img style={{marginTop:'20px',borderRadius:'250px'}} className='w-40 h-40 lg:w-52 lg:h-52' src={instructor[0]?.instructor_image} />}
                </Grid>
            </Grid>
            <Box className='m-5'>
                <Box 
                    style={{
                        background: 'linear-gradient(180deg, #F9EDF5 0%, #F9F6FF 100%', 
                        boxShadow: '0px 15px 40px #F9EDF5)',
                        borderRadius:'20px',
                        padding: '10px',
                        marginBottom: '10px',
                        marginTop: '40px'}}>
                    <Typography sx={{fontSize: '20px', fontWeight: '700', marginLeft: '35px',}}>Billing Detals</Typography></Box>
                <Box style={{border: '1px solid #917EBD', borderRadius: '20px', padding: '5px', marginBottom: '8px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={7} md={6}>
                            <Typography className='ml-5 md:ml-10 text-sm md:text-lg'>Course Name</Typography>
                        </Grid>
                        <Grid item xs={5} md={6}>
                            <Typography className=' text-sm md:text-lg'>{instructorCourseView !== undefined && instructorCourseView[0]?.course_name}</Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box style={{border: '1px solid #917EBD', borderRadius: '20px', padding: '5px', marginBottom: '8px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={7} md={6}>
                            <Typography className='ml-5 md:ml-10 text-sm md:text-lg'>Course Type</Typography>
                        </Grid>
                        <Grid item xs={5} md={6}>
                            <Typography className='text-sm md:text-lg'>{instructorCourseView !== undefined && instructorCourseView[0]?.course_type}</Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box style={{border: '1px solid #917EBD', borderRadius: '20px', padding: '5px', marginBottom: '8px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={7} md={6}>
                            <Typography className='ml-5 md:ml-10 text-sm md:text-lg'>Number of sessions:</Typography>
                        </Grid>
                        <Grid item xs={5} md={6} className='text-sm md:text-lg'>
                            {instructorCourseView[0]?.course_type === 'Hybrid' ? <Typography>{instructorCourseView !== undefined && instructorCourseView[0]?.course_numberofclasses}</Typography>: <Typography>-</Typography>}
                        </Grid>
                    </Grid>
                </Box>
                <Box style={{border: '1px solid #917EBD', borderRadius: '20px', padding: '5px', marginBottom: '8px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={7} md={6}>
                            <Typography className='ml-5 md:ml-10 text-sm md:text-lg'>Session Duration:</Typography>
                        </Grid>
                        <Grid item xs={5} md={6}>
                        {instructorCourseView[0]?.course_type === 'Hybrid' ? <Typography className='text-sm md:text-lg'>{instructorCourseView !== undefined && instructorCourseView[0]?.course_duration/60} minutes</Typography>: <Typography>-</Typography>}
                        </Grid>
                    </Grid>
                </Box>
                <Box style={{border: '1px solid #917EBD', borderRadius: '20px', padding: '5px', marginBottom: '8px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={7} md={6}>
                            {instructorCourseView[0]?.course_type === 'Hybrid' ? <Typography className='ml-5 md:ml-10 text-sm md:text-lg'>Cost per session:</Typography> : <Typography ml={5} className='text-sm md:text-lg'>Cost per course:</Typography>}
                        </Grid>
                        <Grid item xs={5} md={6}>
                            {instructorCourseView !== undefined && region === 'India' ? <span className='text-sm md:text-lg'>&#x20B9; {instructorCourseView[0]?.course_indiancost} </span> : <span className='text-sm md:text-lg'>$ {instructorCourseView[0]?.course_cost} </span> }
                        </Grid>
                    </Grid>
                </Box>
                {instructorCourseView[0]?.course_type === 'Hybrid' ? <Box style={{border: '1px solid #917EBD', borderRadius: '20px', padding: '5px', marginBottom: '8px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={7} md={6}>
                            <Typography className='ml-5 md:ml-10  text-sm md:text-lg'>Start Date</Typography>
                        </Grid>
                        <Grid item xs={5} md={6}>
                            <Typography className='text-sm md:text-lg'>{selectedDate}</Typography>
                        </Grid>
                    </Grid>
                </Box>: null}
                {instructorCourseView[0]?.course_type === 'Hybrid' ? <Box style={{border: '1px solid #917EBD', borderRadius: '20px', padding: '5px', marginBottom: '8px'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography className='ml-5 md:ml-10 text-sm md:text-lg'>Start Time</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography className='text-sm md:text-lg'>{selectedTime}</Typography>
                        </Grid>
                    </Grid>
                </Box>: null}
            </Box>
				{couponMsg === 'Coupon Applied!' && 
					<Box style={{textAlign: 'center', fontSize: '14px', fontWeight: '800', marginTop: '20px'}}>
						<Typography style={{fontSize: '14px', fontWeight: '800'}}>Previous Cost:{region === 'India' ? <span>&#x20B9;</span> : <span>$</span>} {previousCost}</Typography>
						<Typography style={{fontSize: '14px', fontWeight: '800'}}>Discounted Amount: {region === 'India' ? <span>&#x20B9;</span> : <span>$</span>}{discountedPrice}</Typography>
					</Box>
				}
			<Typography style={{textAlign: 'center', marginRight: '10px', marginTop: '10px', color: '#917EBD'}} variant='h5' fontWeight={800}>Total Cost : {region === 'India' ? <span>&#x20B9;</span> : <span>$</span>}{pay}</Typography>
            		<Grid container spacing={2} style={{margin:'10px 0px 10px 0px'}}>
						<Grid item sm={12} md={6} margin="auto">
							{sessionID !== null && instructorCourseView[0]?.course_type === 'Hybrid' &&<Box>
								<Typography fontWeight={500}>Apply Coupon</Typography>
								<Box>
									<form onSubmit={(e) => handleCouponSubmit(e)}>
										<input style={{height: '32px', padding: '5px', background: '#F9EDF5',border: '1px solid #917EBD', borderRadius: '10px', marginRight: '10px'}} name="coupon" onChange={handleChange}/>
										<Button type="submit" style={{background: '#917EBD', color: 'white',paddingLeft: '20px', paddingRight: '20px', fontSize:'12px', fontWeight:'900', borderRadius:'10px'}}>Apply</Button>
									</form>
								</Box>
								</Box>
							}
                            {instructorCourseView[0]?.course_type === 'Self-Paced' &&<Box>
								<Typography fontWeight={500}>Apply Coupon</Typography>
								<Box>
									<form onSubmit={(e) => handleCouponSubmit(e)}>
										<input style={{height: '32px', padding: '5px', background: '#F9EDF5',border: '1px solid #917EBD', borderRadius: '10px', marginRight: '10px'}} name="coupon" onChange={handleChange}/>
										<Button type="submit" style={{background: '#917EBD', color: 'white',paddingLeft: '20px', paddingRight: '20px', fontSize:'12px', fontWeight:'900', borderRadius:'10px'}}>Apply</Button>
									</form>
								</Box>
								</Box>
							}
						</Grid>
						<Grid item sm={12} md={6} margin="auto">
							{sessionID !== null &&<Button style={{background: '#917EBD', color: 'white', marginTop: '20px', paddingLeft: '70px', paddingRight: '70px', float: 'right', fontWeight:'900', borderRadius:'10px'}} onClick = {handelBuyCourse}>Pay Now</Button>}
							{instructorCourseView[0]?.course_type === 'Self-Paced' &&<Button style={{background: '#917EBD', color: 'white', marginTop: '20px', paddingLeft: '70px', paddingRight: '70px', float: 'right', fontWeight:'900',  borderRadius:'10px'}} onClick = {handelBuyCourse}>Pay Now</Button>}
						</Grid>
					</Grid>
                    {couponMsg ? <h1 style = {{width: '80%', margin: 'auto', textAlign: 'center',marginTop : '30px', color : '#917EBD', border: '1px solid #917EBD', borderRadius: '20px', padding: '2px', fontSize: '15px', fontWeight:'300'}}>{couponMsg}</h1> : null}
        </Box>}
        </Box>
    );
};

export default BookingCourse;