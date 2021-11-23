import "./register.css";
import { useRef, useContext } from "react";
import { registerCall } from "../../apiCalls";
import { AuthContex } from "../../context/AuthContext";
import { CircularColor } from "../../components/loading/Loading";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const navigate = useNavigate();

  const { user, isFetching, error, dispatch } = useContext(AuthContex);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmPassword.current.value !== password.current.value) {
      confirmPassword.current.setCustomValidity("Passwords don't match!");
    } else {
      registerCall(
        {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        },
        dispatch
      );
      navigate("/");
    }
  };

  const handleLogin = () => {
    navigate("/login");
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
              type="text"
              className="loginInput"
              placeholder="Username"
              required
              ref={username}
            />
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
              required
              ref={password}
            />
            <input
              type="password"
              className="loginInput"
              placeholder="Confirm Password"
              minLength="6"
              required
              ref={confirmPassword}
            />
            {isFetching && CircularColor()}
            <button className="loginButton">Sign Up</button>
            <button className="loginRegisterButton" onClick={handleLogin}>
              Log into Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
