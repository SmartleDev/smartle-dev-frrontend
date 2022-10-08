import React from "react";
import {
  Approaches,
  ApproachesOutlined,
  Folder,
  Chat,
  Zoom,
  Flash,
  Camera,
  FeatureMobileBlue,
} from "../../../util/resources";
import FeatureBox from "../../atom/FeatureBox";



import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Approach = () => {

    const approachList: any = [
    {
      color:"bg-contrastAccent-200",
      pos: 'md:md:left-8 md:top-20 md:translate-x-0 md:translate-y-0 pt-3',
      img: Chat,
      title: `Need<br /> Analysis`,
      desc: `Training, Assessment and Certification need analysis`
    },
    {
      color:"bg-contrastAccent-200",
      pos: 'md:left-1/4 md:top-48 md:-translate-x-10 md:translate-y-0 pt-3',
      img: Zoom,
      title: `Course<br /> Definition`,
      desc: `Gather all relevant materials for the project`
    },
    {
      color:"bg-contrastAccent-200",
      pos: 'md:left-1/2 md:top-1/2 md:-translate-y-16 md:-translate-x-1/2 pt-3',
      img: Camera,
      title: `Design and<br /> Development`,
      desc: `Course structuring and media creation`
    },   
    {
      color:"bg-contrastAccent-200",
      pos: 'md:right-1/4 md:top-48 md:translate-x-10 md:translate-y-0 pt-3',
      img: Flash,
      title: `Technology<br /> Integration`,
      desc: `Deployment and integration with corporate systems`
    },  
    {
      color:"bg-contrastAccent-200",
      pos: 'md:right-8 md:top-20 md:translate-x-0 md:translate-y-0 pt-3',
      img: Folder,
      title: `Delivery`,
      desc: `Learning, administration, change management and hosting.`
    },
  ];

  return (
    <div>
      <h1 className="text-4xl md:text-3xl pt-10 font-black text-center">Our Approach</h1>
      <div   
        style={{ height: "40rem" }}
        className="overflow-y-hidden pt-5  relative border-3"
      >
      <p className="md:text-xl text-center mb-3">We use a collaborative agile approach to deliver outcomes ensuring quick efficient releases</p>
        <img className="hidden sm:block absolute z-20" src={Approaches.default} alt="" />
        <img className="sm:hidden block absolute z-20 translate-y-16 pointer-events-none w-full" src={FeatureMobileBlue.default} alt="" />
        <img
          className="hidden sm:block absolute z-0 -translate-y-14"
          src={ApproachesOutlined.default}
          alt=""
        />        
        <div className="md:block hidden">{
            approachList.map((f:any, featureidx:any) => {
              return (
                <FeatureBox
                  color={f.color}
                  pos={f.pos}
                  img={f.img}
                  title={f.title}
                  desc={f.desc}
                  key={featureidx}
                />
              );
            })
          }</div>
        <div className="block relative z-30  md:hidden">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={20}
              pagination={{clickable: true}}
              loop={true}
              autoplay={{ delay: 3500 }}
              slidesPerView={1}
              className="pt-3 pb-16 md:pb-8 mb-3"
            >
            {
              approachList.map((f:any, featureidx:any) => {
                return (
                  <SwiperSlide key={featureidx}>
                    <div className="h-80 w-full flex justify-center">
                      <FeatureBox
                        color={f.color}
                        pos={f.pos}
                        img={f.img}
                        title={f.title}
                        desc={f.desc}
                        size="h-80 w-60 md:h-72 md:w-52"
                      />
                    </div>
                  </SwiperSlide>
                );
              })
            }
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Approach;
