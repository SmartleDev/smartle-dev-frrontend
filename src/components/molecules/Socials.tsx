import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Socials = () => {    
    const location = useLocation();
    const [color, setColor] = useState<any>(undefined);
    
    useEffect(() => {    
        if (location.pathname == "/enterprise")
            setColor('hover:text-contrast-400');
        else
            setColor('hover:text-accent-400');
    }, [location]);
    
    return (
        <div className="flex">    
            {/* <Link to='/'>
                <i className={`text-white ${color} text-xl mx-4 bi bi-facebook`}></i>
            </Link>    
            <Link to='/'>                
                <i className={`text-white ${color} text-xl mx-4 bi bi-instagram`}></i>
            </Link>    
            <Link to='/'>                
                <i className={`text-white ${color} text-xl mx-4 bi bi-linkedin`}></i>
            </Link> */}
            <div
                onClick={()=>window.scrollTo(0,0)}
                className="rounded-full w-8 h-8 flex justify-center items-center text-sm md:cursor-pointer bg-color-400 text-white">
                <i className={`text-white text-xl mx-4 bi bi-caret-up-fill`}></i>
            </div>
        </div>
    );
}

export default Socials;
