
import React, {useState} from 'react';
import Drawer from '@mui/material/Drawer';
import { IconButton, Box, Button } from '@mui/material';
import { HashLink as Link } from 'react-router-hash-link';
import MenuIcon from '@mui/icons-material/Menu';
import routes from '../../util/routes';

interface Props{
    anchor: boolean;
    toggleSidebar: () => void;
}

const Sidebar = ({ anchor, toggleSidebar}: Props) => {

    const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-details') || 'null'))
    console.log(user + "testing rn");
    const handleLogout = () =>{
        
        localStorage.removeItem("user-details");
        window.location.reload();
        toggleSidebar();
    }

    return (<>
        <Drawer
            transitionDuration={450}
            anchor="right"
            open={anchor}
            onClose={toggleSidebar}
        >            
            <div className="w-64 pt-10">
                 {routes.map((r: any, idx:number) => {
                    if (!r.show) return(<React.Fragment key={idx}></React.Fragment>);
                     return (
                        <div className='mb-6' key={idx}>
                            <Link to={r.path} onClick={()=>toggleSidebar()} className="text-slate-600 hover:text-slate-900 px-4 pt-1 font-bold mx-4">
                                {r.title}
                            </Link>
                        </div>
                    )
                 })}    
                <div className='mb-6 mt-8'>
                    <Box sx={{marginBottom: "40px"}}>
                    {user !== null ? <Button onClick={()=>toggleSidebar()} className="bg-color-400 text-white hover:text-slate-900 py-2 px-12 rounded-md font-bold mx-8">
                                    Logout
   
                        </Button> :                            
                          <Link to={"/login"}  onClick={()=>toggleSidebar()} className="bg-color-400 text-white hover:text-slate-900 py-2 px-12 rounded-md font-bold mx-8">
                          Login

                        </Link>
                        }
                        
                    </Box>
                    <Box>
                        <Link to='/#contactForm' onClick={()=>toggleSidebar()} className="bg-color-400 text-white hover:text-slate-900 py-2 px-10 rounded-md font-bold mx-8">
                            Contact
                        </Link>
                    </Box>
                </div>
            </div>
        </Drawer>
        <IconButton className="light:text-dark dark:text-white" onClick={() => toggleSidebar() }>
            <MenuIcon />
        </IconButton>     
    </>);
}

export default Sidebar;