import React, {useState, useEffect} from "react";
import CourseGridElement from '../dynamic/CourseGridElement';
import useMediaQuery from '@mui/material/useMediaQuery'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import API from '../../redux/api/api';
import 'swiper/css';
import 'swiper/css/navigation';
import './courseOnHome.css'

interface Props{
    courses: any;
    color?: any;
    elementWidth?: any;
}




const CoursesGrid = ({ courses, color = 'accent-200', elementWidth='sm:w-1/2 md:w-1/3 lg:w-3/12' }: Props) => {

  const [subjects, setSubjects] = useState([]);
  const isMobile = useMediaQuery('(max-width:1400px)');

  useEffect(() => {
    requestSubjects();
  }, []);
    
  async function requestSubjects() {
    API.get("coursesonhome/")
    .then((res) => {
      setSubjects(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

    return (
        <div className="mx-auto">
            <div className='md:w-10/12 my-10 mx-auto flex flex-wrap items-stretch justify-center'>
                {
                    !isMobile ? (<>
                        {
                    subjects?.map((course:any, key:any) => {
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
                  1150: {
                    slidesPerView: 2,
                  },
                }}
                className="py-10"
              >
                {
                  subjects ? subjects.map((course:any, key:any) => {
                    return (
                      <SwiperSlide>
                        <div className="flex justify-center" id = "mobile_view_cards">
                            <CourseGridElement width="w-52" course={course} key={key} color={color} />
                        </div>
                      </SwiperSlide>
                    );
                  }) : null
                }
              </Swiper>
            )
          }
            </div>
        </div>
    );
}

export default CoursesGrid;
