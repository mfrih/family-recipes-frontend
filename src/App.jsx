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
import RecipeFormPage from "./pages/RecipeFormPage/RecipeFormPage";
import OneRecipePage from "./pages/OneRecipePage/OneRecipePage";
import IsAuthenticated from "./components/Routing/IsAuthenticated";
import SideBar from "./components/SideBar/SideBar";
import RecipeSearchPage from "./pages/RecipeSearchPage/RecipeSearchPage";
import LayoutWithSidebar from "./components/LayoutWithSidebar/LayoutWithSidebar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<IsAuthenticated />}>
          <Route element={<LayoutWithSidebar />}>
            <Route path="/welcome" element={<UserMainPage />} />
            <Route path="/my-families/:familyId" element={<FamilyPage />} />
            <Route path="/my-families/add" element={<AddFamily />} />
            <Route path="/my-recipes" element={<MyRecipesPage />} />
            <Route
              path="/recipes/add"
              element={<RecipeFormPage type="add" />}
            />
            <Route
              path="/recipes/update/:recipeId"
              element={<RecipeFormPage type="update" />}
            />
            <Route path="/recipes/search" element={<RecipeSearchPage />} />
            <Route path="/recipes/:recipeId" element={<OneRecipePage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
