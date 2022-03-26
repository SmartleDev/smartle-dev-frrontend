import React, { useEffect, useState } from "react";
import {    
    Toolbar,    
    Button
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';
import Sidebar from "./Sidebar";
import useMediaQuery from '@mui/material/useMediaQuery'
import Ripples from 'react-ripples';
import routes from '../../util/routes';
import { Logo, LogoAlt, NewLogo } from "../../util/resources";

const Header = () => {
    const [anchor, setAnchor] = useState<boolean>(false);
    const [linkAdd, setLinkAdd] = useState<string>('/#contactForm');

    const toggleSidebar = () => setAnchor(!anchor);    
    const isMobile = useMediaQuery('(max-width:1000px)');
    const location = useLocation();
    const [contactColor, setContactColor] = useState('color');
    
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
        <div className="bg-transparent pt-1">
            <Toolbar className="flex z-30 items-center w-11/12 mx-auto">
                <div className={`${isMobile ? 'flex-grow' : 'mr-5'}`}>
                    <Link to="/" 
                    className={`block dark:hidden ${isMobile ? 'text-xl pt-3 pl-1' : 'text-2xl shadow-none rounded-sm'}`} >
                            <img className='w-40' src={NewLogo} alt="" />
                    </Link>
                    <Link to="/" className={`hidden dark:block  ${isMobile ? 'text-xl pt-3 pl-1' : 'text-2xl px-80 py-1 shadow-none rounded-sm'}`}>
                         {
                            location.pathname !== '/courses' ? (
                                <img className='w-32' src={NewLogo.default} alt="" />
                            ) : (
                                <img className='w-32' src={NewLogo.default} alt="" />
                            )
                        }
                    </Link>
                </div>
                {isMobile ? (
                    <Sidebar anchor={anchor} toggleSidebar={toggleSidebar} />
                ) : null
                }
            </Toolbar>
        </div>
    );
}
export default Header;
