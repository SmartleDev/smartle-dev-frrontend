import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { HashLink as Link } from "react-router-hash-link";
import Footer from "../components/organisms/Footer";
import Header from "./Header";
import { bindActionCreators } from "redux";
import { actionCreators } from "../redux";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../redux/reducers";
import API from "../redux/api/api";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

const MyCourses = (props: any) => {
  const location = useLocation();
  const [contactColor, setContactColor] = useState("color");
  const [anchor, setAnchor] = useState<boolean>(false);
  const [linkAdd, setLinkAdd] = useState<string>("/#contactForm");
  const [recommendation, setRecommendation] = useState([]);
  const dispatch = useDispatch();
  const { fetchUsers, fetchCourseID } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const navigate = useNavigate();
  const course_id = useSelector((state: RootState) => state.courseIDFetch);
  const [learner, setLearner] = useState<any>(
    JSON.parse(localStorage.getItem("learner-details") || "null")
  );
  const [isEnterprise, setIsEnterprise] = useState<boolean>(false);

  useEffect(() => {
    if (
      location.pathname === "/enterprise" ||
      location.pathname === "/course/mathematics" ||
      location.pathname === "/course/biology" ||
      location.pathname === "/course/chemistry" ||
      location.pathname === "/course/physics"
    ) {
      setContactColor("contrast");
      setLinkAdd("/enterprise#contactForm");
    } else {
      setContactColor("color");
      setLinkAdd("/#contactForm");
    }
  }, [location]);

  useEffect(() => {
    API.post("getRecommendedCourses", {
      learnerAge: Number(learner?.student_age),
    })
      .then((res) => {
        console.log(res.data);
        setRecommendation(res.data.slice(0, 4));
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 0, mt: -6 }}
      >
        <Toolbar />
        <Header />
        <div className="courseProgress">
          <Link
            to={`/course/10`}
            className="mx-5 md:mx-0 my-10 relative text-slate-900 bg-accent-200 p-5 shadow-xl rounded-lg flex flex-wrap "
            onClick={() => fetchCourseID(10)}
          >
            <div className="w-full md:w-1/3">
              {/* {course.course_image ? (
                <>
                  <img
                    className="w-full rounded-lg"
                    src={course.course_image}
                    alt={course.course_name}
                  />
                </>
              ) : (
                <div className="w-full h-40 rounded-lg bg-color-100"></div>
              )} */}
            </div>
            <div className="w-full md:w-2/3 md:pl-7 mt-5 md:mt-0">
              <div className="font-semibold mb-1">Age: 10 Yrs</div>
              <div className="font-bold text-3xl mb-2">Testing</div>
              <div className="mb-2">Testing </div>
              <div className="md:w-9/12 mb-6 flex items-center">
                {/* <img className="w-10 h-10 mr-5" src={Clock.default} alt="" /> */}
                <div className="">
                  Duration:{" "}
                  <span className="">{`10 Classes, Once Per Week`}</span>
                </div>
              </div>
              {/* <div className="mb-5 md:mb-10 flex items-center">
                  <img className="w-10 h-10 mr-5" src={Card.default} alt="" />            
                  <div className="">Instructor/Coach: <span>{course.instructor.name}</span></div>
                </div> */}
            </div>
            <div style={{ height: 20, width: 20 }}>
              <CircularProgressbar
                value={10}
                text={`${10}%`}
                background
                backgroundPadding={4}
                styles={buildStyles({
                  backgroundColor: "#fff",
                  textColor: "#917EBD",
                  pathColor: "#917EBD",
                  trailColor: "transparent",
                })}
              />
            </div>
            <div className="cost md:absolute bottom-7 right-10  ">
              {/* <p className="text-sm">Cost:</p>
              <p className="text-3xl text-color-400 font-black">
                <span className="text-2xl">$</span>
                <span className="text-4xl">10</span>
              </p> */}
            </div>
          </Link>
        </div>
        <div className="recommendation">
          <hr style={{ width: "100%", margin: "30px 0 30px 0" }} />
          <h2 className="text-4xl pb-10 font-black">
            Top Courses We Recommend
          </h2>

          {/* <div style = {{display: "flex", flexWrap: "wrap" }}> */}

          <div style={{ display: "flex", flexWrap: "wrap", flex: "50%" }}>
            {recommendation?.map((dataItem: any, index: number) => (
              <div>
                <div
                  onClick={() => {
                    fetchCourseID(dataItem.course_id);
                    navigate("/course/" + course_id);
                  }}
                  style={{
                    width: "300px",
                    cursor: "pointer",
                    height: "205px",
                    marginRight: "20px",
                  }}
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
        <Footer />
      </Box>
    </Box>
  );
};

export default MyCourses;
