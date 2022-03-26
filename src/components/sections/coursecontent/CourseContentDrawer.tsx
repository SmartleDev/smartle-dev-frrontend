import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {Drawer, Toolbar, Divider, Stack, Typography, Box, Grid, Accordion, AccordionDetails} from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import VideogameAssetRoundedIcon from '@mui/icons-material/VideogameAssetRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

const CourseContentDrawer = ():JSX.Element => {
    const drawerWidth:number = 240;

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
        <Box sx={{ overflow: 'auto' }}>
            <Box sx={{mt: '70px'}} className='module-overview' component={Stack} direction="column" justifyContent="center">
                <Typography variant='h6' >Module Overview</Typography>
            </Box>
            <Typography paragraph sx={{pl: '10px', pr: '10px', mt: '10px'}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. l aenean urna,
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
        </Box>
        
      </Drawer>
    );
};

export default CourseContentDrawer;