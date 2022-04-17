import React, {useState, useEffect} from 'react';
import { Box, Grid, Typography, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LockIcon from '@mui/icons-material/Lock';

import { RootState } from '../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators } from '../redux';
import { bindActionCreators } from 'redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

import API from "../redux/api/api";

export interface PaidModuleView {
	moduleViewTrial : {}[];
  }


function TrialView(props: PaidModuleView) {

	const { moduleViewTrial } = props;

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
	console.log(topicId)

	useEffect(() => {
		API.get<topicViewer[]>('gettopicformodule/'+topicId)
        .then((res)=>{
         setTopiceView(res.data)
        }).catch((err) => {
          console.log(err)
        })
	},[topicId])

  return (
	  <>
	<Box width={"90%"} margin="auto" borderTop={'1px dashed #917EBD'} sx={{marginTop:'20px'}}>
	<Typography variant='h5' fontWeight={600} marginTop="20px">Modules</Typography>
	<Box>
		{moduleViewTrial.slice(0,2)?.map((dataItem: any, topicId:number) =>{
			if (!dataItem.module_id) return(<React.Fragment key={topicId}></React.Fragment>);
			return (
				<Accordion key={topicId} >
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
									navigate('/course-content')}
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
	<Typography variant='h5' fontWeight={600} marginTop="20px">Buy Course To Unlock</Typography>
	<Box>
		{moduleViewTrial.slice(2)?.map((dataItem: any, topicId:number) =>{
			if (!dataItem.module_id) return(<React.Fragment key={topicId}></React.Fragment>);
			return (
				<Accordion key={topicId} >
					<AccordionSummary
					 onClick = {() => setTopicId(dataItem.module_id)}
					expandIcon={<LockIcon />}
					aria-controls="panel1a-content"
					id="panel1a-header"
					sx={{mt: '10px', background: '#F0F0F0'}} className='activity-title' 
					>
					<Typography sx={{ml: '5px'}}>{dataItem.module_name}</Typography>
					</AccordionSummary>
					<AccordionDetails sx={{border: '1px solid #F0F0F0', borderRadius: '3px'}}>
					<Typography>
						Activities
					</Typography>
					<Box>
						{topicView?.map((topicDataItem: any, topicId:number) =>{
							 return (
								<Grid 
								style = {{cursor : 'pointer'}}
								onClick = {() =>{
									navigate('/bookcourse')}
								}
									container rowSpacing={1} 
									columnSpacing={{ xs: 1, sm: 2, md: 3 }}
									sx={{borderBottom:'1px dashed #E5DEDE', padding: '20px'}}
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
</>
  )
}

export default TrialView