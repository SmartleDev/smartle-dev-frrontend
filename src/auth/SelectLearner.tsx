import React, {useState} from "react";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Header from "../components/organisms/Header";
import Footer from "../components/organisms/Footer";
import { HashLink as Link } from "react-router-hash-link";
import "./auth.css";
import jwt_decode from "jwt-decode";

function SelectLearner() {

  const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-details') || '{}'))

  console.log(jwt_decode(user))
  
  return (
    <>
      <Header />

      <div className="select-learner">
        <div>
          <h1 className="font-black text-4xl">Please Select Learner!!</h1>
          <p className="text-stone-600">
            Add a New Learner, if Profile not Found
          </p>
        </div>
        <div className="learner-overview">
          <div className="learner-choose">
            <PersonIcon
              className="learner-icon"
              style={{
                color: "#917EBD",
                backgroundColor: "#F9EDF5",
                padding: "20px",
                fontSize: "150px",
                borderRadius: "50%",
              }}
            />
            <p className="learner-name md:text-left text-xl md:text-2xl mt-4 md:mt-8 font-bold text-stone-700">
              Adeeb Shah
            </p>
          </div>
          <div className="learner-choose">
            <PersonIcon
              className="learner-icon"
              style={{
                color: "#917EBD",
                backgroundColor: "#F9EDF5",
                padding: "20px",
                fontSize: "150px",
                borderRadius: "50%",
              }}
            />
            <p className="learner-name md:text-left text-xl md:text-2xl mt-4 md:mt-8 font-bold text-stone-700">
              Adeeb Shah
            </p>
          </div>
          <div className="learner-choose">
            <PersonIcon
              className="learner-icon"
              style={{
                color: "#917EBD",
                backgroundColor: "#F9EDF5",
                padding: "20px",
                fontSize: "150px",
                borderRadius: "50%",
              }}
            />
            <p className="learner-name md:text-left text-xl md:text-2xl mt-4 md:mt-8 font-bold text-stone-700">
              Adeeb Shah
            </p>
          </div>
        </div>
        <hr />
        <div className="learner-choose" style={{ marginTop: "30px" }}>
          <Link to="/registerchild">
            <AddIcon
              className="learner-icon"
              style={{
                color: "#C5B6D9",
                backgroundColor: "#F9EDF5",
                padding: "20px",
                fontSize: "150px",
                borderRadius: "50%",
              }}
            />
          </Link>
          <p
            style={{ marginLeft: "20px" }}
            className="learner-name md:text-left text-xl md:text-2xl mt-4 md:mt-8 font-bold text-stone-700"
          >
            Add Learner
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SelectLearner;
