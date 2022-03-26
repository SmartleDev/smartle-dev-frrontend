import { combineReducers } from "redux";
import {fetchUsers, courseIDFetch} from "./fetchUsers"


const reducers = combineReducers({
    fetchUsers,
    courseIDFetch
})

export default reducers

export type RootState = ReturnType<typeof reducers>