import React, {useState, useEffect, SyntheticEvent} from 'react';
import { Box, Grid, Typography, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
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
import { styled } from '@mui/material/styles';
import ReactPlayer from 'react-player'

import API from "../redux/api/api";
import BookCourse from '../bookCourse/BookCourse';
import Vimeo from '@u-wave/react-vimeo';


export interface PaidModuleView {
	moduleViewPaid : {}[];
	topicArray : {}[]
  }


function PaidView(props: PaidModuleView) {

	const { moduleViewPaid, topicArray } = props;

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

	const [buttonName, setButtonName] = useState("Next");
	const [PreviousButton, setPreviousButton] = useState("Previous");
	const [showNext, setShowNext] = useState(true);
	const [showPrev, setShowPrev] = useState(true);
	const [indexTopic, setIndexTopic] = useState(0);
	const [indexModule, setIndexModule] = useState(0);
	const [modules, setModules] = useState<number[]>([]);
	const [topics, setTopics] = useState<number[]>([]);
	const isMobile = useMediaQuery('(max-width:900px)');
	const [allModules,setAllModules] = useState<string[]>([]);
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
	const enrollment_id = useSelector((state: RootState) => state.EnrollmentIDFetch)
	const topic_id = useSelector((state: RootState) => state.TopicIDFetch)
	let module_id = useSelector((state: RootState) => state.moduleIDFetch);
	// console.log(topicView);
	//console.log(enrollment_id)
	const [topicsCompleted, setTopicsCompleted] = useState<any[]>();
	// console.log(topicsCompleted)
	const course_id = useSelector((state: RootState) => state.courseIDFetch);
	// console.log(topicArray?.map((dataItem : any) => dataItem))

	const [expanded, setExpanded] = React.useState<number | false>(false);

	const [path, setPath] = useState<string>("");
	console.log(path.charAt(path.length - 1).indexOf('.'))
	const [showContent, setShowContent] = useState(false);

	const handleChange =
	  (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
		
		setExpanded(isExpanded ? panel : false);
	  };

	  useEffect(() => {
		let isExpanded = true
		setExpanded(isExpanded ? module_id : false);
		
		setTopicId(module_id)
	  }, [module_id])

	useEffect(() => {
		API.get('getAllTopicsCompleted/'+enrollment_id)
		.then((res)=>{
		  setTopicsCompleted(res.data)
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
		
	},[topicId, module_id, topic_id, path])

	const box = document.getElementById("frame");
	// console.log(box?.onmousemove)
	useEffect(()=>{	

		if(box?.onended){
			console.log(box?.onended);
		}

		API.get('alltopics/'+course_id)
		.then((res) => {
		//console.log(module_id)
		  setAllModules(res.data);
		})
		.catch((err) => {
		  console.log(err);
		});
	},[path, module_id, showNext, box])


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
		//console.log(path);
		var index = allModules?.indexOf(path);
		//console.log(allModules[index+1]);

		if(index < allModules.length-1){
			// if(topicView[topicView.length-1].topic_path === path){
				setTopicId(module_id+1)
				setExpanded(module_id+1)
			// }
			setShowContent(true);
			setPath(allModules[index+1]);
		}

		// if(index === allModules.length-1){
		// 	console.log("working")
		// 	setShowNext(false);
		// }
	}

	const handlePrevious = () =>{
		var index = allModules?.indexOf(path);

		if(index > 0){
			// if(topicView[topicView.length-1].topic_path === path){
				setTopicId(module_id-1)
				setExpanded(module_id-1)
			// }
			setShowContent(true);
			setPath(allModules[index-1]);
		}
	}


	  const topicClicked = (pathUrl:any) =>{
		setPath(pathUrl);

		setShowContent(!showContent);

	  }


	  const fullscreen = (e: SyntheticEvent<HTMLDivElement>) =>{
		
		console.log(e)
		// box?.requestFullscreen();
	  }

  return (
	<Box width={"90%"} margin="auto" borderTop={'1px dashed #917EBD'} sx={{marginTop:'20px', paddingBottom:'50px'}}>
	<Typography variant='h5' fontWeight={600} marginTop="20px" className='text-center dark:text-white text-xl md:text-2xl md:text-left'>Modules</Typography>
	<Box>
		{moduleViewPaid?.map((dataItem: any, topicId:number) =>{
			if (!dataItem.module_id) return(<React.Fragment key={topicId}></React.Fragment>);
			return (
				<Accordion  key={topicId}  expanded={expanded === dataItem.module_id} onChange={handleChange(dataItem.module_id)}  style={{borderRadius: '10px', boxShadow: '16px 16px 25px rgba(0, 0, 0, 0.08)',width:'100%'}}>

					<AccordionSummary
					 onClick = {() => {
						setTopicId(dataItem.module_id)
						 setShowContent(false)
						}}
					expandIcon={<Box><ArrowDropDownRoundedIcon sx={{fontSize:'30px',color:'white'}}/></Box>}
					aria-controls="panel1a-content"
					id="panel1a-header"
					style={{marginTop: '10px', background: 'linear-gradient(90deg, #A18CD1 0%, #FBC2EB 100%)', borderRadius: '10px', boxShadow: '16px 16px 25px rgba(0, 0, 0, 0.08)', width:'100%'}} 
					>

						<Typography sx={{ml: '5px', fontSize:'26px', width:'100%'}} style={{fontWeight : '900', letterSpacing : '1px', color: 'white', width:'100%'}}>
							<Grid container spacing={2}>
								<Grid item xs={8} md={6} className='text-base md:text-2xl'>
									{dataItem.module_name}
								</Grid>
								<Grid item xs={1} md={4}>
									{!isMobile && <BorderLinearProgress variant="determinate" value={50} sx={{width:'80%', mt:'10px'}} />}
								</Grid>
								<Grid item xs={3} md={2}>
								<Typography style={{float:'right', position:'relative', left:'30px'}} className='text-xs md:text-lg'>Week {topicId+1}/{moduleViewPaid.length}</Typography>
								</Grid>
							</Grid>
							
							<Typography className='text-xs md:text-lg'  sx={{textAlign: 'left', mt:'10px', mb:'5px'}} style={{fontWeight : '500', letterSpacing : '1px', color: 'white'}}>{dataItem.module_description}</Typography>
							{isMobile && <Box className='justify-center'><BorderLinearProgress variant="determinate" value={50} sx={{ mt:'20px'}} /></Box>}

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
								{showContent && path === topicDataItem.topic_path && <Box style={{marginTop:'20px', borderRadius:'20px'}}>
						<iframe id="frame" className='text-center' onEnded={() =>  console.log("Ended")} allowFullScreen allow="fullscreen" title={path} style={{borderRadius:'15px'}} width={"100%"} height="400px" src={path} />
						
						<Box className='md:pl-30 md:pr-50 mt-10'>
						{showPrev && <Button 
								 onClick={handlePrevious}
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
  )
}

export default PaidView;