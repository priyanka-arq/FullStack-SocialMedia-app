import conversation from "./conversation.css";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    //GET FRIENDS FROM CONVERSATION WHO IS NOT THE CURRENT USER
    const friendId = conversation.members.find(
      (member) => member !== currentUser._id
    );

    //GET FRIENDS IN #CONVERSATION
    const getUser = async () => {
      const res = await axios.get("/users?userId=" + friendId);
      setUser(res.data);
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <div className="conversation">
      <img
        src={
          user && user.profilePicture
            ? user.profilePicture
            : PF + "/person/noavatar.png"
        }
        alt=""
        className="conversationImg"
      />
      <span className="conversationName">{user && user.username}</span>
    </div>
  );
}
