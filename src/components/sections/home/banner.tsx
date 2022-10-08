import { Button } from '@mui/material';
import React from 'react';
import PopOutCircle from '../../atom/PopOutCircle';
import { HomeBannerGirl1 as BImg} from '../../../util/resources';
import { Link } from 'react-router-dom';
import GradientBlobTR from '../../atom/GradientBlobTR';
import useMediaQuery from '@mui/material/useMediaQuery'

const Banner = () => {
  let glass = {'background': 'rgba( 255, 255, 255, 0.3 )','backdropFilter': 'blur( 5px )','WebkitBackdropFilter': 'blur( 5px )','borderRadius': '10px','borderRight': '.5px solid rgba( 255, 255, 255, 0.28 )','borderBottom': '.5px solid rgba( 255, 255, 255, 0.28 )',} as React.CSSProperties;
  const isMobile = useMediaQuery('(max-width:770px)');
  return (<>
    <div className="md:z-auto flex flex-wrap flex-col-reverse md:flex-row mb-20 md:mb-40 md:px-32 md:pt relative justify-spaced">  
      <div className="md:mt-0 md:mb-0 w-full md:w-1/2 h-full flex flex-col px-4 md:px-0 items-center justify-center pt-10">
        <div className="w-full">
          <h2 className='text-bold text-3xl md:text-5xl font-black font-poppins text-center md:text-left  w-9/12 m-auto md:w-full md:mr-0 md:ml-0'>
            Smart Skills for the<br className='hidden md:block' /> 21st Century Learner
          </h2>
          <p className='text-center md:text-left text-lg mt-1 md:mt-3 w-9/12 m-auto md:w-full md:text-xl'>
            Fun, social, and safe learning<br className='hidden md:block' /> experiences for ages 8 to14
          </p>
          <div className="w-full text-center md:text-left">
          <Link to='/courses' className=''>
            <Button className='sm:text-sm mt-12  rounded-md md:rounded-md shadow-xl font-bold py-3 px-10 md:w-auto md:px-16 lg:px-24 h-9 text-white bg-color-400 '>
              Explore Courses
            </Button>
            </Link>
          </div>
        </div>
      </div>  
      {isMobile ? <div className="lg:hidden" style={{textAlign: 'center', justifyContent: 'center', margin:'auto', width:'250px'}}>
          <img style = {{borderRadius: '300px', background:'#F9EDF5'}} src={BImg} alt=""/>
        </div> :
      <div className="select-none w-full md:w-1/2 h-full relative">
        <div >
          <img style = {{borderRadius: '100px', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}} src={BImg} alt=""/>
        </div>
        {/* <img src={Dog} alt="Dogo" className='right-0 absolute z-50 h-24 -bottom-28 md:bottom-16 scale-90 md:scale-100' /> */}
      
      </div>} 
    </div>
  </>);
}

export default Banner;