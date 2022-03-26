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
import { Logo, LogoAlt } from "../../util/resources";

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
        <div className="bg-transparent pt-1 z-80">
            <Toolbar className="flex z-30 items-center w-11/12 mx-auto">
                <div className={`${isMobile ? 'flex-grow' : 'mr-5'}`}>
                    <Link to="/" className={`block dark:hidden ${isMobile ? 'text-xl pt-3 pl-1' : ' text-2xl px-8 py-1 shadow-none rounded-sm'}`}>
                            <img className='w-32' src={Logo.default} alt="" />
                    </Link>
                    <Link to="/" className={`hidden dark:block  ${isMobile ? 'text-xl pt-3 pl-1' : 'text-2xl px-8 py-1 shadow-none rounded-sm'}`}>
                         {
                            location.pathname !== '/courses' ? (
                                <img className='w-32' src={LogoAlt.default} alt="" />
                            ) : (
                                <img className='w-32' src={Logo.default} alt="" />
                            )
                        }
                    </Link>
                </div>
                {isMobile ? (
                    <Sidebar anchor={anchor} toggleSidebar={toggleSidebar} />
                ) : (<>
                    <div className="flex flex-grow">
                        {routes.map((r: any, key: any) => {
                            if (!r.show) return(<React.Fragment key={key}></React.Fragment>);
                            return (
                                <Link key={key} to={r.path} className={`${location.pathname !== '/courses' ? 'dark:text-white dark:hover:text-white':''} text-slate-900 hover:text-slate-900 px-4 pt-1 font-bold mx-4`}>
                                    {r.title}
                                </Link>
                            )
                        })}
                    </div>
                    <div className="">
                        <Link to={linkAdd}                            
                            >
                                <Button className={`bg-${contactColor}-400 text-white rounded-md font-bold shadow-none drop-shadow-lg px-3.5 py-2 `}>
                                    Contact Us
                                </Button>
                        </Link>
                        <Link to={"/login"}                            
                            >
                                <Button className={`bg-${contactColor}-400 text-white rounded-md font-bold shadow-none drop-shadow-lg px-8 py-2 ml-5`} >
                                    Login
                                </Button>
                        </Link>
                    </div>
                </>)
                }
            </Toolbar>
        </div>
    );
}
export default Header;
