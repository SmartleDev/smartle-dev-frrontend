import { UserType } from "../action-types/index"
import { CourseType } from "../action-types/index"

interface FetchUsers {
    type: UserType.FETCH_USERS,
    payload: {}[] | any
}

interface CourseAction {
    type: CourseType.COURSE_ID,
    payload: number
}

export type UserAction = FetchUsers  ;
export type CourseIDAction = CourseAction  ;
