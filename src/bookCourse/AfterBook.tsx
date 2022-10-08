import React, {useEffect, useState} from 'react'
import {Grid, Box, Typography, CardContent, CardActions, Button, Alert} from '@mui/material';

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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';


function AfterBook() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {fetchInstructorID, fetchEnrollmentID} = bindActionCreators(actionCreators, dispatch)
	const [sessionID, setSessionID] = useState<any>(localStorage.getItem('sessionId')); //global state
	const [course_id, setcourse_id] = useState<any>(localStorage.getItem('courseId')); //global state
	const [enrollment_id, setenrollment_id] = useState<any>(localStorage.getItem('enrollmentId')); //global state

    // const enrollment_id = useSelector((state: RootState) => state.EnrollmentIDFetch)
	const token = JSON.parse(localStorage.getItem('user-details') || '{}');
	const details:any = jwt_decode(token.token);
	const [leanerUser, setLearnerUser] = useState<any>(JSON.parse(localStorage.getItem('learner-details') || 'null'))
	// const course_id = useSelector((state: RootState) => state.courseIDFetch)
	const [couponData, setCouponData] = useState<any>(""); //global state
	const [open, setOpen] = React.useState(true);

	console.log(course_id + " course_id")
	console.log(enrollment_id + " enrollment ID")

    useEffect(() => {
        if(enrollment_id !== null){
			API.post("convertTrialToBuyCourse", {enrollmentId : enrollment_id})
		  .then((res) => {
			console.log(res.data)
			API.post('enrollCourseEmailService', {emailTo: details?.email,studentName: leanerUser?.student_name , courseId: course_id} )
			.then(res => {
				API.post("CourseInvoice", {emailTo: details?.email})
				.then((res) => {
					console.log(res.data)
				})
				.catch((err) => {
				  console.log(err);
				});
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
			
			
			setOpen(true);
			localStorage.removeItem('sessionId')
			navigate('/')
			window.addEventListener("popstate", () => {
				navigate(1);
			});
		  })
		  .catch((err) => {
			console.log(err);
		  });
		}else{
			if(sessionID === null || undefined){
				API.post('enrollLearner', {courseId : course_id, studentId : leanerUser?.student_id, studentFeeStatus : true, sessionId : null, enrollmentType : 'paid'})
				.then((res) => {
					console.log(res.data)
					API.post('enrollCourseEmailService', {emailTo: details?.email,studentName: leanerUser?.student_name , courseId: course_id} )
					.then(res => {
						API.post("CourseInvoice", {emailTo: details?.email})
						.then((res) => {
							console.log(res.data)
						})
						.catch((err) => {
						  console.log(err);
						});
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
					localStorage.removeItem('sessionId')
					navigate('/')
					window.addEventListener("popstate", () => {
						navigate(1);
					});
					fetchEnrollmentID(0)
					localStorage.removeItem('enrollmentId')
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
						API.post("CourseInvoice", {emailTo: details?.email})
						.then((res) => {
							console.log(res.data)
						})
						.catch((err) => {
						  console.log(err);
						});
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
					setOpen(true);
					localStorage.removeItem('sessionId')
					navigate('/')
					window.addEventListener("popstate", () => {
						navigate(1);
					});
					fetchEnrollmentID(0)
					localStorage.removeItem('enrollment_id')
				  })
				  .catch((err) => {
					console.log(err);
				  });	
			}
			setOpen(true);
			localStorage.removeItem('sessionId')
			navigate('/')
		}	

    },[])

  
	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
	  if (reason === 'clickaway') {
		return;
	  }
  
	  setOpen(false);
	};
  return (
    <>
	     <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Cogratulations on Buying the Course
        </Alert>
      </Snackbar>
	</>
  )
}

export default AfterBook