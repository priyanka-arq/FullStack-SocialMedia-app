import React from "react";
import { useLocation } from "react-router-dom";
import { posts } from "../../utils/mockData";
import "./post.css";

export default function Post() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const post = posts.find((post) => post.id.toString() === id);

  return (
    <div className="post">
      <img className="postImg" src={post.img} alt="" />
      <h1 className="postTitle">{post.title}</h1>
      <p className="postDesc">{post.desc}</p>
      <p className="postLongDesc">{post.longDesc}</p>
    </div>
  );
}
