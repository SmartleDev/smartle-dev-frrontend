import Button from '@mui/material/Button';
import {Stack, Grid} from '@mui/material';
import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import Socials from '../molecules/Socials';
import { smartlewhite1, smartlelogo1 } from "../../util/resources";
import useMediaQuery from '@mui/material/useMediaQuery';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box } from '@mui/system';

const Footer = ()=> {
  const isMobile = useMediaQuery('(max-width:767px)');
  return (
    <footer className='bg-stone-800 text-white'>
      <div className="w-11/12 md:w-10/12 mx-auto pt-8 pb-4">
        {isMobile && 
          <div>
                       <img className='w-32' src={smartlewhite1} alt="" />
            <Grid container spacing={2}>
              <Grid item xs={5}>
   
                <div className="w-full mt-7 md:mt-0 md:w-3/12 lg:w-2/12">
                <Stack spacing={2}>
                  <div className="text-md font-black md:font-bold">
                      Company
                  </div>
                  <Link to={'/#why'} className="text-sm">About Us</Link>              
                  <Link to={'/enterprise'} className="text-sm">Education</Link>              
                  <Link to={'/#contactForm'} className="text-sm">Teach at Smartle</Link>              
                </Stack>
              </div>
              <div className="w-full mt-7 md:mt-0 md:w-3/12 lg:w-2/12">
                <Stack spacing={2}>
                  <div className="text-md font-black md:font-bold">
                      Legal
                  </div>
                  <Link to={'/privacy-policy'} className="text-sm">Privacy Policy</Link>              
                  <Link to={'/terms-of-service'} className="text-sm">Terms of Service</Link>              
                </Stack>
              </div>
              </Grid>
              <Grid item xs={4}>
                <div className="w-full mt-7 md:mt-0 md:w-2/12">
                <Stack spacing={2}>
                  <div className="text-md font-black md:font-bold">
                      Support
                  </div>
                  {/* <Link to={'/'} className="font-medium">FAQs</Link>               */}
                  <Link to={'/#contactForm'} className="text-sm">Contact us</Link>
                </Stack>
              </div>
              </Grid>
              <Grid item xs={3} sx={{textAlign:'right'}}>
                <Box mt={5}>
                  <InstagramIcon />
                </Box>
                <Box mt={5}>
                  <LinkedInIcon />  
                </Box>
                <Box style={{marginTop:'120px'}}>
                  <Link to="/">
                          
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </div>
        }
        {!isMobile && <><div className="mb-10">          
          <Link to='/'>
            <img className="w-40" src={smartlewhite1} alt="" />
          </Link>
        </div> 
          <div className="flex flex-wrap gap-5 w-1/2 md:w-full">
            <div className="w-full mt-7 md:mt-0 md:w-3/12 lg:w-2/12">
              <Stack spacing={2}>
                <div className="text-lg font-black md:font-bold">
                    Company
                </div>
                <Link to={'/#why'} className="font-medium">About Us</Link>              
                <Link to={'/enterprise'} className="font-medium">Education</Link>              
                <Link to={'/#contactForm'} className="font-medium">Teach at Smartle</Link>              
              </Stack>
            </div>
            <div className="w-full mt-7 md:mt-0 md:w-3/12 lg:w-2/12">
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
          </div> </> }
        <div className='mt-12 mb-4 h-px w-full bg-zinc-500' ></div>
        <div className="flex flex-wrap justify-between">
          <div className="text-center mb-4 md:mb-0">&copy; {new Date().getFullYear() ?? '0000'} - All rights reserved</div>
          <div className="ml-3">
            <Socials />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
