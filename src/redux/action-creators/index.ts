import { Dispatch } from "redux"
import { UserType, CourseType, ModuleType} from "../action-types"
import { UserAction, CourseIDAction, ModuleIDAction} from "../actions/user"
import * as api from '../api'

export const fetchUsers = () => async(dispatch: Dispatch<UserAction>) => {

    try {
        const {data} = await api.getUsers()

        dispatch({
            type : UserType.FETCH_USERS,
            payload : data
        }) // dispatch is coming form redux-thunk also the aysn (dispatch)
    } catch (error) {
        console.log(error)
    }
  }

  export const fetchCourseID = (course_id: number) => {
    return (dispatch: Dispatch<CourseIDAction>) => {
        dispatch({
            type: CourseType.COURSE_ID,
            payload: course_id
        })
    }
}
  export const fetchModuleID = (module_id: number) => {
    return (dispatch: Dispatch<ModuleIDAction>) => {
        dispatch({
            type: ModuleType.MODULE_ID,
            payload: module_id
        })
    }
}