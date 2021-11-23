import "./login.css";
import { useRef, useContext } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContex } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { CircularColor } from "../../components/loading/Loading";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, error, dispatch } = useContext(AuthContex);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    navigate("/");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">CHAT TIME..</h3>
          <span className="loginDescription">
            Connect with friends and the world around you on Chat Time..
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              type="email"
              className="loginInput"
              placeholder="Email"
              required
              ref={email}
            />
            <input
              type="password"
              className="loginInput"
              placeholder="Password"
              minLength="6"
              ref={password}
              required
            />
            {isFetching && CircularColor()}
            <button className="loginButton">Log In</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" onClick={handleRegister}>
              Create a New Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
