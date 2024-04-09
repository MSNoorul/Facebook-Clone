import React from "react";
import { Link } from "react-router-dom";
import "./profileRightBar.scss";
import { useUsercontext } from "../../context/userContext";
import Online from "../online/Online";

const ProfileRightBar = () => {
  const {currentUser} = useUsercontext();
  
  return (
    <div className="profileRightBar">
      <div className="profileRightBarHeading">
        <span className="profileRightBarTitle"> User Information</span>
        <Link to="/profile/userId/edit" style={{ textDecoration: "none" }}>
          <span className="editButton">Edit Profile</span>
        </Link>
      </div>

      <div className="profileRightBarInfo">
        <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">Email: </span>
          <span className="profileRightBarInfoValue">{currentUser.email || "sample@gamil.com"}</span>
        </div>
        <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">Phone Number: </span>
          <span className="profileRightBarInfoValue">{currentUser.phone}</span>
        </div>
        <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">city: </span>
          <span className="profileRightBarInfoValue">
            {currentUser.city}
          </span>
        </div>
        {/* <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">Country: </span>
          <span className="profileRightBarInfoValue">United Kingdom</span>
        </div> */}
        <div className="profileRightBarInfoItem">
          <span className="profileRightBarInfoKey">Relationship: </span>
          <span className="profileRightBarInfoValue">{currentUser.Status}</span>
        </div>
      </div>

      <h4 className="profileRightBarTitle">Following</h4>
      {currentUser.following.map((u) => (
          <Online key={u} userId={u} />
        ))}
    </div>
  );
};

export default ProfileRightBar;
