import React, { useEffect, useState } from "react";
import "./friends.scss";
import useFetch from "../../cutomHook/useFetch";
import { useUsercontext } from "../../context/userContext";
const Friends = ({ userId }) => {
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
    <div>
      <li className="sidebarFriend">
        <img src={user.profilePicture?.url || "/assets/DefaultProfile.jpg"} alt="" className="sidebarFriendImg" />
        <span className="sidebarFriendName">{user.username}</span>
      </li>
    </div>
  );
};

export default Friends;
