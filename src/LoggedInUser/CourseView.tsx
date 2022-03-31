import React, {useEffect, useState} from 'react';
import { RootState } from '../redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import API from "../redux/api/api";
import { Link, useNavigate, useParams } from 'react-router-dom';

const CourseView = () => {

    const { id } = useParams<{ id: string }>();
    interface courseViewer {
        course_id: number;
        course_name: string;
        course_age: string;
        course_type: string;
        course_cost:string;
        course_description: string;
        course_learningobjective: string;
        course_image: string;
        course_numberofclasses: number;
        course_duration: number;
        course_status: string | null;
    }
    
      interface moduleViewer {
        module_id: number;
        module_name: string;
        module_duration ?: string | null;
        module_description: string;
        module_objective:string;
    }
    
    
      const course_id = useSelector((state: RootState) => state.courseIDFetch)
      console.log(course_id)

      const [courseView, setCourseView] = useState<courseViewer[]>([]);
      console.log(courseView)
     const [moduleView, setModuleView] = useState<moduleViewer[]>([]);
     console.log(moduleView)

    useEffect(() => {

        API.get<courseViewer[]>('getcourseview/'+course_id)
        .then((res)=>{
          setCourseView(res.data)
        }).catch((err) => {
          console.log(err)
        })
    
        API.get<moduleViewer[]>('/getmoduleforcourse/'+course_id)
        .then((res)=>{
          setModuleView(res.data)
        }).catch((err) => {
          console.log(err)
        })
    
      }, [course_id, id])

    return (
        <div>
            Hello World!
            {/* <div className='line'>
            </div> */}
        </div>
    );
};

export default CourseView;