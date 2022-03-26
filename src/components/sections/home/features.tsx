import React from "react";
import {
  Feature,
  FeatureMobile,
  FeatureOutline,
  Book,
  Boy,
  Star,
  Calendar,
  Rocket,
} from "../../../util/resources";
import FeatureBox from "../../atom/FeatureBox";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Features = () => {

  const homeFeatureList: any = [
    {
      pos: 'md:md:left-8 md:top-20 md:translate-x-0 md:translate-y-0',
      img: Book,
      title: `Hybrid<br />Learning`,
      desc: `Choose courses as Hybrid ( Self-paced and Coach Led) or Completely Self-paced`
    },
    {
      pos: 'md:left-1/4 md:top-48 md:-translate-x-10 md:translate-y-0',
      img: Boy,
      title: `International<br />Coaches`,
      desc: `Instructors and Coaches from around the world to share a global perspective`
    },
    {
      pos: 'md:left-1/2 md:top-1/2 md:-translate-y-16 md:-translate-x-1/2',
      img: Star,
      title: `Earn Completion Credits`,
      desc: `Earn credits for specific courses which can be combined to earn a Micro-Masters Certificate`
    },   
    {
      pos: 'md:right-1/4 md:top-48 md:translate-x-10 md:translate-y-0',
      img: Calendar,
      title: `Digital<br />Certification`,
      desc: `Earn a digital course competition certificate for successful completion of each course`
    },  
    {
      pos: 'md:right-8 md:top-20 md:translate-x-0 md:translate-y-0',
      img: Rocket,
      title: `Immersive<br />Content`,
      desc: `Story based learning delivered through a play and learn platform.`
    },
  ];
  return (
    <div>
      <div        
        className="featuresContainer mt-32 z-10 overflow-y-hidden relative border-3"
      >
        <h1 className="text-3xl md:text-5xl font-black text-center">Features of Smartle</h1>
        <img className="hidden sm:block absolute z-20" src={Feature.default} alt="" />
        <img className="w-full absolute translate-y-16 pointer-events-none block sm:hidden" src={FeatureMobile.default} alt="" />
        <img
          className="hidden sm:block absolute z-0 -translate-y-14"
          src={FeatureOutline.default}
          alt=""
        />
        <div className="block relative z-30 lg:hidden">
          <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={20}
                pagination={{clickable: true}}
                loop={true}
                autoplay={{ delay: 3500 }}
                // slidesPerView={1}
                className="pt-7 pb-12 mb-3"
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                  },
                  900: {
                    slidesPerView: 3,
                  },
                }}
          >
            {
            homeFeatureList.map((f:any, featureidx:any) => {
              return (
                <SwiperSlide key={featureidx}>
                  <div className="h-80 w-full flex justify-center">
                    <FeatureBox
                      pos={f.pos}
                      img={f.img}
                      title={f.title}
                      desc={f.desc}
                    />
                  </div>
                </SwiperSlide>
              );
            })
          }
        </Swiper>
        </div>
        <div className="lg:block hidden">
          {
            homeFeatureList.map((f:any, featureidx:any) => {
              return (
                <FeatureBox
                      key={featureidx}
                      pos={f.pos}
                      img={f.img}
                      title={f.title}
                      desc={f.desc}
                    />
              );
            })
          }
        </div> 
      </div>
    </div>
  );
};

export default Features;


