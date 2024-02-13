import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import UserMainPage from "./pages/UserMainPage/UserMainPage";
import FamilyPage from "./pages/FamilyPage/FamilyPage";
import NavBar from "./components/NavBar/NavBar";
import AddFamily from "./pages/AddFamily/AddFamily";
import MyRecipesPage from "./pages/MyRecipesPage/MyRecipesPage";
import AddRecipePage from "./pages/AddRecipePage/AddRecipePage";
import OneRecipePage from "./pages/OneRecipePage/OneRecipePage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* create isAuthenticated route */}
        <Route path="/welcome" element={<UserMainPage />} />
        <Route path="/my-families/:familyId" element={<FamilyPage />} />
        <Route path="/my-families/add" element={<AddFamily />} />
        <Route path="/my-recipes" element={<MyRecipesPage />} />
        <Route path="/my-recipes/add" element={<AddRecipePage />} />
        <Route path="/my-recipes/:recipeId" element={<OneRecipePage />} />
      </Routes>
    </>
  );
}

export default App;
