import React, { useEffect, useState } from "react";
import Online from "../online/Online";
import "./rightbarhome.scss";
import { useUsercontext } from "../../context/userContext";

const Rightbarhome = () => {
  const {currentUser} =useUsercontext();

  return (
    <div className="rightbarhome">
      <div className="birthdayContainer">
        <img
          src="/assets/gift.png"
          alt=""
          className="birthdayImg"
        />
        <span className="birthdayText">
          <b>Sarah Dane</b> and <b>other friends</b> have a birthday today
        </span>
      </div>
      <img src="/assets/ad.png" alt="" className="rightbarAdvert" />

      <span className="rightbarTitle">Following</span>

      <ul className="rightbarFriendList">
        {currentUser?.following?.map((u) => (
          <Online key={u} userId={u} />
        ))}
      </ul>
    </div>
  );
};

export default Rightbarhome;
