import React, {useEffect, useState} from 'react';
import {Box, Button} from '@mui/material';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import { WhiteLogo } from "../util/resources";
import useMediaQuery from '@mui/material/useMediaQuery'
import { useLocation } from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';
// import './LoggedSideDrawer.css';
import { styled } from '@mui/material/styles';
import HomePage from '../LoggedInUser/HomePage';
import Footer from '../components/organisms/Footer';
import Header from "./Header";



const MyCourses = (props:any) => {
    const location = useLocation();
    const [contactColor, setContactColor] = useState('color');
    const [anchor, setAnchor] = useState<boolean>(false);
    const [linkAdd, setLinkAdd] = useState<string>('/#contactForm');
    
    useEffect(() => {
        if (location.pathname === '/enterprise' || 
            location.pathname === '/course/mathematics' ||             
            location.pathname === '/course/biology' ||             
            location.pathname === '/course/chemistry' ||             
            location.pathname === '/course/physics'            
        ) {
            setContactColor('contrast');
            setLinkAdd('/enterprise#contactForm')
        }
        else {
            setContactColor('color');
            setLinkAdd('/#contactForm')
        }
    }, [location]);

    return (
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 0, mt:-6 }}
        >
          <Toolbar />
        <Header />
          My Courses
          <Footer />
        </Box>
  
      </Box>
    );
  }
  

export default MyCourses;