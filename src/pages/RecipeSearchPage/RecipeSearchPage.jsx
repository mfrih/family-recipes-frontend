import React, { useState } from "react";
import myApi from "../../api/apiHandler";
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

      <div>
        {recipes.map((recipe) => (
          <div key={recipe._id}>{recipe.name}</div>
        ))}
      </div>
    </div>
  );
};

export default RecipeSearch;
