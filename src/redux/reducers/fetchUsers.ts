import { UserType, CourseType, ModuleType, InstructorType } from "../action-types/index"
import { UserAction } from "../actions/user"
import { CourseIDAction, ModuleIDAction, InstructorIDAction } from "../actions/user"


export const fetchUsers = (users: null | {}[] = null, action: UserAction): {}[] | any => {
    switch (action.type) {
        
        case UserType.FETCH_USERS:
			
            return action.payload;

        default: // need this for default case
        return users 
    }
}
export const courseIDFetch = (course_id: number = 0, action: CourseIDAction): number => {
    switch (action.type){
        case CourseType.COURSE_ID:
            return action.payload;
        default:
            return course_id
    }
}
export const moduleIDFetch = (module_id: number = 0, action: ModuleIDAction): number => {
    switch (action.type){
        case ModuleType.MODULE_ID:
            return action.payload;
        default:
            return module_id
    }
}
export const InstructorIDFetch = (instructor_id: number = 0, action: InstructorIDAction): number => {
    switch (action.type){
        case InstructorType.INSTRUCTOR_ID:
            return action.payload;
        default:
            return instructor_id
    }
}