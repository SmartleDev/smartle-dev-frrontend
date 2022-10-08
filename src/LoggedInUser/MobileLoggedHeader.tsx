import React, {useState} from 'react';
import {Button, Box, Grid} from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuList from '@mui/material/MenuList';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";
import jwt_decode from "jwt-decode";
import API from "../redux/api/api";
import useMediaQuery from '@mui/material/useMediaQuery'
import NotificationsIcon from "@mui/icons-material/Notifications";
import { smartlelogo1,smartlewhite1 } from "../util/resources";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

const MobileLoggedHeader = () => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  const [user, setUser] = useState<any>(
    JSON.parse(localStorage.getItem("user-details") || "null")
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };


  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number,
  ) => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  let details: any = {
    email: "",
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

  const isMobile = useMediaQuery('(max-width:900px)');

  return (
    <Grid container spacing={2} className=''>
        <Grid item xs={6} className='pl-10'>
            <div className={`${isMobile ? 'flex-grow' : 'mr-5'}`}>
                <Link to="/" className={`block dark:hidden ${isMobile ? 'text-xl  pl-1' : ' text-2xl px-8 shadow-none rounded-sm'}`}>
                        <img className='w-48 ' src={smartlelogo1} alt="" />
                </Link>
                <Link to="/" className={`hidden dark:block light:hidden ${isMobile ? 'text-xl pt-10 py-1  pl-5' : ' text-2xl px-8 py-6 shadow-none rounded-sm'}`}>
                        <img className='w-40 ' src={smartlewhite1} alt="" />
                </Link>
            </div>
        </Grid>
        <Grid item xs={6} className='text-right mt-10 md:mt-8 pr-10'>
        <ButtonGroup  ref={anchorRef} aria-label="split button">
            <Box
            >
            <MenuRoundedIcon className='w-8 h-8 sm:w-12 sm:h-12 text-black dark:text-white' 
            onClick={handleToggle}
            />
            </Box>
        </ButtonGroup>
        <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
        >
            {({ TransitionProps, placement }) => (
            <Grow
                {...TransitionProps}
                style={{
                transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
            >
                <Box>
                <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu" >
                        <MenuItem
                        >
                                <PersonIcon
            className="learner-icon"
            style={{
            color: "#917EBD",
            backgroundColor: "#F9EDF5",
            padding: "5px",
            fontSize: "50px",
            borderRadius: "30%",
            margin: "10px",
            boxShadow: '0px 8px 5px rgba(0, 0, 0, 0.1)'
            }}
            onClick={handleClick}
        />
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={openMenu}
            onClose={handleCloseMenu}
            onClick={handleCloseMenu}
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
            <Link to="/profile">
            <MenuItem>
                <ListItemIcon>
                    <Avatar/>
                </ListItemIcon>
                Profile
            </MenuItem>
            </Link>
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
                        </MenuItem>
                        <MenuItem
                        >
                            <NotificationsIcon
                            className="learner-icon"
                            style={{
                            color: "#917EBD",
                            backgroundColor: "#F9EDF5",
                            padding: "5px",
                            fontSize: "50px",
                            borderRadius: "30%",
                            margin: "10px",
                            boxShadow: '0px 8px 5px rgba(0, 0, 0, 0.1)'
                            }}
                        />
                        </MenuItem>

                    </MenuList>
                </ClickAwayListener>
                </Box>
            </Grow>
            )}
        </Popper>
        </Grid>
    </Grid>
  );
}

export default MobileLoggedHeader;
