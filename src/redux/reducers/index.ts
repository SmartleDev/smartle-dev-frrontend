import { combineReducers } from "redux";
import {
  fetchUsers,
  courseIDFetch,
  moduleIDFetch,
  InstructorIDFetch,
  EnrollmentIDFetch,
  TopicIDFetch
} from "./fetchUsers";

const reducers = combineReducers({
  fetchUsers,
  courseIDFetch,
  moduleIDFetch,
  InstructorIDFetch,
  EnrollmentIDFetch,
  TopicIDFetch
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
