import React from 'react';
import GradBlobBlueTR from '../components/atom/GradBlobBlueTR';
import GradBlobRespBlue from '../components/atom/GradBlobRespBlue';
import { Banner, Solutions, Services, Approach, SampleWorks, Contact } from '../components/sections/enterprise';

const Enterprise = () => {  
  return (<div className='selection:bg-contrast-400 selection:text-white'>
    {/* <div>ENTERPRISE</div> */}

    <Banner />
    <Solutions />
    <Services />
    <Approach />
    <SampleWorks />
    <Contact />
  </div>);
}

export default Enterprise;
