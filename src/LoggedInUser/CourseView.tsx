import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import WorkspacePremiumSharpIcon from "@mui/icons-material/WorkspacePremiumSharp";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import VideogameAssetRoundedIcon from "@mui/icons-material/VideogameAssetRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BookIcon from "@mui/icons-material/Book";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Header from './Header'
import useMediaQuery from '@mui/material/useMediaQuery';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';

import { RootState } from "../redux/reducers";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../redux";
import { bindActionCreators } from "redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import PaidView from "./PaidView";
import TrialView from "./TrialView";


import API from "../redux/api/api";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

import './CourseView.css';
import MobileLoggedHeader from "./MobileLoggedHeader";

const CourseViewContent = () => {
  const redTheme = createTheme({
    palette: {
      primary: {
        main: "#917EBD",
      },
    },
  });

  const { id } = useParams<{ id: string }>();
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

  interface moduleViewer {
    module_id: number;
    enrollment_type: string;
    module_name: string;
    module_duration?: string | null;
    module_description: string;
    module_objective: string;
  }

  interface topicViewer {
    module_id: number;
    module_topic_id: number;
    topic_id: number;
    topic_name: string;
    topic_duration?: string | null;
    topic_type: string;
    module_objective: string;
    topic_path: string;
    topiccol: string;
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchtopicID, fetchModuleID, fetchEnrollmentID } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const course_id = useSelector((state: RootState) => state.courseIDFetch);
  const module_id = useSelector((state: RootState) => state.moduleIDFetch);
  const enrollment_id = useSelector((state: RootState) => state.EnrollmentIDFetch);
  const [leanerUser, setLearnerUser] = useState<any>(JSON.parse(localStorage.getItem('learner-details') || 'null'))
  const [courseView, setCourseView] = useState<any>([]);
  const [sessionView, setSessionView] = useState<any>([]);
  const [topics, setTopics] = useState<number[]>([]);
  console.log(sessionView);
  const [moduleView, setModuleView] = useState<moduleViewer[]>([]);
  console.log(moduleView);
  const [isEnterprise, setIsEnterprise] = useState<boolean>(false);
  const [learner, setLearner] = useState<any>(
    JSON.parse(localStorage.getItem("learner-details") || "null")
  );

  useEffect(() => {

    API.get("getTrackedCourse/" + enrollment_id)
    .then((res) => {
      fetchtopicID(res.data[0]?.course_topic)
      fetchModuleID(res.data[0]?.course_module)
    })
    .catch((err) => {
      console.log(err);
    });
    
    API.post("getEnrolledCourseView", {
      studentId: learner?.student_id,
      courseId: course_id,
    })
      .then((response) => {
        setCourseView(response.data);
        fetchEnrollmentID(response.data[0]?.enrollment_id);
            if (response?.data?.session_id !== null) {
              API.post("getenrolledsessiondetails", { courseId: course_id, studentId: leanerUser?.student_id})
                .then((res) => {
                 setSessionView(res.data);
             })
                .catch((err) => {
                 console.log(err);
              });
        }
      })
      .catch((err) => {
        console.log(err);
      });

      API.get<number[]>('getProgressModuleTopic/'+module_id)
  .then((res)=>{
    setTopics(res.data)
  }).catch((err) => {
    console.log(err)
  })

    API.get("getmoduleforcourse/" + course_id)
      .then((res) => {
        setModuleView(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [course_id, id, module_id]);

  const handelBeginNow = () => {
    API.get("getTrackedCourse/" + enrollment_id)
    .then((res) => {
      fetchtopicID(res.data[0]?.course_topic)
      fetchModuleID(res.data[0]?.course_module)
      //navigate('/course-content')
      console.log(enrollment_id)
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const percentage =
    courseView.length === 0 ? 0 : courseView[0]?.course_progress;
    
    console.log(sessionView[0]?.session_zoomurl);

  const joinEventClicked = () =>{
    window.open(
      sessionView[0]?.session_zoomurl,
      '_blank' // <- This is what makes it open in a new window.
    );
  }

  const isMobile = useMediaQuery('(max-width:900px)');

  return (
    <Box className="dark:bg-slate-900">
    {isMobile && <MobileLoggedHeader/>}
    {!isMobile && <Header/>}
    <Box>
      <Box className="m-5 md:m-20">
      {isMobile && 
      <div>
                  {courseView?.map((dataItem: any, index: any) => (
            <Box >
              <Box mb={"10px"}>
                <Typography variant="h4" fontWeight={600} className='text-xl text-center dark:text-white'>
                  {dataItem.course_name}
                </Typography>
              </Box>
            </Box>
          ))}
      </div>
      }
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={12} md={3}>
            <div className={`${isEnterprise ? 'bg-contrastAccent-200' : 'bg-accent-200'} rounded-md shadow-xl p-3 `}>
                <img src={courseView[0]?.course_image} className="rounded-md w-full" alt="" />
            </div>  
        </Grid>
        <Grid item xs={8} md={6} borderRight="1px dashed #917EBD" className="border-0 lg:border-r md:border-fuchsia-500 md:pr-20" >
          {courseView?.map((dataItem: any, index: any) => (
            <Box >
              {!isMobile && <Box mb={"10px"}>
                <Typography variant="h4" fontWeight={600} className='dark:text-white'>
                  {dataItem.course_name}
                </Typography>
              </Box>}
              <Typography className='dark:text-white ml-2 mt-6 md:mt-2 text-sm md:text-lg'>{dataItem.course_description}</Typography>
              {!isMobile && <><Box sx={{ marginTop: "100px", textAlign: 'center', color: '#917EBD',  }}>
               {dataItem?.course_progress === 0 ?  <Typography className="text-sm">Begin your course</Typography> : dataItem?.course_progress === 100 ? <Typography>Course is Completed, You can still rewatch the Content</Typography> : <Typography>Continue you course from where you left off</Typography> }
              </Box>
            <ThemeProvider theme={redTheme}>
                <Box sx={{textAlign: 'center' }}> 
               {dataItem?.course_progress === 0 ?
                    <Button variant="contained" sx={{ marginTop: "10px", borderRadius: '15px' }} onClick = {handelBeginNow}>
                      Begin now
                    </Button>
                 
                  :
                  dataItem?.course_progress === 100 ?
                  <Button variant="contained" sx={{ marginTop: "10px" }} onClick = {handelBeginNow}>
                  Rewatch
                </Button>

                :
                    <Button variant="contained" sx={{ mt:"10px" }} onClick = {handelBeginNow}>
                      Continue
                    </Button>}
                </Box>
              </ThemeProvider></>}
            </Box>
          ))}
        </Grid>
        {courseView[0]?.enrollment_type === 'paid' && <Grid item xs={3} md={3} className='justify-center scale-75 md:scale-100 mr-2 md:mr-0' mt="">
        <Grid >
            <Box className='text-center mb-2'><Typography  fontWeight={700} fontSize="14px" style={{color: '#917EBD'}}>Progress</Typography></Box>
            <Box style={{justifyContent: 'center'}}>
              <div id="outer-circle" style={{marginTop: '20px', textAlign:'center', margin:'auto'}}>
                <div id="inner-circle">
                  <Typography sx={{mt:'20px', fontSize:'35px',color: '#917EBD'}}>{percentage}<span style={{fontSize:'30px'}}>%</span></Typography>
                </div>
              </div>
            </Box>
            <Box style={{justifyContent: 'center', marginTop: '30px'}}>
              <div id="outer-circle1" style={{marginTop: '20px', textAlign:'center', margin:'auto'}}>
                <div id="inner-circle1">
                  <CalendarTodayOutlinedIcon sx={{mt:'15px', mb:'10px', fontSize:'45px',color: '#917EBD'}}/>
                </div>
              </div>
              <Typography style={{textAlign:'center', color:'#917EBD', marginTop:'10px'}}>Key Events</Typography>
            </Box>
            <Grid item xs={6}>
              <Box marginTop={"30px"}>
                <Grid
                  container
                  rowSpacing={1}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                >
                  {/* <Grid item xs={2}>
                    <ScheduleIcon
                      style={{
                        color: "#917EBD",
                        backgroundColor: "#F9EDF5",
                        marginBottom: "10px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography>06 Weeks</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <CoPresentIcon
                      style={{ color: "#917EBD", backgroundColor: "#F9EDF5" }}
                    />
                  </Grid>
                  <Grid item xs={10}>
                    <Typography>06 Classes</Typography>
                  </Grid> */}
                </Grid>
              </Box>
            </Grid>
          </Grid>
          {/* <Box
            width={"80%"}
            sx={{ background: "#F9EDF5", borderRadius: "5px", padding: "15px" }}
          >
            <Typography fontSize="16px">Course Completion Benefits:</Typography>
            <Box marginTop={"10px"}>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={1}>
                  <WorkspacePremiumSharpIcon
                    fontSize="large"
                    style={{ color: "#917EBD" }}
                  />
                </Grid>
                <Grid item xs={11}>
                  <Box>
                    <Typography marginTop={"5px"} fontSize="18px">
                      Course completion certificate
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box> */}
        </Grid>}
      </Grid>
      </Box>
      {courseView?.map((dataItem:any) =>{
        return <div>
          {isMobile && <><Box sx={{ textAlign: 'center', color: '#917EBD',  }}>
               {dataItem?.course_progress === 0 ?  <Typography className="text-sm">Begin your course</Typography> : dataItem?.course_progress === 100 ? <Typography>Course is Completed, You can still rewatch the Content</Typography> : <Typography>Continue you course from where you left off</Typography> }
              </Box>
            <ThemeProvider theme={redTheme}>
                <Box sx={{textAlign: 'center' }}> 
               {dataItem?.course_progress === 0 ?
                    <Button variant="contained" sx={{ marginTop: "10px", borderRadius: '15px', fontSize:'12px' }} onClick = {handelBeginNow}>
                      Begin now
                    </Button>
                 
                  :
                  dataItem?.course_progress === 100 ?
                  <Button variant="contained" sx={{ marginTop: "10px", fontSize:'12px' }} onClick = {handelBeginNow}>
                  Rewatch
                </Button>

                :
                    <Button variant="contained" sx={{ mt:"10px", fontSize:'12px' }} onClick = {handelBeginNow}>
                      Continue
                    </Button>}
                </Box>
              </ThemeProvider></>}
        </div>
      })}
      {courseView[0]?.enrollment_type === "paid" ? (
        <PaidView moduleViewPaid={moduleView} topicArray = {topics}/>
      ) : (
        <TrialView moduleViewTrial={moduleView} enrollmentID = {courseView[0]?.enrollment_id} />
      )}
       {sessionView?.map((dataItem : any, index : any) =>
    <>
      {/* <Box width={"95%"} margin="auto">
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          width="80%"
          margin="auto"
          padding="30px"
        >
          <Grid item xs={6}>
            <Box sx={{ marginBottom: "20px" }}>
              <Typography variant="h4" fontWeight={600}>
                Calendar
              </Typography>
            </Box>
            <Typography>Upcoming events:</Typography>
            <Typography>Instructor led session details:</Typography>
           <Box
              sx={{
                background: "#917EBD",
                width: "80%",
                borderRadius: "12px",
                padding: "15px",
                color: "white",
              }}
            >
              <Typography>Session Details:</Typography>
              <Grid
                container
                rowSpacing={3}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={1}>
                  <Box>
                    <CalendarMonthIcon fontSize="large" />
                  </Box>
                </Grid>
                <Grid item xs={5}>
                  <Box>
                    <Typography marginTop={"5px"} fontSize="18px">
                      {moment(dataItem?.session_datetime).format("MMM Do")}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={1}>
                  <Box sx={{ marginRight: "30px" }}>
                    <ScheduleIcon fontSize="large" />
                  </Box>
                </Grid>
                <Grid item xs={5}>
                  <Box>
                    <Typography marginTop={"5px"} fontSize="18px">
                    {new Date(dataItem?.session_datetime).toLocaleString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric'
                    })}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <ThemeProvider theme={redTheme}>
              <Box
                sx={{
                  padding: "20px",
                  textAlign: "center",
                  marginLeft: "-80px",
                }}
              >
                <Button variant="contained" onClick={joinEventClicked}>Join Event</Button>
              </Box>
            </ThemeProvider>

          </Grid>
          {/* <Grid item xs={6}>
            <Typography marginTop={"5px"} fontSize="18px" fontWeight={600}>
              Events
            </Typography>
            <Box margin={"20px"}>
              <Calendar
                defaultValue={[new Date(2022, 3, 1), new Date(2022, 3, 8)]}
              />
            </Box>
          </Grid> */}
        
      </>
            )}
    </Box>
    </Box>
  );
};

export default CourseViewContent;
