import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import React, { Suspense, useEffect, useState } from 'react';
import { Route, Routes, useLocation, Link} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Header from '../components/organisms/Header';
import { ThemeProvider, createTheme } from '@mui/material';
import Footer from '../components/organisms/Footer';
import VerifyingUser from '../auth/VerifyingUser';
import ExploreIcon from '@mui/icons-material/Explore';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import { logoText, logoNoText } from "../util/resources"

//redux copy
import { actionCreators } from '../redux';
import { RootState } from '../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import { lazy } from 'react';
import CompleteHome from '../pages/Complete/CompleteHome';
import CompleteCourses from '../pages/Complete/CompleteCourses';
import CompleteCourse from '../pages/Complete/CompleteCourse';
import CompleteError from '../pages/Complete/CompleteError';
import CompleteLegal from '../pages/Complete/CompleteLegal';
import CompletePrivacyPolicy from '../pages/Complete/CompletePrivacyPolicy';
import CompleteEnterprise from '../pages/Complete/CompleteEnterprise';
import Login from '../auth/Login';
import Signup from '../auth/Signup';
import RegisterChild from '../auth/RegisterChild';
import SelectLearner from '../auth/SelectLearner';
import ShortTextIcon from '@mui/icons-material/ShortText';
import CourseView from '../LoggedInUser/CourseView';
import BookTrial from '../bookCourse/BookTrial';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
const Home = lazy(() => import('../pages/home'));
const LoggedUserHome = lazy(() => import('./HomePage'));
const Courses = lazy(() => import('../pages/courses'));
const Course = lazy(() => import('../pages/course'));
// const About = lazy(() => import('../../pages/about'));
const Enterprise = lazy(() => import('../pages/enterprise'));
const Legal = lazy(() => import('../pages/legal'));
const PrivacyPolicy = lazy(() => import('../pages/privacyPolicy'));
const Error = lazy(() => import('../pages/error'));
const CourseContent = lazy(() => import('../pages/courseContent'));
const BookCourse = lazy(() => import('../bookCourse/BookCourse'));
const MyCourses = lazy(() => import('../LoggedInUser/MyCourses'));
const SwitchUser = lazy(() => import('../LoggedInUser/SwitchUser'));
// const Drawer = lazy(() => import('../LoggedInUser/Drawer'));

const theme = createTheme();

export default function MiniDrawer() {

	const location = useLocation();
	const dispatch = useDispatch();
	const { fetchUsers, fetchCourseID} = bindActionCreators(actionCreators, dispatch)
  
	const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-details') || 'null'))
	const [leanerUser, setLearnerUser] = useState<any>(JSON.parse(localStorage.getItem('learner-details') || 'null'))
	
	useEffect(() => {
	  fetchUsers()
	  window.scrollTo(0, 0);
	  if (
		location.pathname === "/enterprise" ||
		location.pathname === "/course/chemistry" ||
		location.pathname === "/course/mathematics" ||
		location.pathname === "/course/biology" ||
		location.pathname === "/course/physics"
	  )
		document.documentElement.style.setProperty('--scrollBarColor', '#5290F2');
	  else
		document.documentElement.style.setProperty('--scrollBarColor', '#917ebd');
	}, [location, user, leanerUser, Route]);
	const state = useSelector((state: RootState) => state.fetchUsers)
	
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer variant="permanent" open={open}
      PaperProps={{
        style: {
          background: 'linear-gradient(to right bottom, #A18CD1, #FBC2EB)',
        }
      }}>
	  <IconButton
          
            color="primary"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
			style = {{color : 'black', margin : '10px 0px 5px 0px'}}
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <ShortTextIcon fontSize='large'/>
            
          </IconButton>
		  {open && <DrawerHeader>
           <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>}
        <Divider />
        <List>
			<Link to ='/'>
            <ListItemButton
              sx={{
                minHeight: 60,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
				<ListItemIcon
                sx={{
                  my : '20px',
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                  <img className='w-12' src={logoNoText} alt="" />
              </ListItemIcon>
              <ListItemText>
              <img className='w-40' src={logoText} alt="" />
              </ListItemText>
            </ListItemButton>
			</Link>
      <Divider />
		<Link to='courses'>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
				<ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                 <ExploreIcon />
              </ListItemIcon>
              <ListItemText>
              <Button variant="contained"  sx={{width:'150px', height:'50px', borderRadius: '12px',marginLeft : '18px', backgroundColor:'#917EBD', fontWeight: '600'}}>
            Explore
           </Button>
                </ListItemText>
            </ListItemButton>
			</Link>
		<Link to='mycourses'>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
				<ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                 <SchoolIcon />
              </ListItemIcon>
              <ListItemText>
              <Button variant="contained"  sx={{width:'150px', height:'50px', borderRadius: '12px',marginLeft : '18px', backgroundColor:'#917EBD', fontWeight: '600'}}>
            My Courses
           </Button>
                </ListItemText>
            </ListItemButton>
			</Link>

			{/* <Link to ='mycourses'>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
				<ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                 <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary= 'My Courses' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
			</Link> */}
              
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* <DrawerHeader /> */}
		<ThemeProvider theme={theme}>
          <Suspense
            fallback={
              <div style={{ marginTop: '40vh', textAlign: 'center' }}>
                <CircularProgress color="secondary" />
              </div>
            }
          >
            <div className="">
            <Routes>
                <Route path="/" element={<LoggedUserHome />} />
                <Route path="/courses" element={<CompleteCourses />} />
                <Route path="/course/:id" element={<CompleteCourse />} />
                <Route path="/enterprise" element={<CompleteEnterprise />} />
                <Route path="/terms-of-service" element={<CompleteLegal />} />
                <Route path="/privacy-policy" element={<CompletePrivacyPolicy />} />
                <Route path=' ' element={<CourseContent/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/registerchild" element={<RegisterChild/>} />
                <Route path="/learner" element={<SelectLearner/>} />
                <Route path="/otp" element={<VerifyingUser/>} />
                <Route path="/bookcourse" element={<BookCourse/>} />
                <Route path="/booktrial" element={<BookTrial/>} />
                {/* <Route path="/" element={<LoggedSideDrawer />} /> */}
                <Route path="/loggedcourseview" element={<CourseView />} />
                <Route path="/mycourses" element={<MyCourses />} />
                {/* <Route path="/switchlearner" element={<SwitchUser />} /> */}
                <Route path="*" element={<CompleteError />} />
                <Route path='/course-content' element={<CourseContent/>} />
                {/* <Route path='/drawer' element={<Drawer/>} /> */}

               
          </Routes>
            </div>
          </Suspense>
    </ThemeProvider>
      </Box>
    </Box>
  );
}
