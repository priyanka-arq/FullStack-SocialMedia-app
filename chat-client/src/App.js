import { Person } from "@mui/icons-material";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContex } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
function App() {
  const { user } = useContext(AuthContex);
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <Register />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/messenger" element={!user ? <Home /> : <Messenger />} />
          <Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
