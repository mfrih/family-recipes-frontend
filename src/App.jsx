import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
// import LoginPage from "./pages/LoginPage/LoginPage";
import UserMainPage from "./pages/UserMainPage/UserMainPage";
import FamilyPage from "./pages/FamilyPage/FamilyPage";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/welcome" element={<UserMainPage />} />
        <Route path="/my-families/:familyId" element={<FamilyPage />} />
      </Routes>
    </>
  );
}

export default App;
