import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import GradBlobBlueTR from '../components/atom/GradBlobBlueTR';
import GradBlobResp from '../components/atom/GradBlobResp';
import GradBlobRespBlue from '../components/atom/GradBlobRespBlue';
import GradBlobTRSm from '../components/atom/GradBlobTRSm';
import { Banner, StatsCard, Curriculum, CustTimeline } from '../components/sections/course';
import CourseCTA from '../components/sections/course/CourseCTA';
import {Stack, Grid} from '@mui/material';
import Instructor from '../components/sections/course/Instructor';
import { getCourse, getInstructor } from '../util/api';
import { isNull } from '../util/helpers';
import RegisterInterestModal from '../components/organisms/RegisterInterestModal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Transition from '../components/atom/Transition';
import useMediaQuery from '@mui/material/useMediaQuery';

//reduc imports for globalstae of courseID
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import axios from 'axios'

import API from '../redux/api/api'
import { Button, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../redux';
import StarIcon from '@mui/icons-material/Star';
import '../styles/general.css'


const CourseViewHome = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id)

  const redTheme = createTheme({ palette: { primary:{
    main:  '#917EBD'}
  } });

  const [course, setCourse] = useState<any>(undefined);
  const [fail, setFail] = useState<string | undefined>(undefined);
  const [instructor, setInstructor] = useState<any>(undefined);
  const [isEnterprise, setIsEnterprise] = useState<boolean>(false);
  const[checkbooked, setCheckedBooked] = useState(null);
  const emails = ['username@gmail.com', 'user02@gmail.com'];
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const [bookTrialMessage, setBookTrialMessage] = useState<any>('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const [courseView, setCourseView] = useState<courseViewer[]>([]);
  const [courseAgeView, setCourseAgeView] = useState<any[]>([]);
  const [courseTypeView, setCourseTypeView] = useState<any[]>([]);
  const [courseGeneralView, setCourseGeneralView] = useState<courseViewer[]>([]);
  const [moduleView, setModuleView] = useState<moduleViewer[]>([]);
  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-details') || 'null'))
  const [bool, setBool] = useState<any>(false)
  const [courseAge, setCourseAge] = useState<any>('')
  const [courseType, setcourseType] = useState<any>('')

  const dispatch = useDispatch();
  const { fetchUsers, fetchCourseID, fetchEnrollmentID} = bindActionCreators(actionCreators, dispatch)

  const [leanerUser, setLearnerUser] = useState<any>(JSON.parse(localStorage.getItem('learner-details') || 'null'))
  const [registerIntrest, setRegisterIntrest] = useState<any>('')
  const [interestError, setInterestError] = useState<any>('')
  const [finalCost, setFinalCost] = useState<any>(''||1);
  const [region, setRegion] = useState("");
  console.log(finalCost)
  const isMobile = useMediaQuery('(max-width:1000px)');

  //redux course_id saved use this as state
  const course_id = useSelector((state: RootState) => state.courseIDFetch)
   console.log(course_id)

  interface courseViewer {
    course_id: number;
    course_title: string;
    course_name: string;
    course_age: string;
    course_type: string;
    course_credit: string;
    course_cost:string;
    course_description: string;
    course_learningobjective: string;
    course_image: string;
    course_numberofclasses: number;
    course_duration: number;
    course_status: string | null;
    course_indiancost:any;
}

  interface moduleViewer {
    module_id: number;
    module_name: string;
    module_duration ?: string | null;
    module_description: string;
    module_objective:string;
}

interface instrcutorViewer {
  instructor_course_id: number;
  instructor_id: number;
  course_id ?: number | null;
  instructor_name: string;
  instructor_email:string;
  instructor_timing : string | null;
  instructor_description : string | null;
}
console.log(courseView)
console.log(courseAgeView.map((a, v) => ({['age']: v, selected : false}), {}) )
  useEffect(() => {

    API.post('getCourseDetailsHome', {  course_title : id, course_age : courseAge, course_type : courseType})
    .then((res)=>{
      setCourseView(res.data)
      fetchCourseID(res?.data[0]?.course_id)
    }).catch((err) => {
      console.log(err)
    })

    // API.get<courseViewer[]>('getcourseview/'+id)
    // .then((res)=>{
    //   setCourseView(res.data)
    // }).catch((err) => {
    //   console.log(err)
    // })
    fetch('https://api.ipregistry.co/?key=vum97powo0pxshko')
    .then(function (response) {
      return response.json();
    })
    .then(function (payload) {
      console.log(payload.location.country.name);
      setRegion(payload.location.country.name)
      //setFinalCost(instructorCourseView[0]?.course_indiancost)
    });
    
    API.get<courseViewer[]>('getcoursegeneralview/'+id)
    .then((res)=>{
      setCourseGeneralView(res.data)
      setCourseAgeView(res.data[0]?.course_age?.split(','))
      // const age = res.data?.map((dataItem:any) => ({ ...dataItem, selected: false }))
      setCourseTypeView(res.data[0]?.course_type?.split(','))
    }).catch((err) => {
      console.log(err)
    })

    API.get<moduleViewer[]>('/getmoduleforcourse/'+course_id)
    .then((res)=>{
      setModuleView(res.data)
    }).catch((err) => {
      console.log(err)
    })

    API.post('verifyUserEnrollment', {courseId : course_id, studentId : leanerUser?.student_id})
    .then((res)=>{
      setCheckedBooked(res.data)
    }).catch((err) => {
      console.log(err)
    })

  }, [id, course_id,courseAge, courseType, region, setRegion])

  const [activeDot, setActiveDot] = useState<number>(0);

  const [openVideo, setOpenVideo] = React.useState(false);
  const handleOpenVideo = () => setOpenVideo(true);
  const handleCloseVideo = () => setOpenVideo(false);
  const [openInterest, setOpenInterest] = React.useState(false);
  const handleOpenInterest = () => setOpenInterest(true);
  const handleCloseInterest = () => setOpenInterest(false);
  const [instructors, setInstructors] = useState<instrcutorViewer[]>([]);

  const navigate = useNavigate()

  const handelBookCourse = () => {
    if(user === null){
      navigate('/login')
    }else{
      navigate('/bookingcourse')
    }
  }

  const validateEmail = (email: string) =>{
    
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

  const handelRegisterIntrest =() => {
    console.log(String(registerIntrest).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
    if(registerIntrest.trim() === ''){
    setInterestError('Please Enter your Email to Proceed')
    }else if (validateEmail(registerIntrest) === false){
      setInterestError('Please Enter a Proper Email Address')
    }else{
      API.post('registerIntrest', {course_name : courseView[0]?.course_name, course_type: courseView[0]?.course_type, course_age : courseView[0]?.course_age, user_email: registerIntrest, course_id : courseView[0]?.course_id})
      .then((res)=>{
        setOpen(false)
        setRegisterIntrest('')
        console.log(res.data)
      }).catch((err) => {
        console.log(err)
      })
    }
  }

console.log(courseAgeView)
  const handelBookTrial = () => {
    if(user === null){
      navigate('/login')
    }else{
      if(instructors.length > 1){
        handleClickOpen()
      }else{
        if(courseView[0]?.course_type === 'Self-Paced'){      
      API.post('enrollLearner', {courseId : course_id, studentId : leanerUser?.student_id, studentFeeStatus : null, sessionId : null, enrollmentType : 'trial'})
      .then((res)=>{
      setBookTrialMessage(res.data)
      navigate('/loggedcourseview')
    }).catch((err) => {
      console.log(err)
    })
        }else{
          setOpen(false);
          // fetchInstructorID(instructors[0]?.instructor_id)
          navigate('/booktrial')
        }
      }
    }
  }

  return (
    <>
     
    {/* {
      !isEnterprise ? (<>
        <div className="hidden md:block overflow-y-hidden h-full">
      <GradBlobTRSm />
    </div>
    <div className="md:hidden block"><GradBlobResp /></div>
      </>) : (<>
          <div className="md:hidden block"><GradBlobRespBlue /></div>
          <div className="hidden md:block"><GradBlobBlueTR /></div>
      </>)
    } */}
    <div className = 'mt-20 ml-28 course_main'>
    
<div className="z-20 relative flex flex-wrap md:flex-row">
<div className="lg:w-1/2 md:2/3 mt-10 md:mt-0 md:pr-10 main_course">
    <h1 className="font-black text-3xl text-center md:text-left">{courseGeneralView[0]?.course_title}</h1>
    <p className="md:text-lg mt-4 pb-10">{courseGeneralView[0]?.course_description}</p>
    {isMobile &&<div className={`${isEnterprise ? 'bg-contrastAccent-200' : 'bg-accent-200'} rounded-md shadow-xl p-3 w-full relative`}>
        <img src={courseGeneralView[0]?.course_image} className="rounded-md w-full" alt="" />
    </div>}
    {
        !isEnterprise && (<>
            <h1 className="font-black md:text-xl mt-6">Learning Objectives</h1>
            <p className="md:text-lg mt-4">{courseGeneralView[0]?.course_learningobjective}</p>
        </>)
    }
    <div className = 'my-10 ' style ={{color : '#735AAC'}}>
    <h1 className='text_options'>Select your child's age: </h1>
    <div className = 'flex flex-wrap  pt-5 main_option'>

      {courseAgeView?.map((dataItem, index) => 
      <>
        <div onClick={() => {
          if(courseAge === dataItem){
            setCourseAge('All')
          }else{
            setCourseAge(dataItem)
          }
          
        }} className = ''> {courseAge === dataItem ? <div className = 'option_button'  style ={{cursor: 'pointer' ,backgroundColor : '#DFD1E7', padding : '8px 50px',borderRadius : '30px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)', marginRight:'30px', marginBottom : '10px'}}>{dataItem}</div>: <div className = 'option_button' style ={{cursor: 'pointer' ,backgroundColor : '#F9EDF5', padding : '8px 50px',borderRadius : '30px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)', marginRight:'30px', marginBottom : '10px'}}>{dataItem}</div>}</div>
      </>
      )}
    </div>
    </div>

    <div className = 'my-10 ' style ={{color : '#735AAC'}}>
    <h1 className='text_options'>Choose Your learning preference: </h1>
    <div className = 'flex flex-wrap pt-5 mr-5 main_option' style ={{width : '68%'}}>

      {courseTypeView?.map((dataItem, index) => 
      
      <>
      <div onClick={() => {
        if(courseType === dataItem){
          setcourseType('All')
        }else{
          setcourseType(dataItem)
        }
        
        
        }} className = ''  > {courseType === dataItem ? <div  className = 'option_button' style ={{cursor: 'pointer' ,backgroundColor : '#DFD1E7', padding : '8px 35px',borderRadius : '30px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)', marginRight:' 35px', marginBottom : '10px'}}>{dataItem}</div>: <div className = 'option_button'  style ={{cursor: 'pointer' ,backgroundColor : '#F9EDF5', padding : '8px 35px',borderRadius : '30px', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)', marginRight:'30px', marginBottom : '10px'}}>{dataItem}</div>}</div>
      </>
      )}
    </div>
    </div>


    <RegisterInterestModal isEnterprise={false} courseId={id} openInterest={openInterest} handleCloseInterest={handleCloseInterest} />
    {/* <div className="flex gap-4">
        <Button
        onClick={handleOpenInterest}
        className={`mt-12 px-7 md:px-14 py-2 text-white ${isEnterprise ? 'bg-contrast-400' : 'bg-color-400'} font-bold rounded-md`}>Register Your Interest</Button>
      </div> */}
</div>
<div className="md:w-1/2 2xl:w-1/2 flex items-center justify-center flex-col main_course">
    {!isMobile &&<div className={`${isEnterprise ? 'bg-contrastAccent-200' : 'bg-accent-200'} rounded-md shadow-xl p-3 w-2/3 relative`}>
        <img src={courseGeneralView[0]?.course_image} className="rounded-md w-full" alt="" />
    </div>}
{ courseView.length !== 0 &&
    <div>
      {checkbooked === false ? <ThemeProvider theme={redTheme}>
        {!isMobile &&<>
      {courseView[0]?.course_status === 'WAITLISTED' && <Button onClick = {handleClickOpen} variant='contained' style={{margin:"50px 10px 0 50px"}}>
      <Typography fontWeight={"600"} fontSize="14px" px={"30px"} py={"3px"}>
      Register your interest
      </Typography>
      </Button>}
      {courseView[0]?.course_status === 'ACTIVE' && <>   <Button onClick = {handelBookCourse} className='mt-12 mx-5 rounded-md md:rounded-md shadow-xl font-bold py-3 px-10 md:w-auto md:px-10 lg:px-10 h-9 text-white bg-color-400 '>
  Book Course
</Button>
<Button onClick = {handelBookTrial} className='mt-12 mx-5 rounded-md md:rounded-md shadow-xl font-bold py-3 px-10 md:w-auto md:px-10 lg:px-10 h-9 text-white bg-color-400 '>
Book Trial
</Button>
</>}
    </>}
</ThemeProvider>: 
<Box mt={5}>
<Typography variant='h6' fontWeight={800}>You have already purchased this course.</Typography>
<ThemeProvider theme={redTheme}>
<Button variant='contained' style={{marginTop:"20px"}} onClick = {() => navigate('/loggedcourseview')}>
<Typography fontWeight={"600"} fontSize="14px" px={"30px"} py={"3px"}>Go to course</Typography>
</Button>
</ThemeProvider>
</Box>
} 
</div>}

</div>        
</div> 
    </div>
        {courseView.length !== 0 &&
        <>
          <div className={courseView[0]?.course_credit === 'TRUE' ? "mx-auto  w-8/8 mt-12 " : "mx-auto w-10/12 mt-12 sizing_course_details"}>
          <div>
        <div className="main_course_details relative z-30 mt-32 mb-20 py-16 md:py-5 bg-accent-200 w-full h-auto md:h-40 rounded-xl shadow-2xl flex flex-wrap md:flex-nowrap items-center justify-center gap-6">            
            {
              <React.Fragment>
                  <div className="w-40 text-center mt-2">
                    <p className="text-gray-700 sm:text-xs">Number of Classes</p>
                    <div className={`font-black ${courseView[0]?.course_type.includes('Self-Paced') ? 'text-2xl' : 'text-5xl'} text-center text-color-400`}>
                      <span className='text-color-400 text-3xl'></span>
                          {courseView[0]?.course_type === 'Self-Paced' ? <span className='text-color-400 sm:text-m lg:text-2xl'>Self Paced</span> : <span className='text-color-400 text-5xl'>{courseView[0]?.course_numberofclasses}</span> }</div>
                      <p className="text-gray-700" style={{opacity: 0}}>""</p>
                  </div>
                  <div style={{ height: '0.5px' }} className="w-2/3 bg-slate-300 sm:hidden block"></div>
                  <div style={{ width: '0.5px' }} className="h-2/3 bg-slate-400 hidden md:block"></div>

                  <div className="w-40 text-center mt-2">
                    <p className="text-gray-700 sm:text-xs">Duration</p>
                      <div className={`font-black`}>
                          <span className='text-color-400 text-3xl'></span>
                          <span className='text-color-400 text-5xl'>{courseView[0]?.course_duration/60}</span></div>
                      <p className="text-gray-700 sm:text-xs ">Min Per Class</p>
                  </div>
                  <div style={{ height: '0.5px' }} className="w-2/3 bg-slate-300 sm:hidden block"></div>
    {  courseView[0]?.course_type !== 'Self-Paced' &&
    <>
     <div style={{ width: '0.5px' }} className="h-2/3 bg-slate-400 hidden md:block"></div>

                  <div className="w-40 text-center mt-2">
                    <p className="text-gray-700 sm:text-xs">Live-class ratio</p>
                      <div className={`font-black`}>
                          <span className='text-color-400 text-3xl'></span>
                          {courseView[0]?.course_type === 'Self-Paced' ? <span className='text-color-400 text-5xl pb-2'>-</span> : <span className='text-color-400 text-5xl pb-2'>1:6</span>}
                          </div>
                      <p className="text-gray-700" style={{opacity: 0}}>""</p>
                  </div>
                  <div style={{ height: '0.5px' }} className="w-2/3 bg-slate-300 sm:hidden block"></div>
                  </>
                  }
                  <div style={{ width: '0.5px' }} className="h-2/3 bg-slate-400 hidden md:block"></div>

                  <div className="w-40 text-center mt-2">
                    <p className="text-gray-700 sm:text-xs">Age</p>
                      <div className={`font-black`} >
                          <span className='text-color-400 text-5xl heading_text_course_details'>{courseView[0]?.course_age}</span></div>
                      <p className="text-gray-700 sm:text-xs">Years</p>
                  </div>
                  {courseView[0]?.course_status === 'ACTIVE'  && 
                  <>
                  <div style={{ height: '0.5px' }} className="w-2/3 bg-slate-300 sm:hidden block"></div>
                  <div style={{ width: '0.5px' }} className="h-2/3 bg-slate-400 hidden md:block"></div>

                  <div className="w-40 text-center mt-2">
                    <p className="text-gray-700 sm:text-xs">Cost</p>
                      <div className={`font-black ${courseView[0]?.course_cost.includes('Self-Paced') ? 'text-2xl' : 'text-5xl'} text-center text-color-400`}>
                      {region === 'India' ? 
                          <div>
                          <span className='text-color-400 text-3xl'>&#8377;</span>
                          <span className='text-color-400 text-5xl'>{courseView[0]?.course_indiancost}</span>
                          </div>
                          :
                          <div>
                          <span className='text-color-400 text-3xl'>$</span>
                          <span className='text-color-400 text-5xl'>{courseView[0]?.course_cost}</span>
                          </div>
                        }
                        </div>
                      <p className="text-gray-700 sm:text-xs">per Class</p>
      
                  </div></>}

                 {courseView[0]?.course_credit === "TRUE" &&
                 <>
                 <div style={{ width: '0.5px' }} className="h-2/3 bg-slate-400 hidden md:block"></div>
                  <div className="w-40 text-center mt-2">
                    <p className="text-gray-700 sm:text-xs">Earn Credits</p>
                    <div className={`font-black ${courseView[0]?.course_cost.includes('Self-Paced') ? 'text-2xl' : 'text-5xl'} text-center text-color-400`}>
                          <span><StarIcon className = 'text-5xl'/></span>
                        </div>
                      <p className="text-gray-700 sm:text-xs">On Completion</p>
                  </div>
                  </>
                  }
              </React.Fragment>
            }
        </div>  
        </div>
       
        {isMobile ? <div className='md:pl-10 md:pr-10'>
          {
            moduleView.map((item: any, itemIdx: number) => {
              let title = moduleView[itemIdx].module_name;
              let desc = moduleView[itemIdx].module_description;
              return <div>
                {itemIdx%2 === 0 ? <div style={{margin:'20px', paddingBottom:'30px'}}>
                  <div>
                        <p style = {{color : '#917EBD'}} className={`font-semibold `}>
                          {title}
                        </p>
                      </div>
                    <Grid container spacing={2} >
                      <Grid item xs={3}>
                        <div className = 'p-4 flex justify-center flex-col text-center text-white' style={{background:'#917EBD', borderRadius:'10px'}}>
                          <h1 className='text-md text-white'>Week</h1>
                          <h1 >0{itemIdx+1}</h1>
                        </div>
                      </Grid>
                      <Grid item xs={9}>
                        <div style = {{backgroundColor : '#DFD1E7'}} className=" rounded-b-xl rounded-3xl shadow-2xl ">
                          <Transition index={moduleView[activeDot]?.module_id}>
                              <div className="h1 text-center font-bold text-lg text-slate-700 pt-3">{item?.module_name}</div>
                              <div className="text-center px-1  mt-3 pb-3 text-sm text-slate-700">{item?.module_description}</div>
                          </Transition> 
                        </div>
                      </Grid>
                    </Grid>
                </div> : <div style={{margin:'20px', paddingBottom:'30px'}}>
                <div>
                        <p style = {{color : '#917EBD'}} className={`font-semibold text-right`}>
                          {title}
                        </p>
                      </div>
                    <Grid container spacing={2}>
                      <Grid item xs={9}>
                        <div style = {{backgroundColor : '#DFD1E7'}} className=" rounded-b-xl rounded-3xl shadow-2xl">
                          <Transition index={moduleView[activeDot]?.module_id}>
                              <div className="h1 text-center font-bold text-lg text-slate-700 pt-3">{item?.module_name}</div>
                              <div className="text-center px-1  md:px-16 mt-3 pb-3 text-sm text-slate-700">{item?.module_description}</div>
                          </Transition> 
                        </div>
                      </Grid>
                      <Grid item xs={3}>
                        <div className = 'p-4 flex justify-center flex-col text-center text-white' style={{background:'#917EBD', borderRadius:'10px'}}>
                          <h1 className=''>Week</h1>
                          <h1 >0{itemIdx+1}</h1>
                        </div>
                      </Grid>
                    </Grid>
                  </div>}
                </div>
            })
          }
          </div>
         :<div className='pb-1 relative mb-20 md:mb-40'>
    <h1 className="text-4xl font-black text-center mt-32">Learning Journey</h1>
    <div className="  rounded-t-xl md:rounded-xl mt-20">
      <div style={{minWidth:'750px'}} className="relative timeline py-5  w-full h-80 md:pb-16 flex justify-center items-center">         
      {
        !isNull(moduleView) ? (<>
          {
            moduleView.map((item: any, itemIdx: number) => {
              let title = moduleView[itemIdx].module_name;
              let desc = moduleView[itemIdx].module_description;
              let myDir = ["down", "-translate-y-10", "-top-8"];
              if (itemIdx % 2 == 0) myDir = ["up", "translate-y-10", "-top-28"];
              let showLine = "transition-all hidden";
              if (itemIdx === activeDot) showLine = "transition-all ";
              return (<React.Fragment key={itemIdx}>
                <div onClick={() => setActiveDot(itemIdx)}
                style = {{borderRadius : '20px', backgroundColor : '#917EBD'}}
                  className={`timelinePoint h-20 w-20 bg-color-400 ${myDir[1]} cursor-pointer relative`}
                  >
                      <div>
                        <p style = {{color : '#917EBD', marginTop: '-70px'}} className={`absolute z-50 px-2 left-10 -translate-x-1/2  ${myDir[2]} font-semibold `}>
                          {title}
                        </p>
                      </div>
                    <div className = 'p-4 flex justify-center flex-col text-white text-lg'>
         
                    <h1 className='z-1000 flex justify-center'>Week</h1>
                    <h1 className='z-1000 flex justify-center'>0{itemIdx+1}</h1>
                    </div>
        
                  {/* <div style={{transform: 'translateX(-6px) rotate(90deg)'}} className={`w-32 ${showLine} timeline-line top-24 -left-12 absolute`}></div> */}
                </div>
                <div className={`w-20 timeline-line line-${myDir[0]}`}></div>
              </React.Fragment>);              
            })
          }                                        
        </>) : (<>
          <div className="h-5 w-5 bg-color-400 rounded-full"></div>               
        </>)
      }     
      </div>
    </div>      
    <div style = {{backgroundColor : '#DFD1E7'}} className="relative md:absolute top-full -translate-y-12 left-1/2 -translate-x-1/2  rounded-b-xl md:rounded-3xl shadow-2xl md:w-10/12 py-5">
        <Transition index={moduleView[activeDot]?.module_id}>
            <div className="h1 text-center font-bold text-2xl text-slate-700">{moduleView[activeDot]?.module_name}</div>
            <div className="text-center px-5 md:px-16 mt-3 pb-3 font-medium text-slate-700">{moduleView[activeDot]?.module_description}</div>
        </Transition>
      </div>
      </div>}
  </div>
        {/* changes here needed */}
        {checkbooked === false && <CourseCTA isEnterprise={isEnterprise} courseId={id} status={courseView[0]?.course_status}/>}
      </>}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle style ={{backgroundColor : '#DFD1E7', color : '#735AAC', fontWeight : '700'}}>Register Your Interest</DialogTitle>
        <DialogContent style ={{backgroundColor : '#DFD1E7'}}>
          <DialogContentText style ={{color : '#735AAC'}}>
          Register Your Interest in this course so we will send you an update on your Email as soon as the Course is
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            color="secondary"
            value = {registerIntrest}
            onChange = {(e) => setRegisterIntrest(e.target.value)}
          />
          <h4 style ={{color : '#B52F2F'}}>{interestError}</h4>
        </DialogContent>
        <DialogActions style ={{backgroundColor : '#DFD1E7', color : '#735AAC'}}>
          <Button style ={{color : '#735AAC', fontWeight : '700'}} onClick = {handelRegisterIntrest}>Register</Button>
        </DialogActions>
      </Dialog>
        </>
      );
}

export default CourseViewHome;
