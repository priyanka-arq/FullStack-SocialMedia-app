import React from "react";
import Card from "../../components/card/Card";
import { posts } from "../../utils/mockData";
import "./home.css";

export default function Home() {
  return (
    <div className="home">
      {posts.map((post) => (
        <Card post={post} key={post.id} />
      ))}
    </div>
  );
}
