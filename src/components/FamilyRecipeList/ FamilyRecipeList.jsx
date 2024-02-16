import React, { useState, useEffect } from "react";
import myApi from "../../api/apiHandler";
import OneRecipeCard from "../OneRecipeCard/OneRecipeCard";
import "./FamilyRecipeList.css";

const FamilyRecipeList = ({ family }) => {
  const [recipes, setRecipes] = useState([]);

  const fetchFamilyRecipes = async () => {
    try {
      const response = await myApi.get(`api/families/${family._id}/recipes`);
      setRecipes(response.data);
    } catch (error) {
      console.error("Failed to fetch recipes for one family:", error);
    }
  };

  useEffect(() => {
    fetchFamilyRecipes();
  }, [family]);

  if (recipes.length === 0) {
    return (
      <p>
        No recipes found for this family. What a shame! Why don't you add some?
        😇
      </p>
    );
  }

  return (
    <div>
      <h2>Your Family (secret) Recipes</h2>
      <div className="FamilyRecipeList">
        {recipes.map((recipe) => (
          <OneRecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default FamilyRecipeList;
