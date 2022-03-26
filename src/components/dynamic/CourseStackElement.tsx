import React from 'react';
import { Link } from 'react-router-dom';
import { isNull } from '../../util/helpers';
import { Clock, Card } from '../../util/resources';

interface Props{
    course: any;    
}

const CourseStackElement = ({ course }: Props) => {
    console.log(course + " testtttt");
    return (<>
        {
            !isNull(course) && (
            <Link to={`/course/${course.course_id}`} className="mx-5 md:mx-0 my-10 relative text-slate-900 bg-accent-200 p-5 shadow-xl rounded-lg flex flex-wrap ">                
                    <div className="w-full md:w-1/3">
                    {
                        course.course_image ? (<>
                            <img className="w-full rounded-lg" src={course.course_image} alt={course.course_name} />                            
                        </>) : (
                            <div className='w-full h-40 rounded-lg bg-color-100'></div>
                        )
                    }
                    </div>
                    <div className="w-full md:w-2/3 md:pl-7 mt-5 md:mt-0">
                        <div className="font-semibold mb-1">Age: {course.course_age} Yrs</div>
                        <div className="font-bold text-3xl mb-2">{course.course_name}</div>
                        <div className="mb-2">{course.course_description}</div>
                        <div className="md:w-9/12 mb-6 flex items-center">
                            <img className="w-10 h-10 mr-5" src={Clock.default} alt="" />
                            <div className="">Duration: <span className=''>{course.course_duration}</span></div>
                        </div>
                        {/* <div className="mb-5 md:mb-10 flex items-center">
                            <img className="w-10 h-10 mr-5" src={Card.default} alt="" />            
                            <div className="">Instructor/Coach: <span>{course.instructor.name}</span></div>
                        </div> */}
                    </div>
                    <div className="cost md:absolute bottom-7 right-10  ">
                        <p className='text-sm'>Cost:</p>
                        <p className='text-3xl text-color-400 font-black'>
                            <span className='text-4xl'>{course.course_cost}</span>
                            <span className='text-2xl'>$</span>            
                        </p>
                    </div>                
            </Link>       
            )
        }        
    </>);
}

export default CourseStackElement;
