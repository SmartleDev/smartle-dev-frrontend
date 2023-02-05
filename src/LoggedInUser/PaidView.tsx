import React, {useState, useEffect, SyntheticEvent} from 'react';
import { Box, Grid, Typography, Button, Accordion, AccordionSummary, AccordionDetails, Modal } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import VideogameAssetRoundedIcon from '@mui/icons-material/VideogameAssetRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import GroupsIcon from '@mui/icons-material/Groups';
import PausePresentationIcon from '@mui/icons-material/PausePresentation';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import useMediaQuery from '@mui/material/useMediaQuery';
import { RootState } from '../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../redux';
import { bindActionCreators } from 'redux';
import { Link, useNavigate, useParams} from 'react-router-dom';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import LockIcon from '@mui/icons-material/Lock';
import { styled, ThemeProvider,createTheme } from '@mui/material/styles';
import ReactPlayer from 'react-player'

import API from "../redux/api/api";
import BookCourse from '../bookCourse/BookCourse';
import Vimeo from '@u-wave/react-vimeo';
// import Vimeo from 'react-vimeo';


export interface PaidModuleView {
	moduleViewPaid : {}[];
	topicArray : {}[];
	enrollmentID: number;
	courseView: any
  }


function PaidView(props: PaidModuleView) {

	const { moduleViewPaid, topicArray, enrollmentID, courseView } = props;

	interface topicViewer {
        module_id: number;
        module_topic_id : number;
		module_description: string;
        topic_id : number;
        topic_name: string;
        topic_duration ?: string | null;
        topic_type: string;
        module_objective:string;
        topic_path : string;
        topiccol:string
    }

	interface moduleViewer {
		module_id: number;
		enrollment_type: string;
		module_name: string;
		module_duration?: string | null;
		module_description: string;
		module_objective: string;
	}
	const { id } = useParams<{ id: any }>();

	const [buttonName, setButtonName] = useState("Next Module");
	const [PreviousButton, setPreviousButton] = useState("Previous");
	const [showNext, setShowNext] = useState(false);
	const [showPrev, setShowPrev] = useState(false);
	const [getDoneModulesId, setDoneModulesId] = useState([]);
	let lastCompletedModule = getDoneModulesId[getDoneModulesId.length -1]
	const [indexModule, setIndexModule] = useState(0);
	const [modules, setModules] = useState<number[]>([]);
	const [topics, setTopics] = useState<number[]>([]);
	const isMobile = useMediaQuery('(max-width:900px)');
	// const [allModules,setAllModules] = useState<string[]>([]);
	//console.log(allModules);

	const [moduleView, setModuleView] = useState<moduleViewer[]>([]);
	//console.log(moduleView);

	const dispatch = useDispatch();
	const navigate = useNavigate()
	const { fetchUsers, fetchModuleID} = bindActionCreators(actionCreators, dispatch)
	const [topicId, setTopicId] = useState<any>('');
	//console.log(topicId);
	const [topicView, setTopiceView] = useState<topicViewer[]>([]);
	const { fetchtopicID} = bindActionCreators(actionCreators, dispatch)
	const enrollment_id = localStorage.getItem('enrollment_id')
	const topic_id = useSelector((state: RootState) => state.TopicIDFetch)
	let module_id = useSelector((state: RootState) => state.moduleIDFetch);
	// console.log(topicView);
	// console.log(enrollment_id)
	const [modulesRemaning, setModulesRemaning] = useState<any[]>();
	const [modulesDone, setModuelsDone] = useState<any[]>();
	const [allModuleNumbers, setAllModuelsNumbers] = useState<any>(0);
	const [allModuleTopicId, setAllModuleTopicId] = useState<any>(0);
	// console.log(modulesRemaning, "DONE")
	 console.log(modulesDone, "REMANING")
	console.log(allModuleTopicId, "All topics")
	const course_id = id
	// console.log(topicArray?.map((dataItem : any) => dataItem))
	console.log(course_id, "*-----------------")

	const [expanded, setExpanded] = React.useState<number | false>(false);

	const [path, setPath] = useState<string>("");
	console.log(path.charAt(path.length - 1).indexOf('.'))
	console.log(path)
	const [showContent, setShowContent] = useState(false);
	const [beginNow, setBeginNow] = useState<boolean>(false);


	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const redTheme = createTheme({ palette: { primary:{
		main:  '#917EBD'}
	  } });

	const handleClose = () => setOpen(false);

	const handleChange =
	  (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
		
		setExpanded(isExpanded ? panel : false);
		// fetchModuleID(panel)
	  };

	//   useEffect(() => {
	// 	let isExpanded = true
	// 	setExpanded(isExpanded ? module_id : false);
		
	// 	setTopicId(module_id)
	//   }, [module_id])
	console.log(enrollmentID, "---------------1111--------")

	useEffect(() => {
		API.post('courseModulesRemaining', {courseId: course_id, enrollmentId: enrollmentID})
		.then((res)=>{
		setModulesRemaning(res.data)
		}).catch((err) => {
		  console.log(err)
		})
		API.post('getDoneModulesID', {enrollmentId: enrollmentID})
		.then((res)=>{
		setDoneModulesId(res.data)
		}).catch((err) => {
		  console.log(err)
		})
		API.post('getModuleTopicIdList', {moduleId: module_id})
		.then((res)=>{
		setAllModuleTopicId(res.data)
		}).catch((err) => {
		  console.log(err)
		})
		
		API.post('courseModulesDone', {courseId : course_id, enrollmentId: enrollmentID})
		.then((res)=>{
			setModuelsDone(res.data)
		}).catch((err) => {
		  console.log(err)
		})

		API.get(`getProgressCourseModule/${course_id}`)
		.then((res)=>{
			setAllModuelsNumbers(res.data)
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

		API.get<topicViewer[]>('gettopicformodule/'+topicId)
        .then((res)=>{
         setTopiceView(res.data)
        }).catch((err) => {
          console.log(err)
        })

		if(beginNow === true){
			API.get('getTrackedCourse/' + enrollment_id).then((res) => {
				console.log(enrollment_id);
				console.log(res.data[0]);
				fetchtopicID(res.data[0]?.course_topic);
				console.log(topic_id, 'Brgin TOPC_ID -----------');
				fetchModuleID(
					res.data[0]?.course_modules_completed[
						res.data[0]?.course_modules_completed.length - 1
					]
					);
					let isExpanded = beginNow
					setExpanded(isExpanded ? module_id : false);
					setTopicId(module_id)		
			  });
		}
		
	},[topicId, module_id, topic_id, path, buttonName, beginNow])

	// const box = document.getElementById("frame");
	// console.log(box?.onmousemove)
	// useEffect(()=>{	


	// },[path, module_id, showNext, box])


	const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
		height: 7,
		borderRadius: 5,
		[`&.${linearProgressClasses.colorPrimary}`]: {
		  backgroundColor: '#917EBD',
		},
		[`& .${linearProgressClasses.bar}`]: {
		  borderRadius: 5,
		  background: 'linear-gradient(90deg, #F9EDF5 -3.45%, #FFC8ED 108.05%)'
		},
	  }));

	const handleNext = () =>{
		if(buttonName === "Complete Course"){
			API.post('updateCourseProgress', {enrollmentId: enrollmentID})
			.then((res)=>{
				console.log(res.data)
				if(courseView?.enrollment_status !== 'COMPELETED'){
					API.post('updateCertification', {enrollment_id: enrollmentID})
					.then((res)=>{
						console.log(res.data)
					}).catch((err) => {
					  console.log(err)
					})
				}
				//setShowNext(false)
				navigate("/certificate/"+ course_id)
			}).catch((err) => {
			  console.log(err)
			})
		}
		//console.log(path);
		//let index = allModules?.indexOf(path);
		//console.log(allModules[index+1]);
		// if(index < allModules.length-1){
		// 	// if(topicView[topicView.length-1].topic_path === path){
			let currentModule: any = allModuleNumbers?.indexOf(module_id)
			console.log(module_id, "CURRENT-ID")
			console.log(currentModule, "CURRENT-ID-INDEX")
	
		fetchModuleID(allModuleNumbers[currentModule + 1])
		setTopicId(allModuleNumbers[currentModule + 1])
		setExpanded(allModuleNumbers[currentModule + 1])
		// 	// }
		// 	setShowContent(true);
		// 	setPath(allModules[index+1]);
		// }

		// if(index === allModules.length-1){
		// 	console.log("working")
		// 	setShowNext(false);
		// }

		API.post('updateModuleCompeletedArray', {moduleIDCompleted : allModuleNumbers[currentModule + 1], enrollmentId: enrollmentID})
        .then((res)=>{
         console.log(res.data)
		 setShowNext(false)
        }).catch((err) => {
          console.log(err)
        })
		API.post('updateCourseProgress', {enrollmentId: enrollmentID})
        .then((res)=>{
         console.log(res.data)
		 setShowNext(false)
        }).catch((err) => {
          console.log(err)
        })
	}
	console.log(module_id, "CHANGE IN MODULE INDEX/NUMBER")
	console.log(topic_id, "CHANGE IN TOPIC INDEX/NUMBER")
	

	// const handlePrevious = () =>{
	// 	var index = allModules?.indexOf(path);

	// 	if(index > 0){
	// 		// if(topicView[topicView.length-1].topic_path === path){
	// 			setTopicId(module_id-1)
	// 			setExpanded(module_id-1)
	// 		// }
	// 		setShowContent(true);
	// 		setPath(allModules[index-1]);
	// 	}
	// }


	  const topicClicked = (pathUrl:any) =>{
		setPath(pathUrl);

		setShowContent(!showContent);

	  }
	  const fullscreen = (e: SyntheticEvent<HTMLDivElement>) =>{
		
		console.log(e)
		// box?.requestFullscreen();
	  }
console.log(allModuleNumbers[allModuleNumbers.length - 1], "Final ID")

	  const handelEndVideo = () => {
		const finalModule = allModuleNumbers[allModuleNumbers.length - 1]
		// console.log(finalModule)
		// console.log(module_id, "module-id")
		// console.log(parseInt(finalModule), "final-id")
		
		if(module_id == parseInt(finalModule)){
			setButtonName("Complete Course")
		}

		if(allModuleTopicId[allModuleTopicId.length - 1] === topic_id){
			setShowNext(true)
		}
		console.log(allModuleTopicId + topic_id, "all topics")
	  }

	  const handelBeginNow = () => {
		//topicClicked("https://smartle-video-content.s3.amazonaws.com/Summary+Topics/Communication+Skills/Summary4.mp4")
		setBeginNow(true);
	  };

  return (
	<>
	{!isMobile && (
                    <>
                      <Box
                        sx={{
                          marginTop: '-80px',
                          textAlign: 'center',
                          color: '#917EBD',
                        }}
                      >
                        {courseView?.course_progress === 0 ? (
                          <Typography className="text-sm">
                            Begin your course
                          </Typography>
                        ) : courseView?.course_progress === 100 ? (
                          <Typography>
                            Course is Completed, You can still rewatch the
                            Content
                          </Typography>
                        ) : (
                          <Typography>
                            Continue you course from where you left off
                          </Typography>
                        )}
                      </Box>
                      <ThemeProvider theme={redTheme}>
                        <Box sx={{ textAlign: 'center' }}>
                          {courseView?.course_progress === 0 ? (
                            <Button
                              variant="contained"
                              sx={{ marginTop: '10px', borderRadius: '15px' }}
                              onClick={handelBeginNow}
                            >
                              Begin now
                            </Button>
                          ) : courseView?.course_progress === 100 ? (
                            <Button
                              variant="contained"
                              sx={{ marginTop: '10px' }}
                              onClick={handelBeginNow}
                            >
                              Rewatch
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              sx={{ mt: '10px' }}
                              onClick={handelBeginNow}
                            >
                              Continue
                            </Button>
                          )}
                        </Box>
                      </ThemeProvider>
                    </>
                  )}
	<Box width={"90%"} margin="auto" borderTop={'1px dashed #917EBD'} sx={{marginTop:'20px', paddingBottom:'50px'}}>
	<Typography variant='h5' fontWeight={600} marginTop="20px" className='text-center dark:text-white text-xl md:text-2xl md:text-left'>Modules</Typography>
	<Box>
		{modulesDone?.map((dataItem: any, topicId:number) =>{
			if (!dataItem.module_id) return(<React.Fragment key={topicId}></React.Fragment>);
			return (
				<Accordion  key={topicId}  expanded={expanded === dataItem.module_id} onChange={handleChange(dataItem.module_id)}  style={{borderRadius: '10px', boxShadow: '16px 16px 25px rgba(0, 0, 0, 0.08)',width:'100%'}}>

					<AccordionSummary
					 onClick = {() => {
						setTopicId(dataItem.module_id)
						setBeginNow(false)
						//  setShowContent(false)
						fetchModuleID(dataItem.module_id)
						}}
					expandIcon={<Box><ArrowDropDownRoundedIcon sx={{fontSize:'30px',color:'white'}}/></Box>}
					aria-controls="panel1a-content"
					id="panel1a-header"
					style={{marginTop: '10px', background: 'linear-gradient(90deg, #A18CD1 0%, #FBC2EB 100%)',borderRadius: '10px', boxShadow: '16px 16px 25px rgba(0, 0, 0, 0.08)', width:'100%'}} 
					>

						<Typography sx={{ml: '5px', fontSize:'26px', width:'100%'}} style={{fontWeight : '900', letterSpacing : '1px', color: 'white', width:'100%'}}>
							<Grid container spacing={2} style ={{justifyContent: "space-between"}}>
								<Grid item xs={8} md={6} className='text-base md:text-2xl'>
									{dataItem.module_name}
								</Grid>
								{dataItem?.module_id === lastCompletedModule &&<Grid item xs={1} md={4}>
										{/* topic progress */}
									{/* {courseView.enrollment_status !== 'COMPELETED' && <BorderLinearProgress variant="determinate" value={50} sx={{width:'80%', mt:'10px'}} />} */}
								</Grid>}
								<Grid item xs={3} md={2}>
								<Typography style={{float:'right', position:'relative', left:'30px'}} className='text-xs md:text-lg'>Week {topicId+1}/{moduleViewPaid.length}  {dataItem?.module_id !== lastCompletedModule ? <CheckCircleIcon style = {{color : '#92E86F', fontSize: '25px'}} /> : courseView.enrollment_status === 'COMPELETED'&& <CheckCircleIcon style = {{color : '#92E86F', fontSize: '25px', marginLeft: "20px"}} />}</Typography>
								</Grid>
							</Grid>
							
							<Typography className='text-xs md:text-lg'  sx={{textAlign: 'left', mt:'10px', mb:'5px'}} style={{fontWeight : '500', letterSpacing : '1px', color: 'white'}}>{dataItem.module_description}</Typography>
							{/* topic progress */}
							{/* {isMobile && <Box className='justify-center'><BorderLinearProgress variant="determinate" value={50} sx={{ mt:'20px'}} /></Box>} */}

						</Typography>
					</AccordionSummary>
					
					<AccordionDetails sx={{background:'white'}}>
						
					<Typography sx={{color:'#917EBD', mt:'10px', fontSize:'16px'}}>Activities</Typography>
						<Box >
						{topicView?.map((topicDataItem: any, topicId:number) =>{
							 return (
								<>
								<Grid 
								sx = {{cursor : 'pointer', maxHeight: '60px',padding: '10px'}}
								onClick = {() =>{
									fetchModuleID(topicDataItem?.module_id)
									fetchtopicID(topicDataItem?.topic_id)
									topicClicked(topicDataItem.topic_path)
									}
								}
									container rowSpacing={1} 
									columnSpacing={{ xs: 1, sm: 2, md: 3 }}
									style={{borderRadius:'30px', background: '#FFFFFF', boxShadow: '4px 4px 10px #DFD1E7', marginTop:'10px', marginBottom:'0px'}}
								   >
									<Grid item xs={1}>
										<Box sx={{textAlign:'right'}} >
										{topicDataItem.topic_type === 'Self paced' ? <ArticleRoundedIcon/> : topicDataItem.topic_type === 'Instructor Led' ? <GroupsIcon /> : topicDataItem.topic_type === 'Video' ? <PausePresentationIcon /> : topicDataItem.topic_type === 'Document'? <AttachFileIcon/> :topicDataItem.topic_type === 'Assignment' ? <AssignmentIndRoundedIcon/> : <ArticleRoundedIcon/>}
											</Box>
									</Grid>
									<Grid item xs={10}>
										<Typography className='text-sm md:text-base'>{topicDataItem.topic_name}</Typography>
									</Grid>
									<Grid item xs={1} >
										{/* <Box>{topicsCompleted?.some((dataItem) => topicDataItem?.topic_id === dataItem) ?
										<CheckCircleIcon style={{color: 'green', opacity: '1'}}/>
										:<CheckCircleIcon style={{color: 'green', opacity: '0.2'}}/>
									} </Box> */}
									</Grid>
								</Grid>
								<>
								{showContent && path === topicDataItem.topic_path && <Box style={{marginTop:'20px', borderRadius:'20px'}}>
								{path.charAt(path.length-1) === "4" ? 
								<video id="frame" className='text-center' width="100%" controls  onEnded={handelEndVideo}><source id="frame" className='text-center' src={path} type="video/mp4" />Your browser does not support the video tag.	</video>
								// <Vimeo video={path} autoplay onEnd={() => console.log("asdasdasd")} />
								:
						 <iframe id="frame" className='text-center' onEnded={() =>  console.log("Ended")} allowFullScreen allow="fullscreen" title={path} style={{borderRadius:'15px'}} width="100%" height="800vw" src={path} />
					}
						
						<Box className='md:pl-30 md:pr-50 mt-10'>
						{showPrev && <Button 
								 onClick={() => console.log("previous")}
								className=' sm:mt-12 md:mt-12 lg:mt-5 xl:mt-0 rounded-md md:rounded-md shadow-xl font-bold py-3 px-5 md:w-auto md:px-10 lg:px-10 h-9 text-white bg-color-400 '>
									{PreviousButton}
								
							</Button>}
							{/* <span style={{justifyContent:'center', marginLeft:"300px"}}><button onClick={fullscreen} style={{background:'#917EBD', color:'white', padding:'0px 10px', textAlign:'center'}}><FullscreenExitIcon fontSize='large'/></button></span> */}
								{showNext && <Button 
									onClick={handleNext}
									className='sm:mt-12 md:mt-12 lg:mt-5 xl:mt-0 rounded-md md:rounded-md shadow-xl font-bold py-3 px-10 md:w-auto md:px-14 lg:px-14 h-9 text-white bg-color-400' style={{float:"right"}}>
									{buttonName}
							</Button>}
						</Box>
					</Box>}
					</>
								</>
							 )
							})	
						}
					</Box>
					
					</AccordionDetails>
				</Accordion>
			)
			})
		}
			<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box className="modal">
				<Typography variant='h5' fontWeight={800} marginBottom="60px">Trying to Skip?</Typography>
				<Typography>Please Complete the Unwatched Modules to continue</Typography>
				<ThemeProvider theme={redTheme}>
                      <Button variant='contained' style={{marginTop:"20px"}} onClick = {
						  () => {
						// fetchEnrollmentID(enrollmentID)
						//  navigate('/bookingcourse')
						let sendToModuleId = getDoneModulesId[getDoneModulesId.length - 1]
						setExpanded(false)
						fetchModuleID(sendToModuleId)
						handleChange(sendToModuleId)
						console.log(module_id, "moudID from Clic")
						setOpen(false)
						  }
						  }>
                        <Typography fontWeight={"600"} fontSize="14px" px={"30px"} py={"3px"}>Finish Module	</Typography>
                      </Button>
                </ThemeProvider>
			</Box>
		</Modal>

		{modulesRemaning?.map((dataItem: any, topicId:number) =>{
	if (!dataItem.module_id) return(<React.Fragment key={topicId}></React.Fragment>);
	return(
<Accordion key={topicId} expanded={expanded === dataItem.module_id} onChange={handleChange(dataItem.module_id)} >
					<AccordionSummary
					onClick = {() => {
						setTopicId(dataItem.module_id)
						setOpen(true)
					}}
					style={{borderRadius: '20px', boxShadow: '16px 16px 25px rgba(0, 0, 0, 0.08)',width:'100%'}}
					aria-controls="panel1a-content"
					id="panel1a-header"
					sx={{mt: '10px', background: '#F0F0F0'}} className='activity-title' 
					expandIcon={<ArrowDropDownRoundedIcon sx={{fontSize:'40px',color:'black'}}/>}
					>
						<Typography sx={{ml: '5px', fontSize:'26px', width:'100%', color:'black'}} style={{fontWeight : '900', letterSpacing : '1px', width:'100%'}}>
							<Grid container spacing={2}>
								<Grid item xs={6} className='text-base md:text-2xl'>
									{dataItem.module_name}
								</Grid>
								<Grid item xs={3}>
									
								</Grid>
								<Grid item xs={3}>
								<Typography style={{float:'right', color:'black', fontSize:'18px', fontWeight:'600'}} className='text-xs md:text-lg'>Week {(modulesDone?.length || 1 - modulesRemaning.length) + (topicId + 1)}/{moduleViewPaid.length}</Typography>
								</Grid>
							</Grid>
							<Typography className='text-xs md:text-base pr-10'  sx={{textAlign: 'left', fontSize:'16px', mt:'10px', mb:'5px'}} style={{fontWeight : '500', letterSpacing : '1px'}}>{dataItem.module_description}</Typography>

						</Typography>

					{/* <Typography sx={{ml: '5px'}} className = 'text-lg' style={{fontWeight : '700', letterSpacing : '1px'}}>Week {topicId+3}: {dataItem.module_name}</Typography> */}
					</AccordionSummary>
					<AccordionDetails sx={{background:'white'}} style={{borderRadius: '10px', boxShadow: '16px 16px 25px rgba(0, 0, 0, 0.08)',width:'100%'}}>
						
						<Typography sx={{color:'#917EBD', mt:'10px', fontSize:'16px'}}>Activities</Typography>
						<Box style={{borderRadius:'30px', background: 'lightgray', boxShadow: '4px 4px 10px #DFD1E7', marginTop:'20px', marginBottom:'10px'}}>
							{topicView?.map((topicDataItem: any, topicId:number) =>{
								 return (
									<Grid 
									style = {{cursor : 'pointer', maxHeight: '60px'}}
									onClick = {() =>{
									fetchModuleID(topicDataItem?.module_id)
									fetchtopicID(topicDataItem?.topic_id)
									}
									}
										container rowSpacing={1} 
										columnSpacing={{ xs: 1, sm: 2, md: 3 }}
										sx={{padding: '10px'}}
									   >
										<Grid item xs={1}>
											<Box sx={{textAlign:'right'}} mt={"-5px"}>
											{topicDataItem.topic_type === 'Self paced' ? <ArticleRoundedIcon/> : topicDataItem.topic_type === 'Instructor Led' ? <GroupsIcon /> : topicDataItem.topic_type === 'Video' ? <PausePresentationIcon /> : topicDataItem.topic_type === 'Document'? <AttachFileIcon/> :topicDataItem.topic_type === 'Assignment' ? <AssignmentIndRoundedIcon/> : <ArticleRoundedIcon/>}
												</Box>
										</Grid>
										<Grid item xs={10}>
											<Typography className='text-sm'>{topicDataItem.topic_name}</Typography>
											
										</Grid>
										<Grid item xs={1} mt={"-5px"}>
											<LockIcon />
										</Grid>
									</Grid>
								 )
								})
							}
						</Box>
						</AccordionDetails>
				</Accordion>
				)})	
			}
	</Box>
</Box>
</>
  )
}

export default PaidView;