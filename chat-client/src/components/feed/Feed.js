import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { Posts } from "../../utils/mockData";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContex } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContex);

  useEffect(() => {
    const feedPosts = async () => {
      //GET ALL POSTS OF USER
      //if username then render profile page otherwise render Home page
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("posts/timeline/" + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    feedPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {/* dislay share if profile is of current user*/}
        {(!username || username === user.username) && <Share user={user} />}

        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
