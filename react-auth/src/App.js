import Navbar from "./components/navbar/Navbar";
import "./app.css";
import Home from "./pages/home/Home";
import Post from "./pages/post/Post";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import {useState,useEffect } from  'react';
function App() {
  const [user, setUser] =  useState(null)

  useEffect(() => {
   const getUser = async() => {
     fetch("http://localhost:5000/auth/login/success", {
       method: "GET",
       credentials: "include",
       headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true
       },
     }).then(response => {
       if(response.status === 200) return response.json()
       throw new Error("Authentication failed")
     }).then(resObject => {
       setUser(resObject.user)
     }).catch(err => {
       console.log(err);
     })
   }
   getUser()
  }, [])

console.log("user", user);
  return (
    <BrowserRouter>
      <div>
        <Navbar user= {user}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/post/:id"
            element={user ? <Post /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
