import React, { useEffect, useState } from "react";
import "./online.scss";
import useFetch from "../../cutomHook/useFetch";
import { useUsercontext } from "../../context/userContext";

const Online = ({userId}) => {
  const [user , setUser] = useState({});
  const {currentUser} = useUsercontext();
  const {fetchdata} = useFetch();

  useEffect(() => {
    const url =  `/user/${userId}`;
    const option = {  headers: {
      "Authorization": 'Bearer ' + currentUser.accesstoken,
    },}
    fetchdata(url ,option, setUser)
  }, []);
  
  return (
    <div className="online">
      <li className="rightbarFriend">
        <div className="rightbarProfileImgContainer">
          <img
            src={user.profilePicture?.url || "/assets/DefaultProfile.jpg"}
            alt=""
            className="rightbarProfileImg"
          />
          {/* <span className="rightbarOnline"></span> */}
        </div>
        <span className="rightbarUsername">{user.username}</span>
      </li>
    </div>
  );
};

export default Online;
