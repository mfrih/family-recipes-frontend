import React, { useState } from "react";
import myApi from "../../api/apiHandler";
import OneRecipeCard from "../../components/OneRecipeCard/OneRecipeCard";
import "./RecipeSearchPage.css";

const RecipeSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await myApi.get(
        `/api/recipes/?searchQuery=${searchQuery}`,
        {}
      );
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="RecipeSearchPage">
      <h2>What would you like to eat?</h2>
      <p>
        Have an ingredient in mind? The name of a recipe? Our powerful search
        will look into all the recipes you have access to...
      </p>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for recipes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="search-results">
        {recipes.map((recipe) => (
          <OneRecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeSearch;
