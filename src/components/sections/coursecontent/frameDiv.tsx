import * as React from 'react';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Box, Typography, Stack, Divider, Grid, Accordion, AccordionDetails} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery'
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import VideogameAssetRoundedIcon from '@mui/icons-material/VideogameAssetRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CourseContentButtons from './CourseContentButtons';
import 'swiper/css';
import 'swiper/css/navigation';

const FrameDiv = () => {
    const isMobile = useMediaQuery('(max-width:1199px)');

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
        <Box sx={{}}>
            <iframe src="https://smartle-video-content.s3.amazonaws.com/Time+Machine+Concept/story.html" 
                title="W3Schools Free Online Web Tutorials" 
                style={{justifyContent:'center', width:"70vw", height: "90vh"}}
                className="content-resize">
            </iframe> 
            {!isMobile ?(<>
            <CourseContentButtons /></>) :(
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
                {topics.map((topic: any, topicId:number) =>{
                     if (!topic.topicId) return(<React.Fragment key={topicId}></React.Fragment>);
                     return (
                        <Accordion key={topicId}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            sx={{mt: '10px'}} className='activity-title' 
                            >
                            {topic.icon}
                            <Typography sx={{ml: '5px'}}>{topic.text}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Typography>
                                {topic.desc}
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                    )
                })
                }
            </> ) }
        </Box>
            
    );
}

export default FrameDiv;