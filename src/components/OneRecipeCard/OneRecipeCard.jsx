import React from "react";
import { Link } from "react-router-dom";
import "./OneRecipeCard.css";

function OneRecipeCard({ recipe }) {
  return (
    <Link to={`/recipes/${recipe._id}`} className="OneRecipeCard">
      <div>
        <h3>{recipe.name}</h3>
        <p>Servings: for {recipe.servings} people</p>
      </div>
    </Link>
  );
}

export default OneRecipeCard;
