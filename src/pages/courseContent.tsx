import React, {useState, useEffect} from 'react';
import {Box, Slide, AppBar, CssBaseline, Toolbar, Typography, Grid,Stack, Divider,Button,Accordion, Drawer, AccordionDetails } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import GradBlobCourseContent from '../components/atom/GradBlobCourseContent';
import MobileHeader from '../components/organisms/MobileHeader';
import FrameDiv from '../components/sections/coursecontent/frameDiv';
import CourseContentDrawer from '../components/sections/coursecontent/CourseContentDrawer';
import MobileFooter from '../components/organisms/MobileFooter';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import "../styles/coursecontent.scss";
import API from "../redux/api/api";
import SyncLoader from "react-spinners/SyncLoader";
import LoadingButton from '@mui/lab/LoadingButton';
import { css } from "@emotion/react";
import {useParams} from 'react-router-dom'
import { bindActionCreators } from 'redux';
import useMediaQuery from '@mui/material/useMediaQuery'
import { actionCreators } from '../redux';
import { RootState } from '../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { Link , useNavigate} from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import VideogameAssetRoundedIcon from '@mui/icons-material/VideogameAssetRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import GroupsIcon from '@mui/icons-material/Groups';
import PausePresentationIcon from '@mui/icons-material/PausePresentation';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import PaidView from '../LoggedInUser/PaidView'
import TrialView from '../LoggedInUser/TrialView'


interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

interface moduleViewer {
  module_id: number;
  module_name: string;
  module_duration ?: string | null;
  module_description: string;
  module_objective:string;
}

interface topicViewer {
  module_id: number;
  module_topic_id : number;
  topic_id : number;
  topic_name: string;
  topic_duration ?: string | null;
  topic_type: string;
  module_objective:string;
  topic_path : string;
  topiccol:string
}

interface singleTopicViewer {
  topic_id : number;
  topic_name: string;
  topic_duration ?: string | null;
  topic_type: string;
  topic_path : string;
}



function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const CourseContent = () => {
  const module_id = useSelector((state: RootState) => state.moduleIDFetch)
  const enrollment_id = useSelector((state: RootState) => state.EnrollmentIDFetch)
  const topic_id = useSelector((state: RootState) => state.TopicIDFetch);
  const course_id = useSelector((state: RootState) => state.courseIDFetch);
  const [moduleView, setModuleView] = useState<moduleViewer[]>([]);
  const [moduleContent, setModuleContent] = useState<moduleViewer[]>([]);
  const [topicView, setTopicView] = useState<topicViewer[]>([]);
  const [singleTopicContent, setSingleTopicContent] = useState<singleTopicViewer[]>([]);
  console.log(singleTopicContent)
  console.log(moduleView)
  const [modules, setModules] = useState<number[]>([]);
  const [topics, setTopics] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(loading);


  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { fetchtopicID, fetchModuleID} = bindActionCreators(actionCreators, dispatch)
  
  
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [myCourses, setMyCourse] = useState<any>([]);
  console.log(myCourses);
  const [learner, setLearner] = useState<any>(JSON.parse(localStorage.getItem('learner-details') || 'null'))

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

    console.log(modules);
    console.log(topics);

// console.log(moduleView)
// console.log(topicView);
// console.log(singleTopicContent);

const [marginLoader, setMarginLoader] = useState("200px");
const [currTopic, setCurrTopic] = useState<number>(0);
const [currModule, setCurrModule] = useState<number>(0);
const [topicPath, setTopicPath] = useState("");
const [buttonName, setButtonName] = useState("Next");

console.log(topicPath);

const hideSpinner = () => {
  setLoading(false);
  setMarginLoader("0px");
};

const [indexTopic, setIndexTopic] = useState(0);
const [indexModule, setIndexModule] = useState(0);
console.log(indexTopic);
console.log(indexModule);

useEffect(() => {

  API.get<number[]>('getProgressCourseModule/'+course_id)
  .then((res)=>{
    setModules(res.data)
  }).catch((err) => {
    console.log(err)
  })

  API.get<number[]>('getProgressModuleTopic/'+module_id)
  .then((res)=>{
    setTopics(res.data)
    if(topics){
      API.get<singleTopicViewer[]>('getTopicContent/'+topic_id)
      .then((response)=>{
        setSingleTopicContent(response.data)
        // setTopicPath(res.data[0].topic_path);
      }).catch((err) => {
        console.log(err)
      })
    }
  }).catch((err) => {
    console.log(err)
  })
},[topic_id, module_id, indexTopic, indexModule])

  useEffect(() => {

    API.post("getEnrolledCourseView", { studentId: learner?.student_id,courseId: course_id,})
    .then((res) => {
      setMyCourse(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

    API.get("getmoduleforcourse/" + course_id)
    .then((res) => {
      setModuleContent(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

    API.get<moduleViewer[]>('getModuleView/'+module_id)
    .then((res)=>{
      setModuleView(res.data)
    }).catch((err) => {
      console.log(err)
    })

    API.get<topicViewer[]>('gettopicformodule/'+module_id)
    .then((res)=>{
      setTopicView(res.data)
    }).catch((err) => {
      console.log(err)
    })

  }, [topic_id, course_id, module_id])

  const isMobile:any = useMediaQuery('(max-width:500px)');
  const drawerWidth:number = 340;
  let [color, setColor] = useState("#917EBD");

  const [showNext, setShowNext] = useState(true);
  const [showPrev, setShowPrev] = useState(true);
  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

  const handlePrevious = () =>{
    console.log(topics.length)
  }

  const handleNext = () => {

  let index = indexTopic+1  
  setIndexModule(modules?.indexOf(module_id)); 
  setIndexTopic(topics?.indexOf(topic_id))
  console.log(module_id)
  console.log(topic_id)
    if(index < topics.length){
      // setIndexTopic(indexTopic+1);
      fetchtopicID(topics[index]);
      setButtonName("Next")
      console.log(topics[indexTopic])

      API.post('updateTopicStatus', {courseTopic : topics[index], enrollmentId : enrollment_id})
      .then((res)=>{
          console.log(res.data)
      }).catch((err) => {
        console.log(err)
      })

    }else{
      let indexM = indexModule+1
      if(indexM < modules.length){
        setButtonName("NextModule")
        setIndexTopic(0);
        setIndexModule(indexM);
        fetchModuleID(modules[indexM]);

        let index = indexTopic 
        fetchtopicID(topics[index]);
        console.log(topics[indexTopic])
  
        API.post('updateTopicStatus', {courseTopic : topics[index], enrollmentId : enrollment_id})
        .then((res)=>{
            console.log(res.data)
        }).catch((err) => {
          console.log(err)
        })

        API.post('updateModuleStatus', {courseModule : modules[indexM], enrollmentId : enrollment_id})
        .then((res)=>{
            console.log(res.data)
        }).catch((err) => {
          console.log(err)
        })

        API.post('updateTopicStatus', {courseTopic : topics[0], enrollmentId : enrollment_id})
        .then((res)=>{
            console.log(res.data)
        }).catch((err) => {
          console.log(err)
        })
        
        API.post('updateModuleCompeletedStatus', {enrollmentId : enrollment_id})
        .then((res)=>{
            console.log(res.data)
        }).catch((err) => {
          console.log(err)
        })

      }else{
        setShowNext(false);
      }
    }
    // console.log(indexTopic);
    // console.log(indexModule);
  
    // if(indexModule === modules.length && indexTopic === topics.length){
    //   setShowNext(false);
    // }
   
  }


  return (
    <>
    <Box sx={{ display: 'flex' }} style={{padding: "0px"}}>
      <CssBaseline />
      <HideOnScroll >
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, 
        display: { xs:"none", sm:"nome", md: "none", lg: "block" },}} className="title-div">
        <Toolbar>
       {moduleView?.map((dataItem : any, index : any) => 
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
       <Typography sx={{mt: '5px'}}>Course title: {myCourses[0]?.course_name}</Typography>
     </Grid>
     <Grid item xs={4}>
       <Typography variant='h6' sx={{ fontWeight: '900' }}>{dataItem.module_name}</Typography>
     </Grid>
     <Grid item xs={8} alignContent="end">
       <Typography variant='h6' align='right' sx={{ fontWeight: '900' }}>Week: 01</Typography>
     </Grid>
       </Grid>
    </Box>
       )}
        </Toolbar>
        </AppBar>
        </HideOnScroll>
        <Drawer
        variant="permanent"
        PaperProps={{
            sx: {
              backgroundColor: "#F9EDF5",
            }
          }}
        sx={{
            display: { xs:"none", sm:"nome",md: "none", lg: "block" },
          width: drawerWidth,
          backgroundColor: "pink",
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <ArrowBackIcon onClick={() => navigate(-1)}/>
        <Toolbar />
        <Box sx={{ overflow: 'auto', mt: '70px'}}>
        {myCourses[0]?.enrollment_type === "paid" ? (
        <PaidView moduleViewPaid={moduleContent}/>
      ) : (
        <TrialView moduleViewTrial={moduleContent} enrollmentID = {myCourses[0]?.enrollment_id} />
      )}
          {/* {moduleContent?.map((dataItem, index) => 
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          sx={{mt: '10px'}} className='activity-title' 
        >
          <Typography sx={{ flexShrink: 0 }}>
            {dataItem?.module_name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
          )} */}
            {/* {topicView?.map((dataItem: any, topicId:number) =>{
                // if (!topicView) return(<React.Fragment key={topicId}></React.Fragment>);
                return (
                    <Accordion key={topicId} onClick={() => {fetchtopicID(dataItem?.topic_id)}}>
                        <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{mt: '10px'}} className='activity-title' 
                        >
                            {dataItem.topic_type === 'Self paced' ? <ArticleRoundedIcon/> : dataItem.topic_type === 'Instructor Led' ? <GroupsIcon /> : dataItem.topic_type === 'Video' ? <PausePresentationIcon /> : dataItem.topic_type === 'Document'? <AttachFileIcon/> :dataItem.topic_type === 'Assignment' ? <AssignmentIndRoundedIcon/> : <ArticleRoundedIcon/>}
                        <Typography sx={{ml: '5px'}}>{dataItem.topic_name}</Typography>
                        </AccordionSummary>
                    </Accordion>
                )
                })
            } */}
        </Box>
        
      </Drawer>
        <Box component="main" sx={{ flexGrow: 1 }}>
            <GradBlobCourseContent/>
            <MobileHeader />
            <Box  margin="auto">
                <Typography sx={{mt: '60px', ml:5}}>Learning Video - 1</Typography>
                <Box sx={{}}>
                <Box textAlign={"center"} marginTop={marginLoader}><SyncLoader color={color} loading={loading} css={override} size={15} /></Box>
            {singleTopicContent?.map((dataItem:any, index: number) => 
                <iframe src={dataItem?.topic_path}
                  loading="lazy"
                  onLoad={hideSpinner}
                  title="W3Schools Free Online Web Tutorials"     
                  style={{justifyContent:'center', width:"70vw", height: "90vh"}}
                  className="content-resize">
                </iframe> 
            )}
            
            {!isMobile ?(<>
              <Box paddingLeft={"100px"} paddingRight={"100px"}>
                <Button 
                    onClick={handlePrevious}
                    className='sm:mt-12 md:mt-12 lg:mt-5 xl:mt-0 rounded-md md:rounded-md shadow-xl font-bold py-3 px-5 md:w-auto md:px-10 lg:px-10 h-9 text-white bg-color-400 '>
                        Previous
                       
                </Button>
                {showNext && <Button 
                    onClick={handleNext}
                    className='sm:mt-12 md:mt-12 lg:mt-5 xl:mt-0 rounded-md md:rounded-md shadow-xl font-bold py-3 px-10 md:w-auto md:px-14 lg:px-14 h-9 text-white bg-color-400' style={{float:"right"}}>
                    {buttonName}
                </Button>}
        </Box></>) :(
                <>
                <Box sx={{mt: '70px'}} className='module-overview' 
                component={Stack} 
                direction="column" 
                justifyContent="center">
                <Typography variant='h6'>Module Overview</Typography>
                </Box>
                <Typography paragraph sx={{pl: '10px', pr: '10px', mt: '10px', ml: "30px"}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. l aenean urna,
                </Typography>
                <Box width={"80%"} margin="auto"><Divider /></Box>
                <Box sx={{ flexGrow: 1, mt:'10px', ml:'20px',mr:'20px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                        <Typography variant='h6'>Activities</Typography>
                        </Grid>
                        <Grid item xs={6} textAlign="right">
                            <Typography variant='h6'>1/5</Typography>
                        </Grid>
                    </Grid>
                </Box>
     
            </> ) }
        </Box>
                </Box>
            </Box>
    </Box>
    <MobileFooter />
    </>
  );
}

export default CourseContent;
