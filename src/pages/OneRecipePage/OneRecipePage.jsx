import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import myApi from "../../api/apiHandler";

function OneRecipePage() {
  const [recipe, setRecipe] = useState(null);
  const [familyNames, setFamilyNames] = useState([]);
  const { recipeId } = useParams();

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
