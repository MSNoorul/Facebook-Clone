import "./SearchResultsList.css";
import { useUsercontext } from "../../context/userContext";
import { useState } from "react";
import useFetch from "../../cutomHook/useFetch";

export const SearchResultsList = ({ result }) => {
  const { currentUser, setCurrentUser } = useUsercontext();
  const {fetchdata} = useFetch();

  const handleFollow = (e, id) => {
    const option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: currentUser._id }),
    }
    const callback = (data) => {if (data.result.modifiedCount > 0) {setCurrentUser(data.currentUser)} }

    if (e.target.innerText == "Follow") {
      const url = `/user/follow/${id}`;
      fetchdata(url ,option ,callback)
      
    } else {
      const url = `/user/unfollow/${id}`;
      fetchdata(url, option,callback)    
    }
  };

  return (
    <div className="results-list">
      {result.map((p) => {
        return (
          <div className="search-result" key={p._id}>
            <div className="search-item">
              <img
                src={p.profilePicture.url || "/assets/DefaultProfile.jpg"}
                alt=""
              />
              <div className="search-text">
                <p className="username">{p.username}</p>
                <p className="city">{p.city}</p>
              </div>
            </div>
            <button
              className="followbtn"
              onClick={(e) => {
                handleFollow(e, p._id);
              }}
            >
              {currentUser.following.includes(p._id) ? "UnFollow" : "Follow"}
            </button>
          </div>
        );
      })}
    </div>
  );
};
