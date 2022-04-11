// import { base } from '../api';
import { isNull } from '../helpers';
import { courseList, instructorList } from './data';
import API from '../../redux/api/api'


export const videoBase = "https://www.youtube.com/embed/";


export async function getCourses(param?: any, value?: any, compare: any = "=", ent:boolean=false) {

    let cl : any = [];
    let json : any = [];
 await API.get('coursesonhome')
  .then((res)=>{
   json = res.data;
  cl = json;
  }).catch((err) => {
    console.log(err)
  })

  

  if (param && value) {
    if (compare === "=") cl = cl.filter((cli: any) => cli[param] == value);
    if (compare === ">") cl = cl.filter((cli: any) => cli[param] > value);
    if (compare === "<") cl = cl.filter((cli: any) => cli[param] < value);
    if (compare === ">=") cl = cl.filter((cli: any) => cli[param] >= value);
    if (compare === "<=") cl = cl.filter((cli: any) => cli[param] <= value);
  }
  let finalCourses:any = [];
  cl.forEach((lclCourse: any, lclIdx:any) => {
    if ('notNormalCourses' in lclCourse && ent==false) {
      cl.splice(lclIdx, 0); return;
    } else {
      lclCourse.instructor = getInstructor(1)
    }
    finalCourses.push(lclCourse);
  })
  const courses: any = json;
  return courses;
}

export function getCourse(id: any, type: any = "slug", ent: boolean = false) {  
  let lclCourse = [];
  console.log(ent);
  if (ent == false) {
    lclCourse = courseList.find((element: any) => element[type] === id);
    if (!lclCourse) return; 
    lclCourse.instructor = getInstructor(1)
  } else {
    lclCourse = courseList.filter((element: any) => element[type] === id);
  }
  const course: any = lclCourse;
  return course;
}

export function getInstructors() {
  let il = instructorList;
  return il;
}

export function getInstructor(id: any) {
  let lclinstructor = instructorList.find((element) => element.id === id);
  if (!lclinstructor) return;
  return lclinstructor;
}
