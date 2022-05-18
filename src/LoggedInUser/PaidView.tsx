import React, {useState, useEffect} from 'react';
import { Box, Grid, Typography, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import VideogameAssetRoundedIcon from '@mui/icons-material/VideogameAssetRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import GroupsIcon from '@mui/icons-material/Groups';
import PausePresentationIcon from '@mui/icons-material/PausePresentation';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';

import { RootState } from '../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../redux';
import { bindActionCreators } from 'redux';
import { Link, useNavigate, useParams} from 'react-router-dom';

import API from "../redux/api/api";

export interface PaidModuleView {
	moduleViewPaid : {}[];
	topicArray : {}[]
  }


function PaidView(props: PaidModuleView) {

	const { moduleViewPaid, topicArray } = props;

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
	const { fetchUsers, fetchModuleID} = bindActionCreators(actionCreators, dispatch)
	const [topicId, setTopicId] = useState('');
	const [topicView, setTopiceView] = useState<topicViewer[]>([]);
	const { fetchtopicID} = bindActionCreators(actionCreators, dispatch)
	const enrollment_id = useSelector((state: RootState) => state.EnrollmentIDFetch)
	console.log(enrollment_id)
	const [topicsCompleted, setTopicsCompleted] = useState<any[]>();
	console.log(topicsCompleted)
	console.log(topicArray?.map((dataItem : any) => dataItem))

	const [expanded, setExpanded] = React.useState<string | false>(false);

	const handleChange =
	  (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
		setExpanded(isExpanded ? panel : false);
	  };

	useEffect(() => {

		API.get('getAllTopicsCompleted/'+enrollment_id)
		.then((res)=>{
		  setTopicsCompleted(res.data)
		}).catch((err) => {
		  console.log(err)
		})

		API.get<topicViewer[]>('gettopicformodule/'+topicId)
        .then((res)=>{
         setTopiceView(res.data)
        }).catch((err) => {
          console.log(err)
        })
	},[topicId, enrollment_id])

  return (
	<Box width={"90%"} margin="auto" borderTop={'1px dashed #917EBD'} sx={{marginTop:'20px'}}>
	<Typography variant='h5' fontWeight={600} marginTop="20px">Modules</Typography>
	<Box>
		{moduleViewPaid?.map((dataItem: any, topicId:number) =>{
			if (!dataItem.module_id) return(<React.Fragment key={topicId}></React.Fragment>);
			return (
				<Accordion  key={topicId}  expanded={expanded === `panel${topicId}`} onChange={handleChange(`panel${topicId}`)}>
					<AccordionSummary
					 onClick = {() => {

						 setTopicId(dataItem.module_id)
						}}
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
									fetchModuleID(topicDataItem?.module_id)
									fetchtopicID(topicDataItem?.topic_id)
									navigate('/course-content')}
								}
									container rowSpacing={1} 
									columnSpacing={{ xs: 1, sm: 2, md: 3 }}
									sx={{borderBottom:'1px dashed #917EBD', padding: '20px'}}
								   >
									<Grid item xs={1}>
										<Box sx={{textAlign:'right'}}>
										{topicDataItem.topic_type === 'Self paced' ? <ArticleRoundedIcon/> : topicDataItem.topic_type === 'Instructor Led' ? <GroupsIcon /> : topicDataItem.topic_type === 'Video' ? <PausePresentationIcon /> : topicDataItem.topic_type === 'Document'? <AttachFileIcon/> :topicDataItem.topic_type === 'Assignment' ? <AssignmentIndRoundedIcon/> : <ArticleRoundedIcon/>}
											</Box>
									</Grid>
									<Grid item xs={10}>
										<Typography>{topicDataItem.topic_name}</Typography>
									</Grid>
									<Grid item xs={1} >
										<Box>{topicsCompleted?.some((dataItem) => topicDataItem?.topic_id === dataItem) ?
										<CheckCircleIcon style={{color: 'green', opacity: '1'}}/>
										:<CheckCircleIcon style={{color: 'green', opacity: '0.2'}}/>
									} </Box>
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
  )
}

export default PaidView