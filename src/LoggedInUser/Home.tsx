import React, { useState, useEffect } from 'react';
import Header from './Header';
import MobileLoggedHeader from './MobileLoggedHeader';
import { Box, Grid, Typography } from '@mui/material';
import API from '../redux/api/api';
import { useNavigate, Navigate, useHref } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { isNull } from '../util/helpers';
import { actionCreators } from '../redux';
import { RootState } from '../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import './loggedUsers.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import LinearProgress, {
  linearProgressClasses,
} from '@mui/material/LinearProgress';
import Footer from '../components/organisms/Footer';
import LoggedSideDrawer from '../components/organisms/LoggedSideDrawer';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import trialBanner2 from '../util/resources/img/trialBanner2.png';
import trialBanner from '../util/resources/img/trialBanner.png';
import useMediaQuery from '@mui/material/useMediaQuery';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import CourseGridElement from '../components/dynamic/CourseGridElement';

const Home = () => {
  const [learner, setLearner] = useState<any>(
    JSON.parse(localStorage.getItem('learner-details') || 'null')
  );
  const [myCourses, setMyCourse] = useState([]);
  const [myCertificates, setMyCertificates] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [topLearners, setTopLearners] = useState([]);
  const [singleCourse, setSingleCourse] = useState([]);
  const [courses, setCourses] = useState<any>(undefined);
  const [updateCourses, setUpdateCourses] = useState(1);
  const [fail, setFail] = useState(undefined);
  const [filterValue, setFilterValue] = useState<string | undefined>(undefined);
  const [filterAge, setFilterAge] = useState<string | undefined>('All');
  const [filterType, setFilterType] = useState<string | undefined>('All');
  const [ogCourses, setOgCourses] = useState<any>(undefined);
  let [courseID, setCourseID] = useState<number>();

  const dispatch = useDispatch();
  const { fetchUsers, fetchCourseID, fetchEnrollmentID } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const course_id = useSelector((state: RootState) => state.courseIDFetch);
  console.log(course_id);

  const [courseName, setCourseName] = useState<string>('');

  const [keyEvents, setKeyEvents] = useState<eventDetail[]>();
  console.log(keyEvents);
  const width = 'sm:w-1/2 md:w-1/3 lg:w-3/12';
  const color = 'accent-200';

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 7,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === 'light' ? 100 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#917EBD' : '#F9EDF5',
    },
  }));
  const isMobile = useMediaQuery('(max-width:900px)');
  const [isEnterprise, setIsEnterprise] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEnrollmentID(0);
  }, [isMobile]);
  useEffect(() => {
    (async () => {
      try {
        if (learner !== null) {
          API.post('getRecommendedCourses', {
            learnerAge: Number(learner?.student_age),
          })
            .then((res) => {
              const json = res.data;
              if (filterValue !== undefined) {
                console.log(json);
                setCourses(
                  json?.filter((dataItem: any, index: any) =>
                    dataItem.course_title
                      ?.toLowerCase()
                      .includes(filterValue?.toLowerCase())
                  )
                );
              } else if (filterType !== 'All') {
                setCourses(
                  json.filter((dataItem: any, index: any) =>
                    dataItem.course_type?.includes(filterType)
                  )
                );
              } else {
                setCourses(json);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          const res = await fetch(`https://www.backend.smartle.co/courses`);
          const json = await res.json();
          if (filterValue !== undefined) {
            console.log(json.result);
            setCourses(
              json.result?.filter((dataItem: any, index: any) =>
                dataItem.course_title
                  ?.toLowerCase()
                  .includes(filterValue?.toLowerCase())
              )
            );
          } else if (filterAge !== 'All' && filterType !== 'All') {
            setCourses(
              json.result?.filter(
                (dataItem: any, index: any) =>
                  dataItem.course_age?.includes(filterAge) &&
                  dataItem.course_type?.includes(filterType)
              )
            );
          } else if (filterAge !== 'All') {
            setCourses(
              json.result?.filter((dataItem: any, index: any) =>
                dataItem.course_age?.includes(filterAge)
              )
            );
          } else if (filterType !== 'All') {
            setCourses(
              json.result?.filter((dataItem: any, index: any) =>
                dataItem.course_type?.includes(filterType)
              )
            );
          } else {
            setCourses(json.result);
          }
        }
      } catch (e: any) {
        setFail(e.message);
      }
    })();
  }, [filterAge, filterValue, filterType]);

  useEffect(() => {
    if (!isNull(courses) && !isNull(ogCourses)) {
      setFilterAge(undefined);
      setCourses([]);
      let lclCourses = [...ogCourses];
      if (isNull(filterValue)) setCourses(lclCourses);
      (async () => {
        let newlist = await courses?.filter((dataItem: any, index: any) =>
          dataItem?.includes(filterAge)
        );

        // lclCourses?.filter(
        //   (course: any) => course.title?.toLowerCase().includes(filterValue?.toLowerCase())
        // )
        setCourses(newlist);
        setUpdateCourses(updateCourses + 1);
      })();
    }
  }, [filterValue, filterType]);

  useEffect(() => {
    localStorage.removeItem('enrollmentId');
    API.post('enrolledcourses', { studentId: learner?.student_id })
      .then((res) => {
        setMyCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    API.post('certificates', { studentId: learner?.student_id })
      .then((res) => {
        setMyCertificates(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    API.post('getRecommendedCourses', {
      learnerAge: Number(learner?.student_age),
    })
      .then((res) => {
        console.log(res.data);
        setRecommendation(res.data.slice(0, 4));
      })
      .catch((err) => {
        console.log(err);
      });
    API.get('courses')
      .then((res) => {
        setTopLearners(res.data.result.slice(8, 12));
      })
      .catch((err) => {
        console.log(err);
      });
    API.get('getcourseview/18')
      .then((res) => {
        setSingleCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    API.post('getKeyEvents', { student_id: learner?.student_id })
      .then((res) => {
        setKeyEvents(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    API.post('getCourseName', { courseID: courseID })
      .then((res) => {
        setCourseName(res.data[0]?.course_name);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  interface eventDetail {
    course_id: number;
    session_date: string;
    session_zoomurl: string;
  }

  if (learner === null) {
    return <Navigate to="/learner" />;
  } else {
    return (
      <Box className="dark:bg-slate-900">
        {isMobile && <MobileLoggedHeader />}
        {!isMobile && <Header />}
        <Box style={{ borderBottom: '0.83px dashed #917EBD' }}>
          <Box>
            {myCourses.length === 0 ? (
              <div>
                <h2 className="loggedhome_heading dark:text-white">
                  Welcome to your learning journey
                </h2>
                <p className="loggedhome_subheading dark:text-white">
                  You are not enrolled in any courses. Begin your learning
                  journey by exploring courses below.
                </p>
                <Box
                  style={{
                    textAlign: 'center',
                    marginTop: '20px',
                    marginBottom: '80px',
                  }}
                >
                  <Link to={'/courses'}>
                    <button
                      className="sm:text-sm dark:text-white"
                      style={{
                        background: '#917EBD',
                        color: 'white',
                        padding: '5px 50px 5px 50px',
                        fontSize: '18px',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        borderRadius: '11px',
                      }}
                    >
                      Explore Courses
                    </button>
                  </Link>
                </Box>
              </div>
            ) : (
              <div>
                <h2 className="loggedhome_heading dark:text-white">
                  Continue Your Learning Journey
                </h2>
              </div>
            )}
            <div
              className="my-courses"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                marginLeft: '35px',
                marginTop: '20px',
              }}
            >
              {myCourses.length === 0
                ? null
                : myCourses?.map((dataItem: any, index: number) => (
                    <>
                      <div>
                        <div style={{ position: 'relative', height: '400px' }}>
                          {/* <Link to="/loggedcourseview"> */}
                          <div
                            onClick={() => {
                              fetchCourseID(dataItem.course_id);
                              fetchEnrollmentID(dataItem.enrollment_id);
                              localStorage.setItem(
                                'enrollment_id',
                                dataItem.enrollment_id
                              );
                              if (dataItem.enrollment_type === 'paid') {
                                navigate(
                                  `/loggedcourseview/${dataItem.course_id}`
                                );
                              } else {
                                navigate(
                                  `/loggedtrialcourseview/${dataItem.course_id}`
                                );
                              }
                            }}
                            style={{
                              width: '380px',
                              cursor: 'pointer',
                              height: '260px',
                              marginRight: '20px',
                            }}
                            className={`${
                              isEnterprise
                                ? 'bg-contrastAccent-200'
                                : 'bg-accent-200'
                            } rounded-md shadow-xl p-3 relative enrolled_course`}
                          >
                            <img
                              src={dataItem?.course_image}
                              className="rounded-md w-full"
                              alt=""
                            />
                            {/* {dataItem?.enrollment_type === 'trial' &&<img
                    src={trialBanner2}
                    height="130px"
                    width="130px"
                    style = {{position: "absolute", top : -15, left : -8}}
                    alt=""
                  />} */}
                            {dataItem?.enrollment_type === 'trial' && (
                              <img
                                src={trialBanner}
                                height="130px"
                                width="130px"
                                style={{
                                  position: 'absolute',
                                  top: -15,
                                  right: -30,
                                  transform: 'rotate(40deg)',
                                }}
                                alt=""
                              />
                            )}
                          </div>
                          {/* </Link> */}
                          <div
                            style={{ width: '380px' }}
                            className="p-2 relative"
                          >
                            <h1 className="text-2xl m-2 font-black enrolled_course_name dark:text-white">
                              {dataItem.course_name}
                            </h1>
                            {dataItem?.enrollment_type === 'paid' && (
                              <div
                                style={{
                                  position: 'absolute',
                                  top: '0px',
                                  width: '370px',
                                }}
                              >
                                <BorderLinearProgress
                                  variant="determinate"
                                  value={dataItem.course_progress}
                                  className="progress_bar"
                                />
                                <p
                                  style={{
                                    textAlign: 'end',
                                    fontSize: '12px',
                                  }}
                                >
                                  {dataItem?.course_progress === 100
                                    ? `Completed`
                                    : dataItem?.course_progress === 0
                                    ? `Start Course`
                                    : `In Progress`}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
            </div>
          </Box>
        </Box>
        <Grid
          container
          spacing={2}
          sx={{ borderBottom: '0.83px dashed #917EBD' }}
        >
          <Grid item xs={12} md={6}>
            <Box margin="20px" sx={{ borderRight: '0.83px dashed #917EBD' }}>
              <Typography
                fontWeight={700}
                fontSize="32px"
                className="section_heading dark:text-white"
              >
                Our Top courses
              </Typography>
              {
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    borderRadius: '5px',
                  }}
                >
                  {courses?.map((course: any, index: number) => (
                    <Link to={`/course/${course.course_title}`}>
                      <div
                        className={`${width} md:p-3 mb-5 recommended_courses`}
                        style={{ borderRadius: '5px' }}
                      >
                        <div
                          className="flip-card"
                          style={{ borderRadius: '5px' }}
                        >
                          <div
                            className="flip-card-inner"
                            style={{ borderRadius: '5px' }}
                          >
                            <div
                              className="flip-card-front"
                              style={{ borderRadius: '5px' }}
                            >
                              <div
                                style={{
                                  height: '25rem',
                                  width: '17rem',
                                  borderRadius: '5px',
                                  textAlign: 'start',
                                }}
                                className={`bg-${color} rounded-lg  shadow-xl relative md:p-4`}
                              >
                                <div className="relative overflow-y-hidden h-full">
                                  <h2 className="courseFontStyle">
                                    {course.course_title}
                                  </h2>
                                  <div className="text-sm px-4 md:px-0 my-2 relative overflow-x-hidden overflow-y-hidden">
                                    <p className="text-slate-900">
                                      {course.course_description}
                                    </p>
                                    <div
                                      className={`select-none bg-gradient-to-b from-transparent via-transparent to-${color} w-full h-full absolute inset-0`}
                                    />
                                  </div>
                                  {
                                    <div className="heroImg">
                                      <img
                                        className="w-full h-39 z-10 relative rounded-t-lg md:rounded-lg"
                                        loading="lazy"
                                        src={course.course_image}
                                        alt={course.course_name}
                                      />
                                    </div>
                                  }
                                </div>
                              </div>
                            </div>
                            <div
                              style={{
                                textAlign: 'start',
                                borderRadius: '5px',
                              }}
                              className="flip-card-back p-4"
                            >
                              <h2 className="courseFontStyle dark:text-white">
                                {course.course_title}
                              </h2>
                              <br />
                              <br />

                              <div className="courseFlip dark:text-white">
                                <h4>These are Offered as:</h4>
                                {course.course_type
                                  .split(',')
                                  .map((dataItem: any, index: any) => (
                                    <p>{dataItem}</p>
                                  ))}
                                <br />
                                <br />
                                <h4>Curated for Ages: </h4>
                                <p>
                                  <div id="courseAge">
                                    {course.course_age
                                      .split(',')
                                      .map((dataItem: any, index: any) => (
                                        <span>{dataItem}</span>
                                      ))}
                                  </div>
                                </p>
                              </div>
                              <p
                                className="openCourse"
                                style={{
                                  fontSize: '16px',
                                  textAlign: 'center',
                                  marginLeft: '-35px',
                                }}
                              >
                                Take me to course
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              }
              <Box
                style={{
                  textAlign: 'center',
                  marginTop: '20px',
                  marginBottom: '80px',
                }}
              >
                <Link to={'/courses'}>
                  <button
                    style={{
                      background: '#917EBD',
                      color: 'white',
                      padding: '5px 50px 5px 50px',
                      fontSize: '18px',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      borderRadius: '11px',
                    }}
                  >
                    Explore more
                  </button>
                </Link>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box margin="20px" className="dark:text-white">
              <Typography fontWeight={700} fontSize="32px">
                Key events
              </Typography>
              <Box
                style={{
                  borderRadius: '20px',
                  boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.15)',
                  padding: '20px',
                  marginTop: '20px',
                }}
              >
                <Typography fontWeight={700}>Upcoming Sessions</Typography>
                {keyEvents?.map((event) => {
                  //setCourseID(event?.course_id)
                  courseID = event?.course_id;
                  console.log(courseName);
                  return (
                    <Box
                      style={{
                        boxShadow: '4px 4px 10px #DFD1E7',
                        borderRadius: '12px',
                        padding: '10px',
                        marginTop: '20px',
                      }}
                    >
                      <Typography
                        maxWidth={'250px'}
                        fontSize={'22px'}
                        fontWeight={'900'}
                        style={{ color: '#917EBD', paddingLeft: '10px' }}
                      >
                        {courseName}
                      </Typography>
                      <Grid container style={{ marginTop: '30px' }}>
                        <Grid item xs={12} md={6} padding="10px">
                          <Box
                            style={{
                              background: '#DFD1E7',
                              boxShadow: '3px 3px 5px -3px #DFD1E7',
                              borderRadius: '15px',
                              padding: '0px 0px 0px 20px',
                              maxWidth: '180px',
                              color: '#917EBD',
                              cursor: 'pointer',
                            }}
                          >
                            <Button
                              href={event.session_zoomurl}
                              target="_blank"
                              style={{ color: '#917EBD', fontSize: '16px' }}
                            >
                              Join Session
                            </Button>
                          </Box>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          md={6}
                          marginTop="-10px"
                          paddingRight="10px"
                        >
                          <Typography
                            style={{
                              textAlign: 'right',
                              color: '#917EBD',
                              fontSize: '24px',
                            }}
                          >
                            <CalendarMonthIcon style={{ color: '#DFD1E7' }} />
                            {event.session_date.substring(0, 11)}
                          </Typography>
                          <Typography
                            style={{
                              float: 'right',
                              color: '#917EBD',
                              fontSize: '24px',
                            }}
                          >
                            <ScheduleIcon style={{ color: '#DFD1E7' }} />{' '}
                            {event.session_date.substring(12, 16)}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Box mt={'30px'} ml="20px" className="sub_div dark:text-white">
          <Typography
            fontSize={'32px'}
            className="section_heading"
            fontWeight="bold"
          >
            Course completion certificate
          </Typography>
          <div style={{ display: 'flex' }}>
            {myCertificates?.length !== 0 &&
              myCertificates?.map((dataItem: any, index: number) => (
                <>
                  {dataItem?.course_progress == 100 && (
                    <Link to={`/certificate/${dataItem.course_id}`}>
                      <div>
                        <div style={{ position: 'relative', height: '400px' }}>
                          {/* <Link to="/loggedcourseview"> */}
                          <div
                            // onClick={() => {
                            //   fetchCourseID(dataItem.course_id);
                            //   navigate('/loggedcourseview');
                            // }}
                            style={{
                              width: '300px',
                              cursor: 'pointer',
                              height: '200px',
                              marginRight: '20px',
                            }}
                            className={`${
                              isEnterprise
                                ? 'bg-contrastAccent-200'
                                : 'bg-accent-200'
                            } rounded-md shadow-xl p-3 relative enrolled_course`}
                          >
                            <img
                              id="certificate-styles"
                              src={dataItem?.course_image}
                              className="rounded-md w-full"
                              // style={{ opacity: '20%' }}
                              alt=""
                            />
                            {/* {dataItem?.enrollment_type === 'trial' &&<img
                    src={trialBanner2}
                    height="130px"
                    width="130px"
                    style = {{position: "absolute", top : -15, left : -8}}
                    alt=""
                  />} */}
                            {dataItem?.enrollment_type === 'trial' && (
                              <img
                                src={trialBanner}
                                height="130px"
                                width="130px"
                                style={{
                                  position: 'absolute',
                                  top: -15,
                                  right: -30,
                                  transform: 'rotate(40deg)',
                                }}
                                alt=""
                              />
                            )}
                          </div>
                          {/* </Link> */}
                          <div
                            style={{ width: '380px' }}
                            className="p-2 relative"
                          >
                            <h1 className="text-2xl m-2 font-black enrolled_course_name dark:text-white">
                              {dataItem.course_name}
                            </h1>
                            {dataItem?.enrollment_type === 'paid' && (
                              <div
                                style={{
                                  position: 'absolute',
                                  top: '0px',
                                  width: '370px',
                                }}
                              ></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  )}
                </>
              ))}
          </div>
          {myCertificates?.length === 0 && (
            <p className="loggedhome_subheading">
              Don’t have any certificates yet? Start a course now and earn your
              completion certificate{' '}
            </p>
          )}
        </Box>
      </Box>
    );
  }
};

export default Home;
