import React, { useEffect, useState } from "react";
import Header from "../LoggedInUser/Header";
import Footer from "../components/organisms/Footer";
import "../auth/auth.css";
import PersonIcon from "@mui/icons-material/Person";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import API from "../redux/api/api";
import { Button, Card, TextField, Typography } from "@mui/material";

function LearnerProfile() {
  const [learner, setLearner] = useState<any>(
    JSON.parse(localStorage.getItem("learner-details") || "null")
  );

  const [myCourses, setMyCourse] = useState([]);

  useEffect(() => {
    API.post("enrolledcourses", { studentId: learner.student_id })
      .then((res) => {
        setMyCourse(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Header />
      <Typography
        fontWeight={800}
        display="flex"
        justifyContent="center"
        fontSize={32}
        paddingBottom="26px"
      >
        Profile
      </Typography>
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <PersonIcon
            className="learner-icon"
            style={{
              color: "#917EBD",
              backgroundColor: "#F9EDF5",
              padding: "20px",
              fontSize: "150px",
              borderRadius: "50%",
              // border: '3px dotted #606060',
              // borderSpacing: '10',
            }}
          />
        </div>
        <Typography
          fontSize={22}
          display={"flex"}
          justifyContent={"center"}
          paddingTop={"14px"}
        >
          {learner.student_name}
        </Typography>
        <div
          style={{ display: "flex", flexDirection: "column", width: "724px" }}
        >
          <Typography fontSize={24}> Name </Typography>
          <TextField
            id="filled-basic"
            variant="filled"
            placeholder="Name"
            inputProps={{ style: { background: "#F9EDF5", height: 12 } }}
          />
          <Typography fontSize={24}>Mail ID</Typography>
          <TextField
            id="filled-basic"
            variant="filled"
            placeholder="abcd123@gmail.com"
            inputProps={{ style: { background: "#F9EDF5", height: 12 } }}
          />
          <Typography fontSize={24}>About</Typography>
          <TextField
            id="filled-basic"
            variant="filled"
            placeholder="Enter a short bio"
            inputProps={{ style: { background: "#F9EDF5", height: 12 } }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "600px",
            padding: "40px",
          }}
        >
          <div>
            <UpdateIcon />
            <Button
              variant="contained"
              style={{ width: 100, background: "#917EBD" }}
            >
              Update
            </Button>
          </div>
          <div>
            <DeleteForeverIcon />
            <Button
              variant="contained"
              style={{ width: 100, background: "#917EBD" }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Typography fontSize={"32px"} fontWeight={"700"}>
          Certificates And Achievements
        </Typography>
        {myCourses?.map((singleCourse: any) => (
          <div>
            {singleCourse.course_progress === 100 && (
              <Card>
                <img
                  src={singleCourse.course_image}
                  style={{ width: "229px" }}
                />
                <Typography fontSize={18} fontWeight={700}>
                  {singleCourse.course_name}
                </Typography>
                {/* <Link to={"Hello"}></Link> */}
                <div style={{ paddingBottom: "35px" }}>
                  <Button
                    variant="contained"
                    style={{
                      width: "206px",
                      height: "30px",
                      background: "#917EBD",
                      fontSize: "12px",
                    }}
                  >
                    Download Certificate
                  </Button>
                </div>
              </Card>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default LearnerProfile;
