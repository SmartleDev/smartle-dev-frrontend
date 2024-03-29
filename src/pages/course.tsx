import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import GradBlobBlueTR from '../components/atom/GradBlobBlueTR';
import GradBlobResp from '../components/atom/GradBlobResp';
import GradBlobRespBlue from '../components/atom/GradBlobRespBlue';
import GradBlobTRSm from '../components/atom/GradBlobTRSm';
import { Banner, StatsCard, Curriculum, CustTimeline } from '../components/sections/course';
import CourseCTA from '../components/sections/course/CourseCTA';
import Instructor from '../components/sections/course/Instructor';
import { getCourse, getInstructor } from '../util/api';
import { isNull } from '../util/helpers';
import RegisterInterestModal from '../components/organisms/RegisterInterestModal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import Transition from '../components/atom/Transition';

//reduc imports for globalstae of courseID
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import axios from 'axios'

import API from '../redux/api/api'
import { Button, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Course = () => {
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
   console.log(courseView)
  const [moduleView, setModuleView] = useState<moduleViewer[]>([]);
  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-details') || 'null'))
  const [leanerUser, setLearnerUser] = useState<any>(JSON.parse(localStorage.getItem('learner-details') || 'null'))
  //console.log(moduleView)

  //redux course_id saved use this as state
  const course_id = useSelector((state: RootState) => state.courseIDFetch)
   console.log(course_id)

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

  useEffect(() => {

    API.get<courseViewer[]>('getcourseview/'+id)
    .then((res)=>{
      setCourseView(res.data)
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

  }, [id, course_id])

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
      navigate('/bookcourse')
    }
  }

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
        <div className="mx-auto w-10/12 mt-12 ">
        <div className="z-20 relative flex flex-wrap flex-col-reverse md:flex-row">
            <div className="md:w-1/2 mt-10 md:mt-0 md:pr-10">
                <h1 className="font-black text-3xl text-center md:text-left">{courseView[0]?.course_name}</h1>
                <p className="md:text-lg mt-4">{courseView[0]?.course_description}</p>
               
                {
                    !isEnterprise && (<>
                        <h1 className="font-black md:text-xl mt-6">Learning Objectives</h1>
                        <p className="md:text-lg mt-4">{courseView[0]?.course_learningobjective}</p>
                    </>)
                }
                 {checkbooked === false ? <ThemeProvider theme={redTheme}>
                  {courseView[0]?.course_status === 'WAITLISTED' && <Button variant='contained' style={{marginTop:"50px"}}>
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
                <RegisterInterestModal isEnterprise={false} courseId={courseView[0]?.course_id} openInterest={openInterest} handleCloseInterest={handleCloseInterest} />
                {/* <div className="flex gap-4">
                    <Button
                        onClick={handleOpenInterest}
                        className={`mt-12 px-7 md:px-14 py-2 text-white ${isEnterprise ? 'bg-contrast-400' : 'bg-color-400'} font-bold rounded-md`}>Register Your Interest</Button>
                </div> */}
            </div>
            <div className="md:w-1/2 flex items-center justify-center" >
                <div className={`${isEnterprise ? 'bg-contrastAccent-200' : 'bg-accent-200'} rounded-md shadow-xl w-10/12 relative`}>
                    <img src={courseView[0]?.course_image} className="rounded-md w-full" alt="" />
                </div>
            </div>        
        </div>     
        <div>
        <div className="relative z-30 mt-32 mb-20 py-16 md:py-5 bg-accent-200 w-full h-auto md:h-40 rounded-xl shadow-2xl flex flex-wrap md:flex-nowrap items-center justify-center gap-6">            
            {
              <React.Fragment>
                  <div className="w-40 text-center mt-2">
                    <p className="text-gray-700">Number of Classes</p>
                    <div className={`font-black ${courseView[0]?.course_type.includes('Self-Paced') ? 'text-2xl' : 'text-5xl'} text-center text-color-400`}>
                          <span className='text-color-400 text-3xl'></span>
                          {courseView[0]?.course_type === 'Self-Paced' ? <span className='text-color-400 text-2xl'>Self Paced</span> : <span className='text-color-400 text-5xl'>{courseView[0]?.course_numberofclasses}</span> }</div>
                      <p className="text-gray-700" style={{opacity: 0}}>""</p>
                  </div>
                  <div style={{ height: '0.5px' }} className="w-2/3 bg-slate-300 sm:hidden block"></div>
                  <div style={{ width: '0.5px' }} className="h-2/3 bg-slate-400 hidden md:block"></div>

                  <div className="w-40 text-center mt-2">
                    <p className="text-gray-700">Duration</p>
                      <div className={`font-black`}>
                          <span className='text-color-400 text-3xl'></span>
                          <span className='text-color-400 text-5xl'>{courseView[0]?.course_duration/60}</span></div>
                      <p className="text-gray-700">Min Per Class</p>
                  </div>
                  <div style={{ height: '0.5px' }} className="w-2/3 bg-slate-300 sm:hidden block"></div>
                  <div style={{ width: '0.5px' }} className="h-2/3 bg-slate-400 hidden md:block"></div>

                  <div className="w-40 text-center mt-2">
                    <p className="text-gray-700 ">Live-class ratio</p>
                      <div className={`font-black`}>
                          <span className='text-color-400 text-3xl'></span>
                          {courseView[0]?.course_type === 'Self-Paced' ? <span className='text-color-400 text-5xl pb-2'>-</span> : <span className='text-color-400 text-5xl pb-2'>1:6</span>}
                          </div>
                      <p className="text-gray-700" style={{opacity: 0}}>""</p>
                  </div>
                  <div style={{ height: '0.5px' }} className="w-2/3 bg-slate-300 sm:hidden block"></div>
                  <div style={{ width: '0.5px' }} className="h-2/3 bg-slate-400 hidden md:block"></div>

                  <div className="w-40 text-center mt-2">
                    <p className="text-gray-700">Age</p>
                      <div className={`font-black`}>
                          <span className='text-color-400 text-3xl'></span>
                          <span className='text-color-400 text-5xl'>{courseView[0]?.course_age}</span></div>
                      <p className="text-gray-700">Years</p>
                  </div>
                  <div style={{ height: '0.5px' }} className="w-2/3 bg-slate-300 sm:hidden block"></div>
                  <div style={{ width: '0.5px' }} className="h-2/3 bg-slate-400 hidden md:block"></div>

                  <div className="w-40 text-center mt-2">
                    <p className="text-gray-700">Cost</p>
                    <div className={`font-black ${courseView[0]?.course_cost.includes('Self-Paced') ? 'text-2xl' : 'text-5xl'} text-center text-color-400`}>
                          <span className='text-color-400 text-3xl'>$</span>
                          <span className='text-color-400 text-5xl'>{courseView[0]?.course_cost}</span></div>
                      <p className="text-gray-700">per Class</p>
                  </div>
              </React.Fragment>
            }
        </div>  
        </div>

        <div className='pb-1 relative mb-20 md:mb-40'>
    <h1 className="text-4xl font-black text-center mt-32">Learning Journey</h1>
    <div className="md:shadow-2xl overflow-x-scroll md:overflow-x-auto overflow-y-hidden  rounded-t-xl md:rounded-xl mt-16">
      <div style={{minWidth:'750px'}} className="relative timeline py-5 bg-accent-200 w-full h-60 md:pb-16 rounded-t-xl md:rounded-3xl shadow-2xl flex justify-center items-center">         
    <div className={`w-20 timeline-line line-up`}></div>
      {
        !isNull(moduleView) ? (<>
          {
              moduleView.map((item: any, itemIdx: number) => {
              let title = moduleView[itemIdx].module_name;
              let desc = moduleView[itemIdx].module_description;
              let myDir = ["up", "translate-y-10", "-top-28"];
              if (itemIdx % 2 == 0) myDir = ["down", "-translate-y-10", "-top-8"];
              let showLine = "transition-all hidden";
              if (itemIdx === activeDot) showLine = "transition-all ";
              return (<React.Fragment key={itemIdx}>
                <div onClick={() => setActiveDot(itemIdx)}
                  className={`timelinePoint h-5 w-5 bg-color-400 rounded-full ${myDir[1]} cursor-pointer relative`}
                >
                  <div className={`absolute ${showLine} truncate z-50 px-2 left-3 -translate-x-1/2 ${myDir[2]} font-semibold text-slate-700`}>
                      {title}
                  </div>
                  <div style={{transform: 'translateX(-6px) rotate(90deg)'}} className={`w-32 ${showLine} timeline-line top-24 -left-12 absolute`}></div>
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
    <div className="relative md:absolute top-full -translate-y-12 left-1/2 -translate-x-1/2 bg-color-200 rounded-b-xl md:rounded-3xl shadow-2xl md:w-10/12 py-5">
        <Transition index={moduleView[activeDot]?.module_id}>
            <div className="h1 text-center font-bold text-2xl text-slate-700">{moduleView[activeDot]?.module_name}</div>
            <div className="text-center px-5 md:px-16 mt-3 pb-3 font-medium text-slate-700">{moduleView[activeDot]?.module_description}</div>
        </Transition>
      </div>
      
  </div>
        </div>
        {/* changes here needed */}
        {checkbooked === false && <CourseCTA isEnterprise={isEnterprise} courseId={id} status={courseView[0]?.course_status}/>}
        </>
      );
}

export default Course;
