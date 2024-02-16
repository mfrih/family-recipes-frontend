import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useParams, useNavigate, Link } from "react-router-dom";
import myApi from "../../api/apiHandler";
import "./OneRecipePage.css";

function OneRecipePage() {
  const [recipe, setRecipe] = useState(null);
  const [familyNames, setFamilyNames] = useState([]);
  const { recipeId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchRecipe = async () => {
    try {
      const response = await myApi.get(`api/recipes/${recipeId}`);
      setRecipe(response.data);
      // get the familyId array from response.data to pass it to the fonction that will fetch family names
      fetchFamilyNames(response.data.familyId);
    } catch (error) {
      console.error("Failed to fetch recipe:", error);
    }
  };

  //fetch Family Names, since the recipe only has familyIds
  const fetchFamilyNames = async (familyIds) => {
    try {
      const promises = familyIds.map((familyId) =>
        myApi.get(`/api/families/${familyId}`)
      );
      const families = await Promise.all(promises);
      setFamilyNames(families.map((family) => family.data.name));
    } catch (error) {
      console.error("Failed to fetch families for family names:", error);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [recipeId]);

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure about deleting this recipe? Your family members won't be able to access it anymore"
      )
    )
      try {
        await myApi.delete(`api/recipes/${recipeId}`);
        navigate("/my-recipes");
      } catch (error) {
        console.error("Failed to delete recipe", error);
      }
  };

  if (!recipe) {
    return <p>Loading...</p>;
  }

  return (
    <div className="OneRecipePage">
      <div className="recipe-header">
        <h2>{recipe.name}</h2>
        <div className="recipe-buttons">
          {user && user._id === recipe.creatorId && (
            <button onClick={handleDelete}>Delete Recipe</button>
          )}
          {user && user._id === recipe.creatorId && (
            <Link to={`/recipes/update/${recipeId}`}>
              <button>Update Recipe</button>
            </Link>
          )}
        </div>
      </div>
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
        {familyNames.length > 0 ? (
          <ul>
            {familyNames.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
          </ul>
        ) : (
          <p>This recipe has not been shraed with any family, yet.</p>
        )}
      </div>
    </div>
  );
}

export default OneRecipePage;
