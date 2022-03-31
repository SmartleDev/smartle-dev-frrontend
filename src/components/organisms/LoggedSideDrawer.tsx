import React, {useEffect, useState} from 'react';
import {Box, Button} from '@mui/material';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import { WhiteLogo } from "../../util/resources";
import useMediaQuery from '@mui/material/useMediaQuery'
import { useLocation } from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';
import './LoggedSideDrawer';
import { styled } from '@mui/material/styles';
import HomePage from '../../LoggedInUser/HomePage';
import Footer from './Footer';
import { createTheme, ThemeProvider } from '@mui/material/styles';



const LoggedSideDrawer = (props:any) => {
    const drawerWidth = 240;
    const[homeActive,setHomeActive] = useState(false);
    const isMobile = useMediaQuery('(max-width:1000px)');
    const location = useLocation();
    const [contactColor, setContactColor] = useState('color');
    const [anchor, setAnchor] = useState<boolean>(false);
    const [linkAdd, setLinkAdd] = useState<string>('/#contactForm');

    const redTheme = createTheme({ palette: { primary:{
      main:  '#F9EDF5'}
    } });
    
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
        <Drawer
         PaperProps={{
            style: {
              background: 'linear-gradient(to right bottom, #A18CD1, #FBC2EB)'
            }
          }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
                color: "pink"
            },
          }}
          variant="permanent"
          anchor="left"
        >
            <Box className={`${'flex-grow'}`} style={{marginTop:"30px", marginLeft:"10px"}}>
                    <Link to="/" 
                    className={`block dark:hidden ${isMobile ? 'text-xl pt-3 pl-1' : 'text-2xl shadow-none rounded-sm'}`} >
                            <img className='w-45' src={WhiteLogo} alt="" />
                    </Link>
                    <Link to="/" className={`hidden dark:block  ${isMobile ? 'text-xl pt-3 pl-1' : 'text-2xl px-80 py-1 shadow-none rounded-sm'}`}>
                         {
                            location.pathname !== '/courses' ? (
                                <img className='w-32' src={WhiteLogo.default} alt="" />
                            ) : (
                                <img className='w-32' src={WhiteLogo.default} alt="" />
                            )
                        }
                    </Link>
                    <ThemeProvider theme={redTheme}>
                    <Box className='buttons'>
                      <Link to="/">
                        <Button variant="contained" 
        
                          sx={{width:'212px', height:'50px', borderRadius: '12px', mt:'30px', backgroundColor:'#917EBD', fontWeight: '600'}}>
                          Home
                        </Button>
                        
                      </Link>
                      <Link to="/courses">
                      <Button variant="contained" sx={{width:'212px', height:'50px', borderRadius: '12px', background:'#F9EDF5;', mt:'30px', color: '#917EBD', fontWeight: '600'}}>
                        Exlpore Courses
                      </Button>
                      </Link>
                      <Link to="/mycourses">
                      <Button variant="contained" sx={{width:'212px', height:'50px', borderRadius: '12px', background:'#F9EDF5;', mt:'30px', color: '#917EBD', fontWeight: '600'}}>
                        My Courses
                      </Button>
                      </Link>
                  </Box>
                  </ThemeProvider>
            </Box>
            
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 0, mt:-6 }}
        >
          <Toolbar />
          <HomePage />
          <Footer />
        </Box>
  
      </Box>
    );
  }
  

export default LoggedSideDrawer;