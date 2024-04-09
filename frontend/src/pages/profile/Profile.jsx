import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./profile.scss";
import Feed from "./../../components/feed/Feed";
import Rightbar from "./../../components/rightbar/Rightbar";
import { useUsercontext } from "../../context/userContext";
import useFetch from "../../cutomHook/useFetch";

const Profile = () => {
 const { currentUser ,setCurrentUser} = useUsercontext();
 const {fetchdata} = useFetch();
 useEffect(() => {
  console.log(currentUser);
 }, []);

 useEffect(() => {
  const url = "/user/" + currentUser._id ;
  fetchdata(url,setCurrentUser)
 }, []);
  
  return (
    <div className="profile">
      <Navbar />
      <div className="profileWrapper">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img src={currentUser.coverPicture.url || '/assets/profilecover.jpg'} alt="" className="profileCoverImg" />
              <img
                src={currentUser.profilePicture.url || '/assets/DefaultProfile.jpg'}
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{currentUser.username}</h4>
              <span className="profileInfoDesc">Hi Friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
