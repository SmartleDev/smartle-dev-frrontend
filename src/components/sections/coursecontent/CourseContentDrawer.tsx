import React, {useState, useEffect} from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {Drawer, Toolbar, Divider, Stack, Typography, Box, Grid, Accordion, AccordionDetails} from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import VideogameAssetRoundedIcon from '@mui/icons-material/VideogameAssetRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import GroupsIcon from '@mui/icons-material/Groups';
import PausePresentationIcon from '@mui/icons-material/PausePresentation';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import API from "../../../redux/api/api";
import {useParams} from 'react-router-dom'
import { RootState } from '../../../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
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

const CourseContentDrawer = ():JSX.Element => {

    const [moduleView, setModuleView] = useState<moduleViewer[]>([]);
    console.log(moduleView)
    const [topicView, setTopiceView] = useState<topicViewer[]>([]);
  
    const module_id = useSelector((state: RootState) => state.moduleIDFetch)
    console.log(module_id)

    console.log(moduleView)
    
      useEffect(() => {
    
        API.get<moduleViewer[]>('getModuleView/'+module_id)
        .then((res)=>{
          setModuleView(res.data)
        }).catch((err) => {
          console.log(err)
        })

        API.get<topicViewer[]>('/gettopicformodule/'+module_id)
        .then((res)=>{
         setTopiceView(res.data)
        }).catch((err) => {
          console.log(err)
        })
    
      }, [])
    const drawerWidth:number = 340;

    const topics = [
        {
            topicId : 1,
            icon : <PersonRoundedIcon/>,
            text: "Self Paced",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
        },
        {
            topicId : 2,
            icon : <ArticleRoundedIcon/>,
            text: "Simulation",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
        },
        {
            topicId : 3,
            icon : <PersonRoundedIcon/>,
            text: "Self Paced",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
        },
        {
            topicId : 4,
            icon : <VideogameAssetRoundedIcon/>,
            text: "Reference Document",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
        },
        {
            topicId : 5,
            icon : <AssignmentIndRoundedIcon/>,
            text: "Assignment",
            desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
        },
    ]

    
    return (
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
        <Toolbar />
        <Box sx={{ overflow: 'auto', }}>
            <Box sx={{mt: '70px'}} className='module-overview' component={Stack} direction="column" justifyContent="center">
                <Typography variant='h6' >Module Overview</Typography>
            </Box>
            <Typography paragraph sx={{pl: '10px', pr: '10px', mt: '10px'}}>
                {moduleView[0]?.module_description}
            </Typography>
            <Divider />
            <Box sx={{ flexGrow: 1, mt:'10px', ml:'10px',mr:'10px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                     <Typography>Activities</Typography>
                    </Grid>
                    <Grid item xs={6} textAlign="right">
                        <Typography>1/5</Typography>
                    </Grid>
                </Grid>
            </Box>
            {topicView?.map((dataItem: any, topicId:number) =>{
                // if (!topicView) return(<React.Fragment key={topicId}></React.Fragment>);
                return (
                    <Accordion key={topicId}>
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
            }
        </Box>
        
      </Drawer>
    );
};

export default CourseContentDrawer;