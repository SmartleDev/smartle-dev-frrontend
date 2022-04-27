import React, {useState, useEffect} from 'react';
import { Box, Grid, Typography, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LockIcon from '@mui/icons-material/Lock';
import Modal from '@mui/material/Modal';

import { RootState } from '../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../redux';
import { bindActionCreators } from 'redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import API from "../redux/api/api";
import './loggedUsers.css';

export interface PaidModuleView {
	moduleViewTrial : {}[];
	enrollmentID : number;
  }


function TrialView(props: PaidModuleView) {

	const { moduleViewTrial, enrollmentID } = props;

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
	console.log(enrollment_id)
	const [topicId, setTopicId] = useState('');
	const [topicView, setTopiceView] = useState<topicViewer[]>([]);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	console.log(topicId)

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

  return (
	  <>
	<Box width={"90%"} margin="auto" borderTop={'1px dashed #917EBD'} sx={{marginTop:'20px'}}>
	<Typography variant='h5' fontWeight={600} marginTop="20px">Modules</Typography>
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
						 navigate('/bookcourse')
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
				<Accordion key={topicId} expanded={expanded === `panel${topicId}`} onChange={handleChange(`panel${topicId}`)} >
					<AccordionSummary
					 onClick = {() => setTopicId(dataItem.module_id)}
					expandIcon={<ExpandMoreIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
					sx={{mt: '10px', background: '#F9EDF5'}} className='activity-title' 
					>
					<Typography sx={{ml: '5px'}}>{dataItem.module_name}</Typography>
					</AccordionSummary>
					<AccordionDetails sx={{border: '1px solid #917EBD', borderRadius: '3px'}}>
					<Typography>
						Activities
					</Typography>
					<Box>
						{topicView?.map((topicDataItem: any, topicId:number) =>{
							 return (
								<Grid 
								style = {{cursor : 'pointer'}}
								onClick = {() =>{
									fetchModuleID(topicDataItem.module_id)
									fetchtopicID(topicDataItem?.topic_id)
									navigate('/course-content')
									// setOpen(true)
									}	
								}
									container rowSpacing={1} 
									columnSpacing={{ xs: 1, sm: 2, md: 3 }}
									sx={{borderBottom:'1px dashed #917EBD', padding: '20px'}}
								   >
									<Grid item xs={1}>
										<Box sx={{textAlign:'right'}}><PersonRoundedIcon/></Box>
									</Grid>
									<Grid item xs={10}>
										<Typography>{topicDataItem.topic_name}</Typography>
									</Grid>
									<Grid item xs={1} >
										<Box><CheckCircleIcon style={{color: 'green', opacity: '0.2'}}/></Box>
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




<Box width={"90%"} margin="auto" sx={{marginTop:'20px'}}>
	
	<Box>
		{moduleViewTrial.slice(2)?.map((dataItem: any, topicId:number) =>{
			if (!dataItem.module_id) return(<React.Fragment key={topicId}></React.Fragment>);
			return (
				<Accordion key={topicId} >
					<AccordionSummary
					onClick = {() => 
							{
							setOpen(true)
							}
						}
					expandIcon={<LockIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
					sx={{mt: '10px', background: '#F0F0F0'}} className='activity-title' 
					>
					<Typography sx={{ml: '5px'}}>{dataItem.module_name}</Typography>
					</AccordionSummary>
				</Accordion>
			)
			})
		}
	</Box>
</Box>
</>
  )
}

export default TrialView