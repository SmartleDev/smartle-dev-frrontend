import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import Socials from '../molecules/Socials';
import { LogoAlt } from "../../util/resources";

const Footer = ()=> {
  return (
    <footer className='bg-stone-800 text-white'>
      <div className="w-10/12 mx-auto pt-8 pb-4">
        <div className="mb-10">          
          <Link to='/'>
            <img className="w-32" src={LogoAlt.default} alt="" />
          </Link>
        </div>
        <div className="flex flex-wrap gap-5">
          <div className="w-full mt-7 md:mt-0 md:w-2/12">
            <Stack spacing={2}>
              <div className="text-lg font-black md:font-bold">
                  Company
              </div>
              <Link to={'/#why'} className="font-medium">About Us</Link>              
              <Link to={'/enterprise'} className="font-medium">Education</Link>              
              <Link to={'/#contactForm'} className="font-medium">Teach at Smartle</Link>              
            </Stack>
          </div>
          <div className="w-full mt-7 md:mt-0 md:w-2/12">
            <Stack spacing={2}>
              <div className="text-lg font-black md:font-bold">
                  Legal
              </div>
              <Link to={'/privacy-policy'} className="font-medium">Privacy Policy</Link>              
              <Link to={'/terms-of-service'} className="font-medium">Terms of Service</Link>              
            </Stack>
          </div>
          <div className="w-full mt-7 md:mt-0 md:w-2/12">
            <Stack spacing={2}>
              <div className="text-lg font-black md:font-bold">
                  Support
              </div>
              {/* <Link to={'/'} className="font-medium">FAQs</Link>               */}
              <Link to={'/#contactForm'} className="font-medium">Contact us</Link>
            </Stack>
          </div>
        </div>
        <div className='mt-12 mb-4 h-px w-full bg-zinc-500' ></div>
        <div className="flex flex-wrap md:justify-between justify-center">
          <div className="text-center mb-4 md:mb-0">&copy; {new Date().getFullYear() ?? '0000'} - All rights reserved</div>
          <div className="">
            <Socials />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
