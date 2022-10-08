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

const Course = lazy(() => import('./pages/courseViewHome'));
const CourseContent = lazy(() => import('./pages/courseContent'));
const ForgotPassword = lazy(() => import('./auth/forgotPassword/ForgotPassword'));
const VerifyForgotPass = lazy(() => import('./auth/forgotPassword/VerifyForgotPass'));
const NewPassword = lazy(() => import('./auth/forgotPassword/NewPassword'));

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
                  <Route path="/" element={<CompleteHome />} />
                <Route path="/courses" element={<CompleteCourses />} />
                <Route path="/course/:id" element={<CompleteCourse />} />
                <Route path="/course/:id" element={<Course />} />
                <Route path="/enterprise" element={<CompleteEnterprise />} />
                <Route path="/terms-of-service" element={<CompleteLegal />} />
                <Route path="/privacy-policy" element={<CompletePrivacyPolicy />} />
                <Route path=' ' element={<CourseContent/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/registerchild" element={<RegisterChild/>} />
                <Route path="/learner" element={<SelectLearner/>} />
                <Route path="/otp" element={<VerifyingUser/>} />
                <Route path="/forgotpassword" element={<ForgotPassword/>} />
                <Route path="/verfiyforgotpassword" element={<VerifyForgotPass/>} />
                <Route path="/newpassword" element={<NewPassword/>} />
               
                {/* <Route path="/" element={<LoggedSideDrawer />} /> */}
                <Route path="*" element={<CompleteError />} />
          </Routes>
            </div>
          </Suspense>
    </ThemeProvider>
  );
}

export default App;
