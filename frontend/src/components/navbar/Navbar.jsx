import React, { useState, useEffect,useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';
import GroupsIcon from "@mui/icons-material/Groups";
import GroupIcon from "@mui/icons-material/Group";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ChatIcon from "@mui/icons-material/Chat";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useUsercontext } from "../../context/userContext";
import { SearchResultsList } from "../search/SearchResultsList";
import { DarkModeContext } from "./../../context/darkModeContext";
import MenuLink from "../menuLink/MenuLink";
import useFetch from "../../cutomHook/useFetch";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Navbar = () => {
  const { currentUser, setCurrentUser } = useUsercontext();
  const { fetchdata } = useFetch();
  const [search, setSearch] = useState(false);
  const [data, setdata] = useState([]);
  const [searchBoxState, setsearchBox] = useState(false);
  const [menuState, setmenuState] = useState(false);
  const [offline, setOffline] = useState(false);
  const { dispatch } = useContext(DarkModeContext);

  useEffect(() => {
    const handleOffline = () => {
      setOffline(true);
    };

    const handleOnline = () => {
      setOffline(false);
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  const openMenu = () => {
    setmenuState((pre) => !pre);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    const url = "/user/logout";
    const option = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: currentUser.username }),
    };
    const callback = (data) => {
      sessionStorage.removeItem("currentuser");
      setCurrentUser(null);
    };

    fetchdata(url, option, callback);
  };

  const handleSearch = (query) => {
    const url = `/user/search/${query}`;
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: currentUser._id }),
    };

    if (query.length > 0) {
      fetchdata(url, option, setdata);
    }
  };

  const handleSearchBox = (e) => {
    if (window.innerWidth <= 576) {
      setsearchBox((pre) => !pre);
    }
  };

  return (
    <div className="navbarContainer">
      <div className="navbarLeft">
        <img src="/assets/Facebooklog.png" alt="" />
        <div className={` header_input ${searchBoxState ? "open" : ""}`}>
          <div onClick={handleSearchBox} >
            {searchBoxState?
           <CloseIcon /> :<SearchIcon />
            }
          </div>      
          <input
            className="search-input"
            placeholder="Search Facebook"
            type="text"
            onChange={(e) => {
              handleSearch(e.target.value);
              if (e.target.value == "") setSearch(false);
              else setSearch(true);
            }}
          />
          {search && <SearchResultsList result={data} />}
        </div>
      </div>

      <div className="navbarCenter">
        <ul className="links">
          <li className="navlink-active">
            <Link to={"/Home"}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.464 1.286C10.294.803 11.092.5 12 .5c.908 0 1.707.303 2.537.786.795.462 1.7 1.142 2.815 1.977l2.232 1.675c1.391 1.042 2.359 1.766 2.888 2.826.53 1.059.53 2.268.528 4.006v4.3c0 1.355 0 2.471-.119 3.355-.124.928-.396 1.747-1.052 2.403-.657.657-1.476.928-2.404 1.053-.884.119-2 .119-3.354.119H7.93c-1.354 0-2.471 0-3.355-.119-.928-.125-1.747-.396-2.403-1.053-.656-.656-.928-1.475-1.053-2.403C1 18.541 1 17.425 1 16.07v-4.3c0-1.738-.002-2.947.528-4.006.53-1.06 1.497-1.784 2.888-2.826L6.65 3.263c1.114-.835 2.02-1.515 2.815-1.977zM10.5 13A1.5 1.5 0 0 0 9 14.5V21h6v-6.5a1.5 1.5 0 0 0-1.5-1.5h-3z"></path>
              </svg>
            </Link>
          </li>
          <li>
            <span>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.588 3.227A3.125 3.125 0 0 1 4.58 1h14.84c1.38 0 2.597.905 2.993 2.227l.816 2.719a6.47 6.47 0 0 1 .272 1.854A5.183 5.183 0 0 1 22 11.455v4.615c0 1.355 0 2.471-.119 3.355-.125.928-.396 1.747-1.053 2.403-.656.657-1.475.928-2.403 1.053-.884.12-2 .119-3.354.119H8.929c-1.354 0-2.47 0-3.354-.119-.928-.125-1.747-.396-2.403-1.053-.657-.656-.929-1.475-1.053-2.403-.12-.884-.119-2-.119-3.354V11.5l.001-.045A5.184 5.184 0 0 1 .5 7.8c0-.628.092-1.252.272-1.854l.816-2.719zM10 21h4v-3.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V21zm6-.002c.918-.005 1.608-.025 2.159-.099.706-.095 1.033-.262 1.255-.485.223-.222.39-.55.485-1.255.099-.735.101-1.716.101-3.159v-3.284a5.195 5.195 0 0 1-1.7.284 5.18 5.18 0 0 1-3.15-1.062A5.18 5.18 0 0 1 12 13a5.18 5.18 0 0 1-3.15-1.062A5.18 5.18 0 0 1 5.7 13a5.2 5.2 0 0 1-1.7-.284V16c0 1.442.002 2.424.1 3.159.096.706.263 1.033.486 1.255.222.223.55.39 1.255.485.551.074 1.24.094 2.159.1V17.5a2.5 2.5 0 0 1 2.5-2.5h3a2.5 2.5 0 0 1 2.5 2.5v3.498zM4.581 3c-.497 0-.935.326-1.078.802l-.815 2.72A4.45 4.45 0 0 0 2.5 7.8a3.2 3.2 0 0 0 5.6 2.117 1 1 0 0 1 1.5 0A3.19 3.19 0 0 0 12 11a3.19 3.19 0 0 0 2.4-1.083 1 1 0 0 1 1.5 0A3.2 3.2 0 0 0 21.5 7.8c0-.434-.063-.865-.188-1.28l-.816-2.72A1.125 1.125 0 0 0 19.42 3H4.58z"></path>
              </svg>
            </span>
          </li>
          <li>
            <span>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm-2 4a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"></path>
                <path d="M.5 12C.5 5.649 5.649.5 12 .5S23.5 5.649 23.5 12 18.351 23.5 12 23.5.5 18.351.5 12zm2.21-2a9.537 9.537 0 0 0 0 3.993l.3.007A2 2 0 0 0 3 10h-.29zm.663-1.983a4 4 0 0 1 0 7.966 9.523 9.523 0 0 0 1.948 2.773A5.002 5.002 0 0 1 10 15.523h4a5.002 5.002 0 0 1 4.679 3.233 9.523 9.523 0 0 0 1.948-2.773 4 4 0 0 1 0-7.966A9.501 9.501 0 0 0 12 2.5a9.501 9.501 0 0 0-8.627 5.517zM21.5 12a9.55 9.55 0 0 0-.212-2.007l-.265.007H21a2 2 0 0 0-.01 4l.3-.007c.138-.643.21-1.31.21-1.993zM12 21.5a9.455 9.455 0 0 0 4.97-1.402A3 3 0 0 0 14 17.523h-4a3 3 0 0 0-2.97 2.575A9.456 9.456 0 0 0 12 21.5z"></path>
              </svg>
            </span>
          </li>
          <li>
            <span>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 8a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2H9v2a1 1 0 1 1-2 0v-2H5a1 1 0 1 1 0-2h2V9a1 1 0 0 1 1-1zm8 2a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm-2 4a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z"></path>
                <path d="M.5 11a7 7 0 0 1 7-7h9a7 7 0 0 1 7 7v2a7 7 0 0 1-7 7h-9a7 7 0 0 1-7-7v-2zm7-5a5 5 0 0 0-5 5v2a5 5 0 0 0 5 5h9a5 5 0 0 0 5-5v-2a5 5 0 0 0-5-5h-9z"></path>
              </svg>
            </span>
          </li>
        </ul>
      </div>

      <div className={`navbarRight ${searchBoxState ? "hide" : ""}`}>
        <div className="icon  menu-icon" onClick={openMenu}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm8 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm8 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm8 16a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm8 0a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 17a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path>
          </svg>
          {menuState && (
            <div className="menu-items">
              <ul className="menu-items-wrapper">
                <li>
                  <Link to={"/Home"}>
                    <MenuLink
                      Icon={
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9.464 1.286C10.294.803 11.092.5 12 .5c.908 0 1.707.303 2.537.786.795.462 1.7 1.142 2.815 1.977l2.232 1.675c1.391 1.042 2.359 1.766 2.888 2.826.53 1.059.53 2.268.528 4.006v4.3c0 1.355 0 2.471-.119 3.355-.124.928-.396 1.747-1.052 2.403-.657.657-1.476.928-2.404 1.053-.884.119-2 .119-3.354.119H7.93c-1.354 0-2.471 0-3.355-.119-.928-.125-1.747-.396-2.403-1.053-.656-.656-.928-1.475-1.053-2.403C1 18.541 1 17.425 1 16.07v-4.3c0-1.738-.002-2.947.528-4.006.53-1.06 1.497-1.784 2.888-2.826L6.65 3.263c1.114-.835 2.02-1.515 2.815-1.977zM10.5 13A1.5 1.5 0 0 0 9 14.5V21h6v-6.5a1.5 1.5 0 0 0-1.5-1.5h-3z"></path>
                        </svg>
                      }
                      text={"Home"}
                    />
                  </Link>
                </li>
                <li>
                  <MenuLink Icon={<ChatIcon />} text="Chats" />
                </li>
                <li>
                  <Link to={"/friends/followers"}>
                    <MenuLink Icon={<GroupsIcon />} text="Followers" />
                  </Link>
                </li>
                <li>
                  <Link to={"/friends/following"}>
                    <MenuLink Icon={<GroupIcon />} text="Following" />
                  </Link>
                </li>
                <li>
                  <Link to={"/profile/userId/edit"}>
                    <MenuLink Icon={<EditOutlinedIcon />} text="Edit Profile" />
                  </Link>
                </li>
                <li>
                  <span onClick={() => dispatch({ type: "TOGGLE" })}>
                    <MenuLink Icon={<Brightness4Icon />} text="Theme" />
                  </span>
                </li>
                <li>
                  <MenuLink
                    onClick={handleLogout}
                    Icon={<ExitToAppOutlinedIcon />}
                    text={`logout`}
                  />
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="icon">
          <svg viewBox="0 0 12 13" fill="currentColor">
            <g fillRule="evenodd" transform="translate(-450 -1073)">
              <path d="m459.603 1077.948-1.762 2.851a.89.89 0 0 1-1.302.245l-1.402-1.072a.354.354 0 0 0-.433.001l-1.893 1.465c-.253.196-.583-.112-.414-.386l1.763-2.851a.89.89 0 0 1 1.301-.245l1.402 1.072a.354.354 0 0 0 .434-.001l1.893-1.465c.253-.196.582.112.413.386M456 1073.5c-3.38 0-6 2.476-6 5.82 0 1.75.717 3.26 1.884 4.305.099.087.158.21.162.342l.032 1.067a.48.48 0 0 0 .674.425l1.191-.526a.473.473 0 0 1 .32-.024c.548.151 1.13.231 1.737.231 3.38 0 6-2.476 6-5.82 0-3.344-2.62-5.82-6-5.82"></path>
            </g>
          </svg>
        </div>

        <div className="icon ">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9.5a9 9 0 1 1 18 0v2.927c0 1.69.475 3.345 1.37 4.778a1.5 1.5 0 0 1-1.272 2.295h-4.625a4.5 4.5 0 0 1-8.946 0H2.902a1.5 1.5 0 0 1-1.272-2.295A9.01 9.01 0 0 0 3 12.43V9.5zm6.55 10a2.5 2.5 0 0 0 4.9 0h-4.9z"></path>
          </svg>
        </div>

        <Link to="/profile/userId">
          <img
            src={
              currentUser.profilePicture?.url || "/assets/DefaultProfile.jpg"
            }
            alt=""
            className="navbarImg"
          />
        </Link>
      </div>
      {offline && (
        <Snackbar
          open={offline}
          autoHideDuration={3300} // Duration in milliseconds (adjust as needed)
          onClose={() => offline}
          anchorOrigin={{ vertical: "top", horizontal: "center" }} // Positioning at the top
        >
          <Alert severity={offline ? "error" : "success"}>
            {offline ? "Your Disconnected" : "Now Your Online"}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default React.memo(Navbar);
