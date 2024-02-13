import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import myApi from "../../api/apiHandler";

function OneRecipePage() {
  const [recipe, setRecipe] = useState(null);
  const { recipeId } = useParams();

  const fetchRecipe = async () => {
    try {
      const response = await myApi.get(`api/recipes/${recipeId}`);
      setRecipe(response.data);
    } catch (error) {
      console.error("Failed to fetch recipe:", error);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{recipe.name}</h2>
      <p>Servings:for {recipe.servings} people</p>
      <div>
        <h4>Ingredients</h4>
        <p>{recipe.ingredients}</p>
      </div>
      <div>
        <h4>Instructions</h4>
        <p>{recipe.instructions}</p>
      </div>
      <div>
        <h4>Families shared with</h4>
        {/* todo : map ici les familles que l'on récupère dans la recette */}
      </div>
    </div>
  );
}

export default OneRecipePage;
