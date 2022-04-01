import React, {useState, useEffect} from 'react';
import { Box, Grid, Typography } from '@mui/material';
import WorkspacePremiumSharpIcon from '@mui/icons-material/WorkspacePremiumSharp';
import { Accordion, AccordionDetails, Button} from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import VideogameAssetRoundedIcon from '@mui/icons-material/VideogameAssetRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BookIcon from '@mui/icons-material/Book';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { RootState } from '../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import API from "../redux/api/api";
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    CircularProgressbar,
    CircularProgressbarWithChildren,
    buildStyles
  } from "react-circular-progressbar";

const CourseViewContent = () => {

    const redTheme = createTheme({ palette: { primary:{
        main:  '#917EBD'}
      } });
      
    const { id } = useParams<{ id: string }>();
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
    
    
      const course_id = useSelector((state: RootState) => state.courseIDFetch)
      console.log(course_id)

      const [courseView, setCourseView] = useState<courseViewer[]>([]);
      console.log(courseView)
     const [moduleView, setModuleView] = useState<moduleViewer[]>([]);
     console.log(moduleView)

    useEffect(() => {

        API.get<courseViewer[]>('getcourseview/'+course_id)
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
    
      }, [course_id, id])


    const topics = [
        {
            topicId : 1,
            icon : <PersonRoundedIcon/>,
            text: "Week 1: Lorem Ipsum",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
        },
        {
            topicId : 2,
            icon : <ArticleRoundedIcon/>,
            text: "Week 2: Lorem Ipsum",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
        },
        {
            topicId : 3,
            icon : <PersonRoundedIcon/>,
            text: "Week 3: Lorem Ipsum",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
        },
        {
            topicId : 4,
            icon : <VideogameAssetRoundedIcon/>,
            text: "Week 4: Lorem Ipsum",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
        },
    ]

    const moduleTopics =[
        {
            icon : <PersonRoundedIcon/>,
            text: "Self Paced: Learning Video-1",
            tickIcon: <CheckCircleIcon style={{color: 'green', opacity: '0.2'}}/>
        },
        {
            icon : <VideogameAssetRoundedIcon/>,
            text: "Simulation: Fun game",
            tickIcon: <CheckCircleIcon style={{color: 'green', opacity: '0.2'}}/>
        },
    ]

    const percentage = 66;

    return (
        <Box>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6} borderRight="1px dashed #917EBD">
                 {courseView.map((dataItem, index) =>
                 <Box m={'60px'}>
                 <Box mb={"10px"}><Typography variant='h4' fontWeight={600}>{dataItem.course_name}</Typography></Box>
                 <Typography>{dataItem.course_description}</Typography>
                 <Box sx={{marginTop:'20px'}}><Typography>Begin you course</Typography></Box>
                 <ThemeProvider theme={redTheme}><Box><Button variant='contained' sx={{marginTop:'10px'}}>Begin now</Button></Box></ThemeProvider>
             </Box>
                 )}
                </Grid>
                <Grid item xs={6}>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                        <Box m={'30px'}>
                            <Typography fontWeight={700}>Course Progress</Typography>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={6}>
                                    <Box marginTop='20px' marginBottom={'20px'}>
                                        <CircularProgressbar
                                            value={percentage}
                                            text={`${percentage}%`}
                                            background
                                            backgroundPadding={6}
                                            styles={buildStyles({
                                            backgroundColor: '#917EBD',
                                            textColor: "#fff",
                                            pathColor: "#fff",
                                            trailColor: "transparent"
                                            })}
                                        />
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                </Grid>
                            </Grid>
                        </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <Box marginTop={'30px'} >
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    <Grid item xs={2}>
                                        <BookIcon style={{color:'#917EBD', backgroundColor:'#F9EDF5', marginBottom: '10px'}}/>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography>06 Modules</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <ScheduleIcon style={{color:'#917EBD', backgroundColor:'#F9EDF5', marginBottom: '10px'}}/>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography>06 Weeks</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <CoPresentIcon style={{color:'#917EBD', backgroundColor:'#F9EDF5'}}/>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Typography>06 Classes</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box width={'80%'} sx={{background:"#F9EDF5", borderRadius: '5px', padding: '15px'}} >
                        <Typography fontSize="16px">Course Completion Benefits:</Typography>
                        <Box marginTop={"10px"}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={1}>
                                <WorkspacePremiumSharpIcon fontSize='large' style={{color: '#917EBD'}}/>
                                </Grid>
                                <Grid item xs={11}>
                                    <Box>
                                        <Typography marginTop={"5px"} fontSize="18px">Course completion certificate</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Box width={"90%"} margin="auto" borderTop={'1px dashed #917EBD'} sx={{marginTop:'20px'}}>
                <Typography variant='h5' fontWeight={600} marginTop="20px">Modules</Typography>
                <Box>
                    {topics.map((topic: any, topicId:number) =>{
                        if (!topic.topicId) return(<React.Fragment key={topicId}></React.Fragment>);
                        return (
                            <Accordion key={topicId} >
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{mt: '10px', background: '#F9EDF5'}} className='activity-title' 
                                >
                                <Typography sx={{ml: '5px'}}>{topic.text}</Typography>
                                </AccordionSummary>
                                <AccordionDetails sx={{border: '1px solid #917EBD', borderRadius: '3px'}}>
                                <Typography>
                                    Activities
                                </Typography>
                                <Box>
                                    {moduleTopics.map((topic: any, topicId:number) =>{
                                         return (
                                            <Grid 
                                                container rowSpacing={1} 
                                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                                                sx={{borderBottom:'1px dashed #917EBD', padding: '20px'}}
                                               >
                                                <Grid item xs={1}>
                                                    <Box sx={{textAlign:'right'}}>{topic.icon}</Box>
                                                </Grid>
                                                <Grid item xs={10}>
                                                    <Typography>{topic.text}</Typography>
                                                </Grid>
                                                <Grid item xs={1} >
                                                    <Box>{topic.tickIcon}</Box>
                                                </Grid>
                                            </Grid>
                                         )
                                        })
                                    }
                                </Box>
                                </AccordionDetails>
                            </Accordion>
                        )
                        })
                    }
                </Box>
            </Box>
            <Box width={'95%'} margin='auto'>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} width="80%" margin="auto" padding="30px">
                    <Grid item xs={6}>
                        <Box sx={{marginBottom: '20px'}}><Typography variant='h4' fontWeight={600}>Calendar</Typography></Box>
                        <Typography>Upcoming events:</Typography>
                        <Typography>Instructor led session details:</Typography>
                        <Box sx={{background: '#917EBD', width: '80%', borderRadius: '12px', padding: '15px', color: 'white'}}>
                            <Typography>Session Details:</Typography>
                            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                            <Grid item xs={1}>
                                <Box>
                                    <CalendarMonthIcon fontSize='large'/>
                                </Box>
                            </Grid>
                            <Grid item xs={5}>
                                <Box>
                                    <Typography marginTop={"5px"} fontSize="18px">11,Jan</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={1}>
                                <Box sx={{marginRight: '30px'}}>
                                    <ScheduleIcon fontSize='large' />
                                </Box>
                            </Grid>
                            <Grid item xs={5}>
                                <Box>
                                    <Typography marginTop={"5px"} fontSize="18px">6:00 pm IST</Typography>
                                </Box>
                            </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{background: '#F9EDF5', width: '80%', borderRadius: '12px', padding: '15px', color: '#917EBD', marginTop: '20px'}}>
                            <Typography>Session Details:</Typography>
                            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                            <Grid item xs={1}>
                                <Box>
                                    <CalendarMonthIcon fontSize='large'/>
                                </Box>
                            </Grid>
                            <Grid item xs={5}>
                                <Box>
                                    <Typography marginTop={"5px"} fontSize="18px">11,Jan</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={1}>
                                <Box sx={{marginRight: '30px'}}>
                                    <ScheduleIcon fontSize='large' />
                                </Box>
                            </Grid>
                            <Grid item xs={5}>
                                <Box>
                                    <Typography marginTop={"5px"} fontSize="18px">6:00 pm IST</Typography>
                                </Box>
                            </Grid>
                            </Grid>
                        </Box>
                        <ThemeProvider theme={redTheme}><Box sx={{padding: '20px', textAlign: 'center', marginLeft: '-80px'}}><Button variant='contained'>Join Event</Button></Box></ThemeProvider>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <Typography marginTop={"5px"} fontSize="18px">Januray 2022</Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default CourseViewContent;