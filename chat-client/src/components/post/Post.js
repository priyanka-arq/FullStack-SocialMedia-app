import { MoreVert } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./post.css";
import { Users } from "../../utils/mockData";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { useContext } from "react";
import { AuthContex } from "../../context/AuthContext";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isliked, setIsLiked] = useState(false);

  //user of each POST
  const [user, setUser] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  //current USER
  const { user: currentUser } = useContext(AuthContex);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);
  useEffect(() => {
    const feedUser = async () => {
      //GET USER OF POST and SETUSER
      const res = await axios.get(`/users?userId=${post.userId}`);

      setUser(res.data);
    };
    feedUser();
  }, [post.userId]);

  const handleLike = () => {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isliked ? like - 1 : like + 1);
    setIsLiked(!isliked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                src={user.profilePicture || "/assets/person/noavatar.png"}
                alt=""
                className="postProfileImg"
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert className="postIcon" />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">
            {post.description && post.description}
          </span>
          <img
            className="postImg"
            src={(PF + post.img).length !== 0 ? PF + post.img : post.img}
            alt=""
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src="/assets/heart.png"
              alt=""
              className="likeIcon"
              onClick={handleLike}
            />
            <img
              src="/assets/like1.png"
              alt=""
              className="likeIcon"
              onClick={handleLike}
            />
            <span className="postLikeCounter">{like}</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

//
