import React, { useEffect, useState } from "react";
import moment from "moment";
import "./post.scss";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  ChatBubbleOutline,
  MoreVert,
  Favorite,
  ThumbDown,
  ThumbUpAltOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useUsercontext } from "../../context/userContext";
import useFetch from "../../cutomHook/useFetch";

const Post = ({ post, render }) => {
  const [user, setUser] = useState({});
  const [like, setlike] = useState(post.likes.length || 0);
  const { currentUser } = useUsercontext();
  const { fetchdata } = useFetch();
  const [deleteMenu, setDeleteMenu] = useState(false);

  useEffect(() => {
    const url = `/user/${post.userId}`;
    const option = {  headers: {
      "Authorization": 'Bearer ' + currentUser.accesstoken,
    },}
    fetchdata(url, option ,setUser);
    console.log(post?.likes?.includes(currentUser._id));
  }, []);

  const handleLikes = (name) => {
    const url = `/post/${name}/${post._id}`;
    const option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: currentUser._id }),
    };
    const callback = (result) => {
      if (result.modifiedCount > 0 && name == "like") {
        setlike((n) => n + 1);
      } else if (result.modifiedCount > 0 && name == "dislike") {
        setlike((n) => {
          if (n - 1 < 0) return 0;
          else return n - 1;
        });
      }
    };

    fetchdata(url, option, callback);
  };

  const handleDeleteMenu = () => {
    setDeleteMenu((pre) => !pre);
  };

  const handleDelete = () => {
    const url = `/post/delete/${post._id}`;
    const option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization' :'Bearer ' +currentUser.accesstoken
      },
      body: JSON.stringify({ id: currentUser._id }),
    };
    const callback = (data) => {
      if (data.deletedCount > 0) render();
    };

    fetchdata(url, option, callback);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to="/profile/userId">
              <img
                src={user.profilePicture?.url}
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{moment(post.createdAt).fromNow()}</span>
          </div>
          <div className="postTopRight">
            <IconButton onClick={handleDeleteMenu}>
              <MoreVert className="postVertButton" />
            </IconButton>
            {deleteMenu && (
              <div className="deleteMenu" onClick={handleDelete}>
                <div>
                  <DeleteIcon />
                </div>
                <div>Delete Post</div>
              </div>
            )}
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.dec}</span>
          <img src={post.img?.url} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <Favorite
              className="bottomLeftIcon"
              style={{ color: "red" }}
              onClick={() => {
                handleLikes("like");
              }}
            />
            <ThumbDown
              className="bottomLeftIcon"
              style={{ color: "#011631" }}
              onClick={() => {
                handleLikes("dislike");
              }}
            />
            <span className="postLikeCounter">{like}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">
              {post.comment} · comments · share
            </span>
          </div>
        </div>

        <hr className="footerHr" />
        <div className="postBottomFooter">
          <div
            className={`postBottomFooterItem  ${post?.likes?.includes(currentUser._id)?'liked':''}`}
            onClick={() => {
              handleLikes("like");
            }}
          >
            <ThumbUpAltOutlined className="footerIcon" />
            <span className="footerText">Like</span>
          </div>
          <div className="postBottomFooterItem notAllowed">
            <ChatBubbleOutline className="footerIcon notAllowed" />
            <span className="footerText">Comment</span>
          </div>
          <div className="postBottomFooterItem notAllowed">
            <ShareOutlined className="footerIcon notAllowed" />
            <span className="footerText">Share</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
