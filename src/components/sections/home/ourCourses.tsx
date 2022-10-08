import React, { useEffect, useState } from 'react';
import CoursesGrid from '../../dynamic/CoursesGrid';
import { getCourses } from '../../../util/api';
import Alert from '@mui/material/Alert';
import useMediaQuery from '@mui/material/useMediaQuery'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import CourseGridElement from '../../molecules/CourseGridElement';

const OurCourses = () => {
  const [courses, setCourses] = useState<any>(undefined);
  console.log(courses)
  const [fail, setFail] = useState<any>(undefined);
  const isMobile = useMediaQuery('(max-width:1000px)');

    useEffect(() => {
    ( () => {
			try {
        var data = getCourses("home", true, "=");
				setCourses(data);				
			} catch (e: any) {
				setFail(e.message);
			}
		})();
    }, [])
  
  return (
    <div className=''>
      {
        courses && (<div className='relative z-30  md:pt-10'>
          <h2 className='font-black text-3xl md:text-5xl text-center'>Our Courses</h2>
          <p className='px-5 text-md md:text-xl text-center md:w-8/12 mx-auto mt-4 md:mt-8 md:mb-15'>Unique global curriculum to helps young children acquire highly practical Life Skills. Content aligned to P21 framework (United States of America), Skillizen Olympiad Foundation (Singapore), National Education Policy 2021 (India)</p>
          <CoursesGrid courses={courses} />
        </div>)
      }      
      {fail && <Alert severity="error">Something went wrong! ({fail})</Alert>}
    </div>
  );
}

export default OurCourses;
