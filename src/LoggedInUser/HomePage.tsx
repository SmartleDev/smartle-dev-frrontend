import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import API from "../redux/api/api";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import "./loggedUsers.css";
import Header from "./Header";
import Footer from "../components/organisms/Footer";
import LoggedSideDrawer from "../components/organisms/LoggedSideDrawer";
import { HashLink as Link } from 'react-router-hash-link';

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

  const [myCourses, setMyCourse] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [topLearners, setTopLearners] = useState([]);
  console.log(myCourses);
  const [isEnterprise, setIsEnterprise] = useState<boolean>(false);

  useEffect(() => {
    API.get("coursesonhome")
      .then((res) => {
        setMyCourse(res.data.result.slice(0, 4));
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
        setTopLearners(res.data.result.slice(8, 13));
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
            <div>
              <Link to="/loggedcourseview">
                <div
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
              </Link>
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

        <div style={{ display: "flex", flexWrap: "wrap", width: "50%" }}>
          {recommendation?.map((dataItem: any, index: number) => (
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
                <h1 className="text-2x2 m-2 font-black">
                  {dataItem.course_name}
                </h1>
                <p>{dataItem?.course_description}</p>
              </div>
            </div>
          ))}
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
