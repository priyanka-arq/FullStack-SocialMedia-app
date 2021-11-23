import chatOnline from "./chatOnline.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ChatOnline({
  onlineUsers,
  currentUserId,
  setCurrentChat,
}) {
  const [friends, setfriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + currentUserId);
      setfriends(res.data);
    };
    getFriends();
  }, [currentUserId]);

  useEffect(() => {
    //set online friends if online users inclides frineds Id

    setOnlineFriends(
      friends.filter((friend) =>
        onlineUsers.map((user) => user.userId === friend._id)
      )
    );
  }, [friends, onlineUsers]);

  const handleClick = async (onlineFriend) => {
    const res = await axios.get(
      `/conversations/find/${currentUserId}/${onlineFriend._id}`
    );
    setCurrentChat(res.data);
  };
  return (
    <div className="chatOnline">
      {onlineFriends.map((onlineFriend) => (
        <div
          className="chatOnlineFriend"
          key={onlineFriend._id}
          onClick={() => handleClick(onlineFriend)}
        >
          <div className="chatOnlineImgContainer">
            <img
              src={
                onlineFriend?.profilePicture
                  ? onlineFriend.profilePicture
                  : PF + "/assets/person/Alia.jpeg"
              }
              alt=""
              className="chatOnlineImg"
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <div className="chatOnlineName">{onlineFriend.username}</div>
        </div>
      ))}
    </div>
  );
}
