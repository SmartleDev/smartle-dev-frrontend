import * as React from 'react';
import {Box, Slide, AppBar, CssBaseline, Toolbar, Typography, Grid} from '@mui/material';
import GradBlobCourseContent from '../components/atom/GradBlobCourseContent';
import MobileHeader from '../components/organisms/MobileHeader';
import FrameDiv from '../components/sections/coursecontent/frameDiv';
import CourseContentDrawer from '../components/sections/coursecontent/CourseContentDrawer';
import MobileFooter from '../components/organisms/MobileFooter';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import "../styles/coursecontent.scss";

import { RootState } from '../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
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
  const course_id = useSelector((state: RootState) => state.courseIDFetch)
  console.log(course_id)

  return (
    <>
    <Box sx={{ display: 'flex' }} style={{padding: "0px"}}>
      <CssBaseline />
      <HideOnScroll >
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, 
        display: { xs:"none", sm:"nome", md: "none", lg: "block" },}} className="title-div">
        <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography sx={{mt: '5px'}}>Course title: Module 1/6</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant='h5' sx={{ fontWeight: '900' }}>Module Title</Typography>
        </Grid>
        <Grid item xs={8} alignContent="end">
          <Typography variant='h6' align='right' sx={{ fontWeight: '900' }}>Week: 01</Typography>
        </Grid>
      </Grid>
    </Box>
        </Toolbar>
        </AppBar>
        </HideOnScroll>
        <CourseContentDrawer />
        <Box component="main" sx={{ flexGrow: 1 }}>
            <GradBlobCourseContent/>
            <MobileHeader />
            <Box  margin="auto">
                <Typography sx={{mt: '60px', ml:5}}>Learning Video - 1</Typography>
                <FrameDiv />
                </Box>
            </Box>
    </Box>
    <MobileFooter />
    </>
  );
}

export default CourseContent;
