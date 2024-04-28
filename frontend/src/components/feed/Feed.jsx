import React, { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import Stories from "../stories/Stories";
import "./feed.scss";
import { useUsercontext } from "../../context/userContext";
import useFetch from "../../cutomHook/useFetch";

const Feed = () => {

  const [render,setRender] = useState(false);

  const {currentUser,setPost ,posts} = useUsercontext();
  const {fetchdata} = useFetch();
  const userId = currentUser._id;

  const RenderParent = () => {
    setRender(!render);
  }

  useEffect(() => {
    const url = `/post/timeline/${userId}`;
    const option  = {
      headers: {
        "Authorization": 'Bearer ' + currentUser.accesstoken,
      },
    }
    fetchdata(url,option,setPost)
  }, [render]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Stories />
        <Share render = {RenderParent}/>
        {posts.map((p) => (
          <Post key={p._id} post={p} render={RenderParent}/>
        ))}
      </div>
    </div>
  );
};

export default Feed;
