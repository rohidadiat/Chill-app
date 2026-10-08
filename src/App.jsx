import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import { movies } from "/src/data/movies";

const DaftarSaya = movies.slice(0, 6);

function App() {
  const [profile, setProfile] = useState({
    name: "Rohid Adiat Alma'arij",
    email: "example@gmail.com",
    password: "example",
    profilePhoto: "",
    isPremium: false,
    expiredPremium: "2026-12-31",
    playList: DaftarSaya,
  });

  const updateProfile = (data) => {
    setProfile((prev) => ({
      ...prev,
      ...data,
    }));
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={<Profile profile={profile} updateProfile={updateProfile} />}
        />
      </Routes>
    </>
  );
}

export default App;
