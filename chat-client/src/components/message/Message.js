import message from "./message.css";
import { format } from "timeago.js";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
export default function Message({ message, own, user }) {
  //If sender is user then its own mesages

  const [friend, setFriend] = useState(null);

  useEffect(() => {
    const friendId = message.sender !== user._id && message.sender;

    //GET FRIENDS IN #CONVERSATION
    const getFriend = async () => {
      const res = friendId && (await axios.get("/users?userId=" + friendId));
      setFriend(res.data);
    };
    getFriend();
  }, [user]);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          src={own ? user?.profilePicture : friend?.profilePicture}
          alt=""
          className="messageImg"
        />

        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
