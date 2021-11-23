import {
  Facebook,
  FacebookOutlined,
  GitHub,
  Google,
} from "@mui/icons-material";
import React from "react";
import "./login.css";

export default function Login() {
  const google = () => {
    //request to open backend url on click of google button
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const github = () => {
    //request to open backend url on click of github button
    window.open("http://localhost:5000/auth/github", "_self");
  };

  const facebook = () => {
    //request to open backend url on click of facebook button
    window.open("http://localhost:5000/auth/facebook", "_self");
  };

  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton facebook" onClick={facebook}>
            <FacebookOutlined className="icon" />
            Facebook
          </div>
          <div className="loginButton google" onClick={google}>
            <Google className="icon" />
            Google
          </div>
          <div className="loginButton github" onClick={github}>
            <GitHub className="icon" />
            Github
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right">
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Password" />
          <button className="submit">Login</button>
        </div>
      </div>
    </div>
  );
}
