import React from "react";
import { Link } from "react-router-dom";
import "./OneRecipeCard.css";

function OneRecipeCard({ recipe }) {
  return (
    <Link to={`/recipes/${recipe._id}`} className="OneRecipeCard">
      <div>
        <h4>{recipe.name}</h4>
        <p>for {recipe.servings} people</p>
        <p>By {recipe.creatorId.username}</p>
      </div>
    </Link>
  );
}

export default OneRecipeCard;
