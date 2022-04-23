import { UserType } from "../action-types/index"
import { CourseType, ModuleType, InstructorType, EnrollmentType } from "../action-types/index"

interface FetchUsers {
    type: UserType.FETCH_USERS,
    payload: {}[] | any
}

interface CourseAction {
    type: CourseType.COURSE_ID,
    payload: number
}
interface ModuleAction {
    type: ModuleType.MODULE_ID,
    payload: number
}
interface InstructorAction {
    type: InstructorType.INSTRUCTOR_ID,
    payload: number
}
interface EnrollmentAction {
    type: EnrollmentType.ENROLLMENT_ID,
    payload: number
}

export type UserAction = FetchUsers  ;
export type CourseIDAction = CourseAction  ;
export type ModuleIDAction = ModuleAction  ;
export type InstructorIDAction = InstructorAction  ;
export type EnrollmentIDAction = EnrollmentAction  ;
