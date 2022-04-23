import { combineReducers } from "redux";
import {
  fetchUsers,
  courseIDFetch,
  moduleIDFetch,
  InstructorIDFetch,
  EnrollmentIDFetch,
} from "./fetchUsers";

const reducers = combineReducers({
  fetchUsers,
  courseIDFetch,
  moduleIDFetch,
  InstructorIDFetch,
  EnrollmentIDFetch,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
