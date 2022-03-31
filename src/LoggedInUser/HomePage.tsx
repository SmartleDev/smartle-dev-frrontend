import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Button  from "@mui/material/Button";
import Typography  from "@mui/material/Typography";
import API from "../redux/api/api";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import "./loggedUsers.css";
import Header from "./Header";
import Footer from "../components/organisms/Footer";
import LoggedSideDrawer from "../components/organisms/LoggedSideDrawer";
import { HashLink as Link } from 'react-router-hash-link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom'

import { actionCreators } from '../redux';
import { RootState } from '../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

function HomePage() {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 5,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 100 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#917EBD" : "#F9EDF5",
    },
  }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fetchUsers, fetchCourseID} = bindActionCreators(actionCreators, dispatch)

  const course_id = useSelector((state: RootState) => state.courseIDFetch)
  console.log(course_id)


  const redTheme = createTheme({ palette: { primary:{
    main:  '#917EBD'}
  } });

  const [myCourses, setMyCourse] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [topLearners, setTopLearners] = useState([]);
  const [singleCourse, setSingleCourse] = useState([]);
  console.log(myCourses);
  const [isEnterprise, setIsEnterprise] = useState<boolean>(false);

  useEffect(() => {
    API.get("coursesonhome")
      .then((res) => {
        setMyCourse(res.data.result.slice(0, 3));
      })
      .catch((err) => {
        console.log(err);
      });
    API.get("courses")
      .then((res) => {
        setRecommendation(res.data.result.slice(4, 8));
      })
      .catch((err) => {
        console.log(err);
      });

    API.get("courses")
      .then((res) => {
        setTopLearners(res.data.result.slice(8, 12));
      })
      .catch((err) => {
        console.log(err);
      });
    API.get("getcourseview/18")
      .then((res) => {
        setSingleCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="home-page">
      <Header />
      <h2 className="text-4xl pb-10 font-black">
        Continue Your Learning Journey
      </h2>
      <div className="my-courses" style={{ display: "flex", flexWrap: "wrap" }}>
        {myCourses?.map((dataItem: any, index: number) => (
          <>
            <div >
              {/* <Link to="/loggedcourseview"> */}
                <div
                onClick={()=>{
                  fetchCourseID(dataItem.course_id)
                  navigate('/loggedcourseview')
                  } 
                }
                  style={{ width: "380px", height: "260px", marginRight: "20px" }}
                  className={`${
                    isEnterprise ? "bg-contrastAccent-200" : "bg-accent-200"
                  } rounded-md shadow-xl p-3 relative`}
                >
                  <img
                    src={dataItem?.course_image}
                    className="rounded-md w-full"
                    alt=""
                  />
                </div>
              {/* </Link> */}
              <div style={{ width: "380px" }} className="p-2 relative">
                <h1 className="text-2xl m-2 font-black">
                  {dataItem.course_name}
                </h1>
                <BorderLinearProgress variant="determinate" value={50} />
                <p style={{ textAlign: "end", fontSize: "12px" }}>
                  In Progress
                </p>
              </div>
            </div>
          </>
        ))}
      </div>

      <div className="recommendation">
        <hr style={{ width: "100%", margin: "30px 0 30px 0" }} />
        <h2 className="text-4xl pb-10 font-black">Top Courses We Recommend</h2>

                  <div style = {{display: "flex", flexWrap: "wrap" }}>


        <div style={{ display: "flex", flexWrap: "wrap", flex : '50%'  }}>
          {recommendation?.map((dataItem: any, index: number) => (
            <div>
              <div
                style={{ width: "300px", height: "205px", marginRight: "20px"}}
                className={`${
                  isEnterprise ? "bg-contrastAccent-200" : "bg-accent-200"
                } rounded-md shadow-xl p-3 relative`}
              >
                <img
                  src={dataItem?.course_image}
                  className="rounded-md w-full"
                  alt=""
                />
              </div>
              <div
                style={{ width: "300px", height: "205px" }}
                className="p-2 relative"
              >
                <h1 className="text-2x2 m-2 font-black">
                  {dataItem.course_name}
                </h1>
                <p>{dataItem?.course_description}</p>
              </div>
            </div>
          ))}
        </div>
        {/* <div className='line-home'></div> */}

        <div style={{ display: "flex", flexWrap: "wrap", flex : '50%' }}>
          {singleCourse?.map((dataItem: any, index: number) => (
            <div>
              <div
                style={{ width: "600px", height: "405px", marginRight: "20px" }}
                className={`${
                  isEnterprise ? "bg-contrastAccent-200" : "bg-accent-200"
                } rounded-md shadow-xl p-3 relative`}
              >
                <img
                  src={dataItem?.course_image}
                  className="rounded-md w-full"
                  alt=""
                />
              </div>
              <div
                style={{ width: "600px", height: "405px" }}
                className="p-2 relative"
              >
                <h1 className="text-4xl m-2 font-black">
                  {dataItem.course_name}
                </h1>
                <p className="text-2xl">{dataItem?.course_description}</p>
                <ThemeProvider theme={redTheme}>
                <Button className='mt-12 mx-5 rounded-md md:rounded-md shadow-xl font-bold py-3 px-10 md:w-auto md:px-10 lg:px-10 h-9 text-white bg-color-400 '>
              Book Course
            </Button>
            <Button className='mt-12 mx-5 rounded-md md:rounded-md shadow-xl font-bold py-3 px-10 md:w-auto md:px-10 lg:px-10 h-9 text-white bg-color-400 '>
              Book Trial
            </Button>
                    </ThemeProvider>
              </div>
            </div>
          ))}
        </div>

</div>
      </div>
      <hr style={{ width: "100%", margin: "30px 0 30px 0" }} />
      <h2 className="text-4xl pb-10 font-black">
        See What Our Top Learners Are Doing
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {topLearners?.map((dataItem: any, index: number) => (
          <div>
            <div
              style={{ width: "300px", height: "205px", marginRight: "20px" }}
              className={`${
                isEnterprise ? "bg-contrastAccent-200" : "bg-accent-200"
              } rounded-md shadow-xl p-3 relative`}
            >
              <img
                src={dataItem?.course_image}
                className="rounded-md w-full"
                alt=""
              />
            </div>
            <div
              style={{ width: "300px", height: "205px" }}
              className="p-2 relative"
            >
              <p className="text-2x2 m-2 font-black">{dataItem.course_name}</p>
              <p>{dataItem?.course_description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
