import React, { useEffect, useState } from "react";
import {    
    Toolbar,    
    Button
} from "@mui/material";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { HashLink as Link } from 'react-router-hash-link';
import Sidebar from "./Sidebar";
import useMediaQuery from '@mui/material/useMediaQuery'
import Ripples from 'react-ripples';
import routes from '../../util/routes';
import { smartlelogo1,smartlewhite1 } from "../../util/resources";

import API from '../../redux/api/api';
import Headers from "./Header";
import jwt_decode from "jwt-decode";

import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Header = () => {
    
      const [anchorEl, setAnchorEl] = React.useState(null);
      const open = Boolean(anchorEl);
      const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
    
      const handelLogout = () => {
        details = jwt_decode(user.token);
        console.log(details);
        API.post("logout", { email: details?.email })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        localStorage.removeItem("user-details");
        localStorage.removeItem("learner-details");
        setUser(null);
        window.location.reload();
      };

    const [anchor, setAnchor] = useState<boolean>(false);
    const [linkAdd, setLinkAdd] = useState<string>('/#contactForm');

    const toggleSidebar = () => setAnchor(!anchor);    
    const isMobile = useMediaQuery('(max-width:1000px)');
    const location = useLocation();
    const [contactColor, setContactColor] = useState('color');
    const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user-details') || 'null'))
    const [leanerUser, setLearnerUser] = useState<any>(JSON.parse(localStorage.getItem('learner-details') || 'null'))
    console.log(user)
    let details : any = {
        email: ''
    }
    const navigate = useNavigate()


    
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

    const [learner, setLearner] = useState<any>('')
    const [userId, setUserId] = useState<any>(user?.username)
    const [learnerList, setLearnerList] = useState<any>([])
  
    useEffect(() =>{
      API.post('selectlearner', {userId : userId})
      .then((res) => {
        setLearnerList(res.data.result)
        console.log(res.data.result)
      })
      .catch((err) => {
        console.log(err)
      })
      
    },[])


    // if(leanerUser === null){
    //     if(learnerList.length === 0){
    //         return(<Navigate to="/registerchild"  />)
    //     }else{
    //     return(<Navigate to="/learner"  />)
    //     }
    // }
    return (
        <div className="bg-transparent pt-1 z-80" style={{marginTop: "10px"}}>
            <Toolbar className="flex z-30 items-center w-11/12 mx-auto" >
                <div className={`${isMobile ? 'flex-grow' : 'mr-5'}`}>
                    <Link to="/" className={`block dark:hidden ${isMobile ? 'text-xl  pl-1' : ' text-2xl px-8 shadow-none rounded-sm'}`}>
                            <img className='w-48 ' src={smartlelogo1} alt="" />
                    </Link>
                    <Link to="/" className={`hidden dark:block light:hidden ${isMobile ? 'text-xl pt-3 py-1  pl-1' : ' text-2xl px-8 py-6 shadow-none rounded-sm'}`}>
                            <img className='w-40 ' src={smartlewhite1} alt="" />
                    </Link>
                    <Link to="/" className={`hidden dark:block dark:hidden ${isMobile ? 'text-xl pt-3 pl-1' : 'text-2xl px-8 py-1 shadow-none rounded-sm'}`}>
                         {
                            location.pathname !== '/courses' ? (
                                <img className='w-40' src={smartlelogo1} alt="" />
                            ) : (
                                <img className='w-40' src={smartlelogo1} alt="" />
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
                                <Link key={key} to={r.path} className={`${location.pathname !== '/coursesw' ? 'dark:text-white dark:hover:text-white':''} text-slate-900 hover:text-slate-900 px-4 pt-1 font-bold mx-4`}>
                                    {r.title}
                                </Link>
                            )
                        })}
                    </div>
                    <div className="">
                        {/* <Link to={linkAdd}                            
                            >
                                <Button className={`bg-${contactColor}-400 text-white rounded-md font-bold shadow-none drop-shadow-lg px-3.5 py-2 `}>
                                    Contact Us
                                </Button>
                        </Link> */}

                        {user !== null ?
                                 <div className="home-icon">
                                 <NotificationsIcon
                                   className="learner-icon"
                                   style={{
                                     color: "#917EBD",
                                     backgroundColor: "#F9EDF5",
                                     padding: "5px",
                                     fontSize: "50px",
                                     borderRadius: "30%",
                                     margin: "10px",
                                   }}
                                 />
                                 <PersonIcon
                                   className="learner-icon"
                                   style={{
                                     color: "#917EBD",
                                     backgroundColor: "#F9EDF5",
                                     padding: "5px",
                                     fontSize: "50px",
                                     borderRadius: "30%",
                                     margin: "10px",
                                   }}
                                   onClick={handleClick}
                                 />
                                 <Menu
                                   anchorEl={anchorEl}
                                   id="account-menu"
                                   open={open}
                                   onClose={handleClose}
                                   onClick={handleClose}
                                   PaperProps={{
                                     elevation: 0,
                                     sx: {
                                       overflow: "visible",
                                       filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                       mt: 1.5,
                                       "& .MuiAvatar-root": {
                                         width: 32,
                                         height: 32,
                                         ml: -0.5,
                                         mr: 1,
                                         //   bgcolor: 'background.paper',
                                       },
                                       "&:before": {
                                         content: '""',
                                         display: "block",
                                         position: "absolute",
                                         top: 0,
                                         right: 14,
                                         width: 10,
                                         height: 10,
                                         //   bgcolor: 'background.paper',
                                         transform: "translateY(-50%) rotate(45deg)",
                                         zIndex: 0,
                                       },
                                     },
                                   }}
                                   transformOrigin={{ horizontal: "right", vertical: "top" }}
                                   anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                                 >
                                   <MenuItem>
                                    <Avatar /> Profile
                                   </MenuItem>
                                   <Divider />
                                   <MenuItem>
                                     <Link to="/learner">
                                       <ListItemIcon>
                                         <GroupIcon fontSize="small" />
                                       </ListItemIcon>
                                       Switch Learner
                                     </Link>
                                   </MenuItem>
                                   <MenuItem onClick={handelLogout}>
                                     <ListItemIcon>
                                       <Logout fontSize="small" />
                                     </ListItemIcon>
                                     Logout
                                   </MenuItem>
                                 </Menu>
                               </div>
                            :
                            <Link to={"/login"}> 
                            <Button className={`bg-${contactColor}-400 text-white rounded-md font-bold shadow-none drop-shadow-lg px-8 py-2 ml-5`} >
                                    Login
                                </Button>
                        </Link>   }  
                    </div>
                </>)
                }
            </Toolbar>
        </div>
    );
}
export default Header;