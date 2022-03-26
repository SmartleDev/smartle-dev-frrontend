import React from 'react';
import GradBlobResp from '../components/atom/GradBlobResp';
import GradBlobTRSm from '../components/atom/GradBlobTRSm';
import GradientBlobBL from '../components/atom/GradientBlobBL';
import GradientBlobTR from '../components/atom/GradientBlobTR';
import PopOutCircle from '../components/atom/PopOutCircle';
import { Banner, Contact, Features, FeaturesMobile, Method, OurCourses, Why } from '../components/sections/home';
import { BoyDab as BImg, TopRightGradPng } from '../util/resources';

const Home = () => {  
  return (<>
    <div className="overflow-x-hidden">
      <div className="block md:hidden"><GradBlobResp /></div>
      <Banner/>    
      <OurCourses />  
      <Method />  
      <Features />
      <div className="pt-10" id="why">
        <Why />
      </div>
      <h1 className="text-3xl md:text-5xl text-center mb-10 font-black" id="contactForm">Get in touch with us</h1>
      <div className="pb-20">
        <div className="flex flex-wrap flex-col-reverse md:flex-row w-10/12 mx-auto" >
          <div className="pb-40 md:w-4/12 md:mr-10 flex items-center justify-center"> 
            <div className="hidden md:block">
              <PopOutCircle image={BImg} imageTop="4.7rem" imageLeft="0.2rem" />
            </div>           
          </div>
          <div className="md:w-7/12" >
            <Contact />
          </div>
        </div>
      </div>
      <div className="md:block hidden">
        {/* <GradientBlobTR /> */}
        {/* <GradBlobTRSm /> */}
        {/* <GradientBlobBL /> */}
      </div>
    </div>
  </>);
}

export default Home;
