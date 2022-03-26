import { Button } from '@mui/material';
import React from 'react';
import PopOutCircle from '../../atom/PopOutCircle';
import { EnterpriseBannerGirl as BImg } from '../../../util/resources';
import { HashLink as Link } from 'react-router-hash-link';

const Banner = () => {
 
  return (
    <div className="flex flex-wrap flex-col-reverse md:flex-row mb-40 md:px-32 pt-12 relative">  
      <div className="md:w-1/2 h-full pt-20 flex justify-end">
        <div className="">
          <h2 className='text-center md:text-left text-bold text-2xl md:text-5xl font-black font-poppins'>Delivering impactful<br />learning solutions</h2>
          <p className='text-center md:text-xl px-10 md:px-0 md:w-10/12 md:text-left mt-8'>Offering world class e-learning content and solutions compatible with industry leading learning management systems</p>
          <div className="w-full text-center md:text-left">
            <Link to='/enterprise#services' className=''>
              <Button className='mt-12 w-9/12 mx-auto md:mx-0 rounded-md shadow-xl font-bold py-3 md:px-24  h-9 text-white bg-contrast-400'>
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </div>  
      <div className="select-none md:w-1/2 h-full relative flex md:block justify-center">
        <div className="hidden md:block">
          <PopOutCircle image={BImg}
            circleBg='bg-contrastAccent-200' imageTop='14px' imageLeft='10px' borderColor='blue' imageSize="4" />
        </div>
        <div className="block md:hidden ">
          <PopOutCircle image={BImg} circleBg='bg-contrastAccent-200' imagePos='top' imageTop='-18px' imageLeft='0px' imageOverflow='hiden' borderColor='blue' imageSize="2.5" />
        </div>
      </div>
    </div>
  );
}

export default Banner;