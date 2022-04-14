import { combineReducers } from "redux";
import {
  fetchUsers,
  courseIDFetch,
  moduleIDFetch,
  InstructorIDFetch,
} from "./fetchUsers";

const reducers = combineReducers({
  fetchUsers,
  courseIDFetch,
  moduleIDFetch,
  InstructorIDFetch,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
