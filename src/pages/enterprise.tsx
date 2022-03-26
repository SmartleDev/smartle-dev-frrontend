import React from 'react';
import GradBlobBlueTR from '../components/atom/GradBlobBlueTR';
import GradBlobRespBlue from '../components/atom/GradBlobRespBlue';
import { Banner, Solutions, Services, Approach, SampleWorks, Contact } from '../components/sections/enterprise';

const Enterprise = () => {  
  return (<div className='selection:bg-contrast-400 selection:text-white'>
    {/* <div>ENTERPRISE</div> */}
    <div className="md:hidden block"><GradBlobRespBlue /></div>
    <div className="hidden md:block"><GradBlobBlueTR /></div>
    <Banner />
    <Solutions />
    <Services />
    <Approach />
    <SampleWorks />
    <Contact />
  </div>);
}

export default Enterprise;
