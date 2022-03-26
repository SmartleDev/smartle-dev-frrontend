import React from 'react';
import CourseGridElement from './CourseGridElement';
import useMediaQuery from '@mui/material/useMediaQuery'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

interface Props{
    courses: any;
    color?: any;
    elementWidth?: any;
}

const CoursesGrid = ({ courses, color = 'accent-200', elementWidth='sm:w-1/2 md:w-1/3 lg:w-3/12' }: Props) => {

    const isMobile = useMediaQuery('(max-width:1000px)');
    return (
        <div className="mx-auto">
            <div className='md:w-10/12 my-10 mx-auto flex flex-wrap items-stretch justify-center'>
                {
                    !isMobile ? (<>
                        {
                    courses.map((course:any, key:any) => {
                        return (                        
                            <CourseGridElement width={elementWidth} color={color} course={course} key={key} />   
                        );
                    })
                }
                    </>) : (
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={20}
                navigation
                loop={true}
                autoplay={{ delay: 3500 }}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                  },
                  900: {
                    slidesPerView: 3,
                  },
                }}
                className="py-10"
              >
                {
                  courses.map((course:any, key:any) => {
                    return (
                      <SwiperSlide>
                        <div className="flex justify-center">
                            <CourseGridElement width="w-52" course={course} key={key} color={color} />
                        </div>
                      </SwiperSlide>
                    );
                  })
                }
              </Swiper>
            )
          }
            </div>
        </div>
    );
}

export default CoursesGrid;
