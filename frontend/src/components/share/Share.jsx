import {
  Close,
  EmojiEmotions,
  PermMedia,
  VideoCameraFront,
} from "@mui/icons-material";
import React, { useState ,useEffect} from "react";
import "./share.scss";
import { useUsercontext } from "../../context/userContext";
import useFetch from "../../cutomHook/useFetch";
import Alert from "@mui/material/Alert";
import Snackbar from '@mui/material/Snackbar';
import CircularIndeterminate from "../../components/progress/circular";

const Share = ({ render }) => {
  const [file, setFile] = useState(null);
  const [dec, setdec] = useState("");
  const { currentUser } = useUsercontext();
  const {loading ,error ,fetchdata} = useFetch()


  const convertImg = (img) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(img);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    const url =  "/post/create";
    const data = {
      userId: currentUser._id,
      dec: dec,
      img: file,
    };
    const option =  {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
    const callback = (result) => {
      render();
      setFile("");
      setdec("");
    }

    fetchdata(url,option,callback);
      
  };
  const handleFilecreat = (e) => {
    const file = e.target.files[0];
    convertImg(file).then((data) => {
      setFile(data);
    });
  };

  const removeImage = () => {
    setFile("");
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <form onSubmit={handleFileUpload}>
          <div className="shareTop">
            <img
              src={currentUser.profilePicture?.url || "/assets/DefaultProfile.jpg"}
              alt=""
              className="shareProfileImg"
            />
            <input
              type="text"
              name="dec"
              placeholder="What's on your mind Amber ?"
              className="shareInput"
              value={dec}
              onChange={(e) => setdec(e.target.value)}
            />
          </div>

          <hr className="shareHr" />
          {file && (
            <div className="shareImgContainer">
              <img src={file} alt="" className="shareImg" />
              <Close className="shareCancelImg" onClick={removeImage} />
            </div>
          )}

          <div className="shareBottom">
            <div className="shareOptions">
              <div className="shareOption">
                <VideoCameraFront
                  className="shareIcon"
                  style={{ color: "#bb0000f2" }}
                />
                <span className="shareOptionText">Short</span>
              </div>
              <label htmlFor="file" className="shareOption">
                <PermMedia
                  className="shareIcon"
                  style={{ color: "#2e0196f1" }}
                />
                <span className="shareOptionText">Photo</span>
                <input
                  type="file"
                  id="file"
                  accept=".png,.jpeg,.jpg"
                  style={{ display: "none" }}
                  onChange={handleFilecreat}
                />
              </label>
              <div className="shareOption">
                <EmojiEmotions
                  className="shareIcon"
                  style={{ color: "#bfc600ec" }}
                />
                <span className="shareOptionText">Feelings</span>
              </div>
              <button type="submit" className="shareButton">
              {loading?<CircularIndeterminate size={10}/>:"Share"}
              </button>
            </div>
          </div>
        </form>
      </div>
      {error && (
         <Snackbar
         open={!!error}
         autoHideDuration={3300} // Duration in milliseconds (adjust as needed)
         onClose={()=> error}
         anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Positioning at the top
       >
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default Share;
