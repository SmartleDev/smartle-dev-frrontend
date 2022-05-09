import React, { useEffect, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import jwt_decode from "jwt-decode";
import API from "../redux/api/api";

function Header() {
  const [user, setUser] = useState<any>(
    JSON.parse(localStorage.getItem("user-details") || "null")
  );

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
  return (
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
         <Link to="/profile">
        <MenuItem>
         <Avatar /> Profile
        </MenuItem>
        </Link>
        {/* <MenuItem>
          <Avatar /> My account
        </MenuItem> */}
        <Divider />
        <MenuItem>
          <Link to="/learner">
            <ListItemIcon>
              <GroupIcon fontSize="small" />
            </ListItemIcon>
            Switch Learner
          </Link>
        </MenuItem>
        {/* <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem onClick={handelLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

export default Header;
