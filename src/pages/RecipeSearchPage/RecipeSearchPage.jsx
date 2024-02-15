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

  return (
    <div className="RecipeSearchPage">
      <input
        type="text"
        placeholder="Search for recipes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div className="search-results">
        {recipes.map((recipe) => (
          <OneRecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeSearch;
