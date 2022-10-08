import React, {useState, useEffect} from 'react';
import { Box, Grid, Typography, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import Modal from '@mui/material/Modal';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import VideogameAssetRoundedIcon from '@mui/icons-material/VideogameAssetRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import GroupsIcon from '@mui/icons-material/Groups';
import PausePresentationIcon from '@mui/icons-material/PausePresentation';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

import { RootState } from '../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../redux';
import { bindActionCreators } from 'redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

import API from "../redux/api/api";
import './loggedUsers.css';

export interface PaidModuleView {
	moduleViewTrial : {}[];
	enrollmentID : number;
  }


function TrialView(props: PaidModuleView) {

	const { moduleViewTrial, enrollmentID } = props;

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

	const dispatch = useDispatch();
	const navigate = useNavigate()
	const { fetchtopicID, fetchModuleID, fetchEnrollmentID} = bindActionCreators(actionCreators, dispatch)
	const enrollment_id = useSelector((state: RootState) => state.EnrollmentIDFetch);
	//console.log(enrollment_id)
	const [topicId, setTopicId] = useState('');
	const [topicView, setTopiceView] = useState<topicViewer[]>([]);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	//console.log(topicId)

	const [buttonName, setButtonName] = useState("Next");
	const [PreviousButton, setPreviousButton] = useState("Previous");
	const [showNext, setShowNext] = useState(true);
	const [showPrev, setShowPrev] = useState(true);
	const [path, setPath] = useState("");
	  const [showContent, setShowContent] = useState(false);
	  const [indexTopic, setIndexTopic] = useState(0);
	  const [indexModule, setIndexModule] = useState(0);
	  const [modules, setModules] = useState<number[]>([]);
	  const [topics, setTopics] = useState<number[]>([]);
	  const topic_id = useSelector((state: RootState) => state.TopicIDFetch)
	const module_id = useSelector((state: RootState) => state.moduleIDFetch);

	const [expanded, setExpanded] = React.useState<string | false>(false);

	const handleChange =
	  (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
		setExpanded(isExpanded ? panel : false);
	  };

	useEffect(() => {
		API.get<topicViewer[]>('gettopicformodule/'+topicId)
        .then((res)=>{
         setTopiceView(res.data)
        }).catch((err) => {
          console.log(err)
        })
	},[topicId])

	const style = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4
	  };

	  const redTheme = createTheme({ palette: { primary:{
		main:  '#917EBD'}
	  } });

	  const handlePrevious = () =>{
		setIndexModule(modules?.indexOf(module_id)); 
		setIndexTopic(topics?.indexOf(topic_id))
	
		let index = indexTopic
	
		if(indexTopic > 0 ){
		  index = indexTopic-1
		}else if (indexTopic == -1){
		  index = indexTopic+1
		}else{
		  index = 0
		}
	
		if(index < topics.length){
		  // setIndexTopic(indexTopic+1);
		  fetchtopicID(topics[index]);
	
		}else{
		  let indexM = indexModule
	
		  if(indexModule > 0){
			indexM = indexModule-1
			//console.log('firstsssssss')
		  }else{
			indexM = -1
			//console.log('first')
		  }
	
		  if(indexM > modules.length){
			setIndexTopic(-1);
			index = -1
			setIndexModule(indexM);
			fetchModuleID(modules[indexM]);
	
			fetchtopicID(topics[index]);
			//console.log(topics[indexTopic]) 
	
		  }else{
			setShowNext(false);
		  }
		}
	  }

	  const handleNext = () => {
	
		
	
		let index = indexTopic+1  
		setIndexModule(modules?.indexOf(module_id)); 
		setIndexTopic(topics?.indexOf(topic_id))
		//console.log(module_id)
		//console.log(topic_id)
		  if(index < topics.length){
			// setIndexTopic(indexTopic+1);
			fetchtopicID(topics[index]);
			setButtonName("Next")
			//console.log(topics[indexTopic])
	  
			API.post('updateTopicStatus', {courseTopic : topics[index], enrollmentId : enrollment_id})
			.then((res)=>{
				//console.log(res.data)
			}).catch((err) => {
			  console.log(err)
			})
			
			API.post('updateTopicsCompleted', {courseTopic : topics[indexTopic], enrollmentId : enrollment_id})
			.then((res)=>{
				//console.log(res.data)
			}).catch((err) => {
			  console.log(err)
			})
	  
		  }else{
			let indexM = indexModule+1
			if(indexM < modules.length){
			  API.post('updateTopicsCompleted', {courseTopic : topics[indexTopic], enrollmentId : enrollment_id})
			  .then((res)=>{
				  //console.log(res.data)
			  }).catch((err) => {
				console.log(err)
			  })
			  setIndexTopic(0);
			  setIndexModule(indexM);
			  fetchModuleID(modules[indexM]);
	  
			  let index = 0 
			  fetchtopicID(topics[index]);
			  //console.log(topics[indexTopic])
		
			  API.post('updateTopicStatus', {courseTopic : topics[index], enrollmentId : enrollment_id})
			  .then((res)=>{
				  //console.log(res.data)
			  }).catch((err) => {
				console.log(err)
			  })
	  
			  API.post('updateModuleStatus', {courseModule : modules[indexM], enrollmentId : enrollment_id})
			  .then((res)=>{
				  //console.log(res.data)
			  }).catch((err) => {
				console.log(err)
			  })
	  
			  API.post('updateTopicStatus', {courseTopic : topics[0], enrollmentId : enrollment_id})
			  .then((res)=>{
				  //console.log(res.data)
			  }).catch((err) => {
				console.log(err)
			  })
			  
			  API.post('updateModuleCompeletedStatus', {enrollmentId : enrollment_id})
			  .then((res)=>{
				  //console.log(res.data)
			  }).catch((err) => {
				console.log(err)
			  })
	  
			}else{
	  
			  API.post('updateTopicStatus', {courseTopic : topics[indexTopic], enrollmentId : enrollment_id})
			  .then((res)=>{
				  //console.log(res.data)
			  }).catch((err) => {
				console.log(err)
			  })
	  
			  API.post('updateModuleCompeletedStatus', {enrollmentId : enrollment_id})
			  .then((res)=>{
				  console.log(res.data)
			  }).catch((err) => {
				console.log(err)
			  })
	  
			  API.post('updateTopicsCompleted', {courseTopic : topics[indexTopic], enrollmentId : enrollment_id})
			  .then((res)=>{
				  //console.log(res.data)
			  }).catch((err) => {
				console.log(err)
			  })
	  
			  setShowNext(false);
			}
		  }
		  // console.log(indexTopic);
		  // console.log(indexModule);
		 
		}
  
		const box = document.getElementById("frame");
		const fullscreen = () =>{
		  box?.requestFullscreen();
		}

		const topicClicked = (pathUrl:any) =>{
			setPath(pathUrl);
			setShowContent(!showContent);
		  }
	  

  return (
	  <Box style={{paddingBottom:'50px'}}>
	<Box width={"90%"} margin="auto" borderTop={'1px dashed #917EBD'} sx={{marginTop:'20px'}}>
	<Typography variant='h5' fontWeight={600} marginTop="20px" className='dark:text-white'>Modules</Typography>
	<Box>
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box className="modal">
				<Typography variant='h5' fontWeight={800} marginBottom="60px">You are currently on trial version</Typography>
				<Typography>To unlock all modules click on the button below</Typography>
				<ThemeProvider theme={redTheme}>
                      <Button variant='contained' style={{marginTop:"20px"}} onClick = {
						  () => {
						fetchEnrollmentID(enrollmentID)
						 navigate('/bookingcourse')
						  }
						  }>
                        <Typography fontWeight={"600"} fontSize="14px" px={"30px"} py={"3px"}>Book Course</Typography>
                      </Button>
                </ThemeProvider>
			</Box>
		</Modal>
		{moduleViewTrial.slice(0,2)?.map((dataItem: any, topicId:number) =>{
			if (!dataItem.module_id) return(<React.Fragment key={topicId}></React.Fragment>);
			return (
				<Accordion  key={topicId}  expanded={expanded === dataItem.module_id} onChange={handleChange(dataItem.module_id)} style={{borderRadius: '10px', boxShadow: '16px 16px 25px rgba(0, 0, 0, 0.08)',width:'100%'}}>

					<AccordionSummary
					 onClick = {() => {
						 setTopicId(dataItem.module_id)
						 setShowContent(false)
						}}
					expandIcon={<ArrowDropDownRoundedIcon sx={{fontSize:'40px',color:'white'}}/>}
					aria-controls="panel1a-content"
					id="panel1a-header"
					style={{marginTop: '10px', background: 'linear-gradient(90deg, #A18CD1 0%, #FBC2EB 100%)', borderRadius: '10px', boxShadow: '16px 16px 25px rgba(0, 0, 0, 0.08)', width:'100%'}} 
					>

						<Typography sx={{ml: '5px', fontSize:'26px', width:'100%'}} style={{fontWeight : '900', letterSpacing : '1px', color: 'white', width:'100%'}}>
							<Grid container spacing={2}>
								<Grid item xs={7} className='text-base md:text-2xl'>
									{dataItem.module_name}
								</Grid>
								<Grid item xs={2}>
									
								</Grid>
								<Grid item xs={3}>
								<Typography style={{float:'right', position:'relative', left:'40px'}} className='text-xs md:text-lg'>Week {topicId+1}/{moduleViewTrial.length}</Typography>
								</Grid>
							</Grid>
							
							
							<Typography className='text-xs md:text-base pr-10'  sx={{textAlign: 'left', fontSize:'16px', mt:'10px', mb:'5px'}} style={{fontWeight : '500', letterSpacing : '1px', color: 'white'}}>{dataItem.module_description}</Typography>

						</Typography>
					</AccordionSummary>
					
					<AccordionDetails sx={{background:'white'}}>
						
					<Typography sx={{color:'#917EBD', mt:'10px', fontSize:'16px'}}>Activities</Typography>
						<Box ml='20px'>
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
										<Box sx={{textAlign:'right'}}>
										{topicDataItem.topic_type === 'Self paced' ? <ArticleRoundedIcon/> : topicDataItem.topic_type === 'Instructor Led' ? <GroupsIcon /> : topicDataItem.topic_type === 'Video' ? <PausePresentationIcon /> : topicDataItem.topic_type === 'Document'? <AttachFileIcon/> :topicDataItem.topic_type === 'Assignment' ? <AssignmentIndRoundedIcon/> : <ArticleRoundedIcon/>}
											</Box>
									</Grid>
									<Grid item xs={10}>
										<Typography className='text-sm'>{topicDataItem.topic_name}</Typography>
									</Grid>
									<Grid item xs={1} >
										{/* <Box>{topicsCompleted?.some((dataItem) => topicDataItem?.topic_id === dataItem) ?
										<CheckCircleIcon style={{color: 'green', opacity: '1'}}/>
										:<CheckCircleIcon style={{color: 'green', opacity: '0.2'}}/>
									} </Box> */}
									</Grid>
								</Grid>
								{showContent && path === topicDataItem.topic_path && <Box style={{marginTop:'20px', borderRadius:'20px'}}>
						<iframe id="frame" allowFullScreen allow="fullscreen" title={path} style={{borderRadius:'15px'}} width={"100%"} height="500px" src={path} />
						
						<Box paddingLeft={"100px"} paddingRight={"100px"} mt="20px">
							<Button 
								onClick={handlePrevious}
								className='sm:mt-12 md:mt-12 lg:mt-5 xl:mt-0 rounded-md md:rounded-md shadow-xl font-bold py-3 px-5 md:w-auto md:px-10 lg:px-10 h-9 text-white bg-color-400 '>
									{PreviousButton}
								
							</Button>
							<span style={{justifyContent:'center', marginLeft:"300px"}}><button onClick={fullscreen} style={{background:'#917EBD', color:'white', padding:'0px 10px', textAlign:'center'}}><FullscreenExitIcon fontSize='large'/></button></span>
								{showNext && <Button 
									onClick={handleNext}
									className='sm:mt-12 md:mt-12 lg:mt-5 xl:mt-0 rounded-md md:rounded-md shadow-xl font-bold py-3 px-10 md:w-auto md:px-14 lg:px-14 h-9 text-white bg-color-400' style={{float:"right"}}>
									{buttonName}
							</Button>}
						</Box>
					</Box>}
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
	</Box>
</Box>




<Box width={"90%"} margin="auto" sx={{marginTop:'20px'}}>
	
	<Box>
		{moduleViewTrial.slice(2)?.map((dataItem: any, topicId:number) =>{
			// console.log(moduleViewTrial.slice(2));
			if (!dataItem.module_id) return(<React.Fragment key={topicId}></React.Fragment>);
			return (
				<Accordion key={topicId} >
					<AccordionSummary
					onClick = {() => setTopicId(dataItem.module_id)}
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
								<Typography style={{float:'right', color:'black', fontSize:'18px', fontWeight:'600'}} className='text-xs md:text-lg'>Week {topicId+3}/{moduleViewTrial.length}</Typography>
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
										setOpen(true)
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
			)
			})
		}
	</Box>
</Box>
</Box>
  )
}

export default TrialView