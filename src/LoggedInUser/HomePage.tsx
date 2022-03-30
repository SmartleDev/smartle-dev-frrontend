import React,{useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import API from '../redux/api/api';
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from '@mui/icons-material/Group';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import './loggedUsers.css'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import {Link} from 'react-router-dom'

function HomePage() {

	const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
		height: 8,
		borderRadius: 5,
		[`&.${linearProgressClasses.colorPrimary}`]: {
		  backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 100 : 800],
		},
		[`& .${linearProgressClasses.bar}`]: {
		  borderRadius: 5,
		  backgroundColor: theme.palette.mode === 'light' ? '#917EBD' : '#308fe8',
		},
	  }));
	
	const [myCourses, setMyCourse] = useState([]);
	console.log(myCourses)
	const [isEnterprise, setIsEnterprise] = useState<boolean>(false);

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event : any) => {
	  setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
	  setAnchorEl(null);
	};

	useEffect(() =>{
		API.get('getcourseview/2')
		.then(res => {
			setMyCourse(res.data);
		}).catch(err=> {
			console.log(err)
		})
	},[])

  return (
	<div className = 'home-page'>
	<div className = 'home-icon'>
            <NotificationsIcon
              className="learner-icon"
              style={{
                color: "#917EBD",
                backgroundColor: "#F9EDF5",
                padding: "5px",
                fontSize: "50px",
                borderRadius: "30%",
				margin: "10px"
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
				margin: "10px"
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
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
		<Link to ='/learner'>
          <ListItemIcon>
            <GroupIcon fontSize="small" />
          </ListItemIcon>
          Switch Learner
		  </Link>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
</div>
	<h2 className="text-4xl pb-10 font-black">Continue Your Learning Journey</h2>
<div className="my-courses">
		{ myCourses?.map((dataItem : any, index:number) =>
		<>
		<div>
			<div className={`${isEnterprise ? 'bg-contrastAccent-200' : 'bg-accent-200'} rounded-md shadow-xl p-3 w-1/2 relative`}>
			<img src={dataItem?.course_image} className="rounded-md w-full" alt="" />
		</div>
		<div className = 'p-2 w-1/2 relative'>
			<h1 className="text-2xl m-2 font-black">{dataItem.course_name}</h1>
			<BorderLinearProgress variant="determinate" value={50} />
			<p style = {{textAlign: "end", fontSize : '12px'}}>In Progress</p>
			</div>
			</div>
		</>
		 )}
		 </div>
	</div>
  )
}

export default HomePage