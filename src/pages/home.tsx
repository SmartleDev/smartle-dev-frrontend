import React from 'react';
import GradBlobResp from '../components/atom/GradBlobResp';
import GradBlobTRSm from '../components/atom/GradBlobTRSm';
import GradientBlobBL from '../components/atom/GradientBlobBL';
import GradientBlobTR from '../components/atom/GradientBlobTR';
import PopOutCircleHome from '../components/atom/PopOutCircle';
import { Banner, Contact, Features, FeaturesMobile, Method, OurCourses, Why } from '../components/sections/home';
import { BoyDab as BImg, TopRightGradPng } from '../util/resources';
import MthodEhanced from '../components/sections/home/MthodEhanced'
import FeaturesEnhanced from '../components/sections/home/FeaturesEnhanced'
import ContactEnhanced from '../components/sections/home/ContactEnhanced'

const Home = () => {  
  return (<>
    <div className="overflow-x-hidden">
      <Banner/>    
      <OurCourses />  
      {/* <Method />   */}
      <div className='m-10 md:m-20'><MthodEhanced/></div>
      {/* <Features /> */}
      <div style={{margin:'80px'}}><FeaturesEnhanced /></div>
      <div className="pt-10" id="why">
        <Why />
      </div>
      <div className="pb-20">
        <div className="flex flex-wrap flex-col-reverse md:flex-row w-10/12 mx-auto" >
          <div className="pb-40 md:w-4/12 md:mr-10 flex items-center justify-center"> 
            <div className="hidden md:block">
              <PopOutCircleHome image={BImg} imageTop="4.7rem" imageLeft="0.2rem" />
            </div>           
          </div>
          <div className="md:w-7/12" >
            {/* <Contact /> */}
            <ContactEnhanced/>
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
