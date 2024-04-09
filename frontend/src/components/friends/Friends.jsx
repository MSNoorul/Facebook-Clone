import React, { useEffect, useState } from "react";
import "./friends.scss";
import useFetch from "../../cutomHook/useFetch";
const Friends = ({ userId }) => {
  const [user , setUser] = useState({});
  const {fetchdata} = useFetch();
  useEffect(() => {
    const url =  `/user/${userId}`;
    fetchdata(url , setUser)
  }, []);
  return (
    <div>
      <li className="sidebarFriend">
        <img src={user.profilePicture?.url || "/assets/DefaultProfile.jpg"} alt="" className="sidebarFriendImg" />
        <span className="sidebarFriendName">{user.username}</span>
      </li>
    </div>
  );
};

export default Friends;
