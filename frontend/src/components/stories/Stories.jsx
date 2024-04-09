import React from "react";
import "./stories.scss";

const Stories = () => {
  return (
    <div className="stories">
      <div className="storyCard">
        <div className="overlay"></div>
        <img src="/assets/post/7.jpeg" alt="" className="storyProfile" />
        <img src="/assets/post/2.jpeg" alt="" className="storybackground" />
        {/* <img src="/assets/person/3.jpeg" alt="" className="storyadd" /> */}
        <span className="text">Amber</span>
      </div>
      <div className="storyCard">
        <div className="overlay"></div>
        <img src="/assets/person/2.jpeg" alt="" className="storyProfile" />
        <img src="/assets/post/2.jpeg" alt="" className="storybackground" />
        {/* <img src="/assets/person/3.jpeg" alt="" className="storyadd" /> */}
        <span className="text">fozen</span>
      </div>
      <div className="storyCard">
        <div className="overlay"></div>
        <img src="/assets/post/6.jpeg" alt="" className="storyProfile" />
        <img src="/assets/post/4.jpeg" alt="" className="storybackground" />
        {/* <img src="/assets/person/3.jpeg" alt="" className="storyadd" /> */}
        <span className="text">faroz</span>
      </div>
      <div className="storyCard">
        <div className="overlay"></div>
        <img src="/assets/post/10.jpeg" alt="" className="storyProfile" />
        <img src="/assets/post/5.jpeg" alt="" className="storybackground" />
        {/* <img src="/assets/person/3.jpeg" alt="" className="storyadd" /> */}
        <span className="text">athil</span>
      </div>
     

      {/* {Users.map((u) => (
        <Storycard key={u.id} user={u} />
      ))} */}
    </div>
  );
};

export default Stories;
