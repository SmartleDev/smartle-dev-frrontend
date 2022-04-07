import { combineReducers } from "redux";
import {fetchUsers, courseIDFetch, moduleIDFetch} from "./fetchUsers"


const reducers = combineReducers({
    fetchUsers,
    courseIDFetch,
    moduleIDFetch
})

export default reducers

export type RootState = ReturnType<typeof reducers>