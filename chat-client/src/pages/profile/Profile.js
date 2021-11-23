import { Fragment } from "react";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useContext } from "react";
import { AuthContex } from "../../context/AuthContext";

export default function Profile() {
  const [user, setUser] = useState([]);
  const params = useParams();
  const username = params.username;

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const feedUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    feedUser();
  }, [username]);

  return (
    <Fragment>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={user.coverPicture || "/assets/posts/post2.jpeg"}
                alt=""
                className="profileCoverImg"
              />
              <img
                src={
                  user.profilePicture ||
                  PF + user.profilePicture ||
                  "/assets/person/noavatar.png"
                }
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.description}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
