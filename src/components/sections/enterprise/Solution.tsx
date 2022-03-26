import React from 'react';
import { Star2, File, Bookmark, Settings } from '../../../util/resources';
import useMediaQuery from '@mui/material/useMediaQuery'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

const Solution = () => {
    const solns = [
        {
            icon: Settings.default,
            title: 'Customization',
            desc:'Engaging look and feel, and themes matching your school’s identity',
        },
        {
            icon: Star2.default,
            title: 'Interactive Design',
            desc:'Allowing learner to access content in phones and Tablets',
        },
        {
            icon: Bookmark.default,
            title: 'Scoreboards',
            desc:'Allows stakeholders to define, measure and analyze the learning progress',
        },
        {
            icon: File.default,
            title: 'Social learning Features',
            desc:'Enabling commenting, discussions and blogs in the LMS platform',
        },
    ];
    const isMobile = useMediaQuery('(max-width:1000px)');
    return (<div className='md:w-10/12 relative z-20 mx-auto my-10'>
        <h1 className="text-3xl font-extrabold text-center mb-14">Solution Capabilities</h1>
        {
            !isMobile ? (<div className="flex flex-wrap justify-between">
            {
                solns.map((soln, solnIdx) => {
                    return (
                        <div className="w-3/12" key={solnIdx}>
                            <div className="bg-contrastAccent-200 w-3/4 mx-auto h-28 rounded-xl shadow-md flex justify-center items-center">
                                <img src={soln.icon} alt="" className='w-20' />
                            </div>
                            <div className="text-center text-2xl mt-5">{soln.title}</div>
                            <div className="text-center mx-auto w-9/12 text-lg mt-5">{soln.desc}</div>
                        </div>
                    )
                })
            }            
            </div>) : (
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
                className="py-10 px-6"
              >
               {
                solns.map((soln, solnIdx) => {
                    return (
                         <SwiperSlide>
                            <div className="w-full" key={solnIdx}>
                                <div className="bg-contrastAccent-200 w-3/4 mx-auto h-28 rounded-xl shadow-md flex justify-center items-center">
                                    <img src={soln.icon} alt="" className='w-20' />
                                </div>
                                <div className="text-center text-lg md:text-2xl mt-5">{soln.title}</div>
                                <div className="text-center mx-auto w-9/12 md:text-lg mt-5">{soln.desc}</div>
                            </div>
                        </SwiperSlide>
                    )
                })
            }
              </Swiper>
        )
        }
  </div>);
}

export default Solution;
