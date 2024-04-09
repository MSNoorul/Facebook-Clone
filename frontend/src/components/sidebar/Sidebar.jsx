import React, { useContext } from "react";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import VideocamIcon from "@mui/icons-material/Videocam";
import GroupsIcon from "@mui/icons-material/Groups";
import GroupIcon from "@mui/icons-material/Group";
import EventIcon from "@mui/icons-material/Event";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import "./sidebar.scss";
import MenuLink from "../menuLink/MenuLink";
import { DarkModeContext } from "./../../context/darkModeContext";
import { useUsercontext } from "../../context/userContext";
import Friends from "../friends/Friends";
import useFetch from "../../cutomHook/useFetch";
import Alert from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';
import { Link } from "react-router-dom";


const Sidebar = () => {
  const { currentUser, setCurrentUser } = useUsercontext();
  const { dispatch } = useContext(DarkModeContext);
  const { error,fetchdata} = useFetch();

  const handleLogout = (e)=>{
    e.preventDefault();
    const url = "/user/logout";
    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: currentUser.username }),
    }
    const callback = (data) => {
      sessionStorage.removeItem("currentuser");
      setCurrentUser(null);
    }

    fetchdata(url,option,callback)
  }
 

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <MenuLink Icon={<RssFeedIcon />} text="Feed" />
        <MenuLink Icon={<ChatIcon />} text="Chats" />
        <MenuLink Icon={<VideocamIcon />} text="Videos" />
        <Link to={'/friends/followers'}>
        <MenuLink Icon={<GroupsIcon />} text="Followers" />
        </Link>
        <Link to ={'/friends/following'}>
        <MenuLink Icon={<GroupIcon />} text="Following" />
        </Link>
        <MenuLink Icon={<EventIcon />} text="Events" />
        <span onClick={() => dispatch({ type: "TOGGLE" })}>
          <MenuLink Icon={<Brightness4Icon />} text="Theme" />
        </span>
        <MenuLink
          onClick={handleLogout}
          Icon={<ExitToAppOutlinedIcon />}
          text={`logout ( ${currentUser.username} )`}
        />

        <hr className="sidebarHr" />

        <h4
         
          className="title-followers"
        >
          {" "}
          Followers
        </h4>

        <ul className="sidebarFriendList">
          {currentUser.followers?.map((u) => (
            <Friends key={u} userId={u} />
          ))}
        </ul>
      </div>
      {error && (
         <Snackbar
         open={!!error}
         autoHideDuration={3300} // Duration in milliseconds (adjust as needed)
         onClose={()=> error}
         anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Positioning at the top
       >
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}
    </div>
  );
};


export default Sidebar;
