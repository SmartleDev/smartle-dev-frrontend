import React from 'react';
import { ListIcon1, ListIcon2, ListIcon3, ListIcon4, ListIcon5 } from '../../../util/resources'
// import { Fade } from 'react-slideshow-image';
// import 'react-slideshow-image/dist/styles.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

const slideImages = [
  '/images/courses/cs.png',
  '/images/courses/dl.png',
  '/images/courses/fl.png',
  '/images/courses/mew.png'
];

const Services = () => {  
  const services = [
    {
      icon: ListIcon1,
      idx: '01',
      text: 'Configure industry leading Learning Management Systems (LMS) for schools and enterprise'
    },
    {
      icon: ListIcon2,
      idx: '02',
      text: 'On premise and cloud deployments'
    },
    {
      icon: ListIcon3,
      idx: '03',
      text: 'Organize and simplify your training and learning process from course enrollment to training completion'
    },
    {
      icon: ListIcon4,
      idx: '04',
      text: 'SCORM complaint  content development.'
    },
    {
      icon: ListIcon5,
      idx: '05',
      text: 'Rich customizable library available for STEM content with level one, two and three interaction model for K-12 students'
    },
  ];

  // const slideProperties = {    
  //   scale: 0.4,
  //   indicators: i => (<div className="indicator">{i + 1}</div>)
  // }
    return (<div className='mb-20 mt-15'>
      <h1 id="services" className="pt-10 text-3xl font-extrabold text-center my-10">Services Offered</h1>
      <div className="flex flex-wrap">
        <div className="w-11/12 md:w-1/2 mx-auto bg-slate-100 py-3 md:py-5 px-3 md:px-5 shadow-xl rounded-3xl">
          <div className="bg-contrastAccent-200 flex justify-center items-center pt-10 pb-6 md:pt-0 md:pb-0 p-2 md:p-0 h-full rounded-3xl">
            <div className="w-4/5 rounded-3xl">
              <div className="">
                <Swiper
                  modules={[Pagination, Autoplay]}
                  spaceBetween={20}
                  slidesPerView={1}
                  pagination={{clickable: true,}}
                  loop={true}
                  autoplay={{ delay: 3500 }}
                  className="pb-6"
                >
                  <SwiperSlide>
                    <img src={slideImages[0]} className='w-full h-full  rounded-lg' alt="" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={slideImages[1]} className='w-full h-full  rounded-lg' alt="" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={slideImages[2]} className='w-full h-full  rounded-lg' alt="" />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img src={slideImages[3]} className='w-full h-full  rounded-lg' alt="" />
                  </SwiperSlide>
                </Swiper>
              </div>
            </div>
          </div>          
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0">
          <div className="md:w-8/12 ml-5 md:ml-20 ">
            {
              services.map((service, idx) => {
                let marginClass = "mb-8";
                if (idx === services.length - 1) marginClass = "mb-0";
                return (
                  <div className={`flex items-center ${marginClass}`} key={idx}>
                    <div className={`w-1/12 scale-110`}>
                      <div className={`relative flex justify-center`}>
                        <div className="text-slate-900 absolute md:top-1/2 md:left-1/2 z-10 md:-translate-x-1/2 md:-translate-y-1/2 md:text-xl font-semibold">{service.idx}</div>
                        <img className='scale-150 md:-translate-y-1' src={service.icon} alt="" />
                      </div>
                    </div>
                    <div className={`ml-6 md:ml-10 w-9/12`}>{service.text}</div>
                  </div>
                )
              })
            }            
          </div>
        </div>
      </div>
  </div>);
}

export default Services;
