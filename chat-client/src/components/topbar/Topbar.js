import {
  Chat,
  NotificationAddOutlined,
  Person,
  Search,
} from "@mui/icons-material";
import "./topbar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContex } from "../../context/AuthContext";

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContex);
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await axios.get("/auth/logout");
    window.location.href();
    console.log("logout res", res.data);
    // dispatch({ type: "LOGOUT_SUCCESS" });
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" className="link">
          <span className="logo">CHAT TIME..</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            type="text"
            className="searchInput"
            placeholder="Search for friends, posts and video"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link
            to="/"
            className="link"
            style={{ textDecoration: "none", color: "white" }}
          >
            <span className="topbarLink">Homepage</span>
          </Link>

          <Link
            to="/messenger"
            className="link"
            style={{ textDecoration: "none", color: "white" }}
          >
            <span className="topbarLink">Messenger</span>
          </Link>
          {user && (
            <span className="topbarLink" onClick={handleLogout}>
              Logout
            </span>
          )}
        </div>

        <div className="tobarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>

          <div className="topbarIconItem">
            <NotificationAddOutlined />
            <span className="topbarIconBadge">3</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={user.profilePicture || "/assets/person/noavatar.png"}
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
