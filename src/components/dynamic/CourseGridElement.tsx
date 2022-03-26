import React from 'react';
import { Link } from 'react-router-dom';
import { CreditsTag } from '../../util/resources';

interface Props{
    course: any;
    width?: string;
    color?: string;
}

const CourseGridElement = ({ course, width='sm:w-1/2 md:w-1/3 lg:w-3/12', color='accent-200' }: Props) => {
    return (
        <div className={`${width} md:p-3`}>
            <Link className={``} to={`/course/${course.course_id}`}>
                <div style={{height:'22rem'}}  className={`bg-${color} rounded-lg w-full shadow-xl relative md:p-4`}>
                    {
                        course.credits ? (<>
                            <img src={CreditsTag.default} alt="Credits" className='absolute z-20 -top-2 -right-2' />
                        </>) : (<></>)
                    }         
                    <div className="relative overflow-y-hidden h-full">
                        {
                            <>
                                <img className="w-full h-32 z-10 relative rounded-t-lg md:rounded-md" loading="lazy" src={course.course_image} alt={course.course_name} />
                                <div className='absolute top-0 w-full h-32 rounded-t-lg md:rounded-md bg-color-100'></div>
                            </>
                        }
                        <h2 className='text-lg px-4 md:px-0 text-slate-900 font-poppins font-black mt-2'>{course.course_name}</h2>
                          <div className='text-sm px-4 md:px-0 my-2 relative overflow-x-hidden overflow-y-hidden'>
                            <p className='text-slate-900'>{course.course_description}</p>
                            <div className={`select-none bg-gradient-to-b from-transparent via-transparent to-${color} w-full h-full absolute inset-0`} />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default CourseGridElement;
