import {
  Cancel,
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
} from "@mui/icons-material";
import "./share.css";
import { useRef, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContex } from "../../context/AuthContext";

export default function Share() {
  const { user } = useContext(AuthContex);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      description: desc.current.value,
    };

    //to upload file to server
    if (file) {
      let data = new FormData();
      let fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;

      const config = {
        headers: { "content-type": "multipart/form-data" },
      };

      try {
        await axios.post("/upload", data, config);
      } catch (err) {}
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {}
  };

  console.log("file", file);
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={user.profilePicture || "/assets/person/noavatar.png"}
            alt=""
            className="shareTopImg"
          />
          <input
            className="shareInput"
            placeholder={"What's in your mind " + user.username + "?"}
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            {/*  will create pseudo URL for display*/}
            <img
              className="shareImg"
              src={URL.createObjectURL(file)}
              alt=""
            ></img>
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareButtom" onSubmit={handleSubmit}>
          <div className="shareOptions">
            {/* htmlfor="file" will take input for id file */}
            <label htmlfor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
