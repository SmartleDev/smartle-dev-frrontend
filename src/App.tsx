import React, { Suspense, useEffect, useState } from 'react';
import { Route, Routes, useLocation} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Header from './components/organisms/Header';
import { ThemeProvider, createTheme } from '@mui/material';
import Footer from './components/organisms/Footer';
import VerifyingUser from './auth/VerifyingUser';

//redux copy
import { actionCreators } from './redux';
import { RootState } from './redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import { lazy } from 'react';
import CompleteHome from './pages/Complete/CompleteHome';
import CompleteCourses from './pages/Complete/CompleteCourses';
import CompleteCourse from './pages/Complete/CompleteCourse';
import CompleteError from './pages/Complete/CompleteError';
import CompleteLegal from './pages/Complete/CompleteLegal';
import CompletePrivacyPolicy from './pages/Complete/CompletePrivacyPolicy';
import CompleteEnterprise from './pages/Complete/CompleteEnterprise';
import Login from './auth/Login';
import Signup from './auth/Signup';
import RegisterChild from './auth/RegisterChild';
import SelectLearner from './auth/SelectLearner';
import LoggedSideDrawer from './components/organisms/LoggedSideDrawer';
import CourseView from './LoggedInUser/CourseView';

// Lazy loaded components to improve base performance.
const Home = lazy(() => import('./pages/home'));
const LoggedUserHome = lazy(() => import('./LoggedInUser/HomePage'));
const Courses = lazy(() => import('./pages/courses'));
const Course = lazy(() => import('./pages/course'));
// const About = lazy(() => import('../../pages/about'));
const Enterprise = lazy(() => import('./pages/enterprise'));
const Legal = lazy(() => import('./pages/legal'));
const PrivacyPolicy = lazy(() => import('./pages/privacyPolicy'));
const Error = lazy(() => import('./pages/error'));
const CourseContent = lazy(() => import('./pages/courseContent'));
const BookCourse = lazy(() => import('./bookCourse/BookCourse'));
const MyCourses = lazy(() => import('./LoggedInUser/MyCourses'));
const SwitchUser = lazy(() => import('./LoggedInUser/SwitchUser'));

const theme = createTheme();

function App() {
  //copy
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

  return (
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
                { user !== null ?
                  <Route path="/" element={<LoggedSideDrawer />} />
                  :
                  <Route path="/" element={<CompleteHome />} />
                  }
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
                {/* <Route path="/" element={<LoggedSideDrawer />} /> */}
                <Route path="/loggedcourseview" element={<CourseView />} />
                <Route path="/mycourses" element={<MyCourses />} />
                <Route path="/switchlearner" element={<SwitchUser />} />
                <Route path="*" element={<CompleteError />} />

               
          </Routes>
            </div>
          </Suspense>
    </ThemeProvider>
  );
}

export default App;
