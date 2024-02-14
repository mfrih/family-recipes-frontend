import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import myApi from "../../api/apiHandler";
import "./RecipeFormPage.css";

const RecipeFormPage = ({ type }) => {
  const [formState, setFormState] = useState({
    name: "",
    servings: "",
    ingredients: "",
    instructions: "",
    familyId: [],
  });
  const { recipeId } = useParams();
  const [families, setFamilies] = useState([]);

  const navigate = useNavigate();

  const fetchFamilies = async () => {
    try {
      const response = await myApi.get("/api/families/my-families");
      setFamilies(response.data);
    } catch (error) {
      console.error("Error fetching families", error);
    }
  };

  const fetchRecipe = async () => {
    try {
      const response = await myApi.get(`api/recipes/${recipeId}`);
      const recipeData = response.data;
      setFormState({
        name: recipeData.name,
        servings: recipeData.servings,
        ingredients: recipeData.ingredients,
        instructions: recipeData.instructions,
        familyId: recipeData.familyId,
      });
    } catch (error) {
      console.log("Failed to fetch recipe to update it", error);
    }
  };

  useEffect(() => {
    fetchFamilies();
    if (type === "update") {
      fetchRecipe();
    }
  }, []);

  // this handle the change in any form field except from the family one
  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setFormState({ ...formState, [key]: value });
  };

  const handleToggleFamily = (e) => {
    // we get this from the fieldset data for each family
    const familyIdValue = e.target.id;
    const isChecked = e.target.checked;
    // we update the formState
    if (isChecked) {
      setFormState({
        ...formState,
        familyId: [...formState.familyId, familyIdValue],
      });
    } else {
      const filteredFamilyIds = formState.familyId.filter(
        (id) => id !== familyIdValue
      );
      setFormState({
        ...formState,
        familyId: filteredFamilyIds,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === "add") {
        const addRecipeResponse = await myApi.post("/api/recipes", formState);
        navigate(`/recipes/${addRecipeResponse.data._id}`);
      } else {
        const updateRecipeResponse = await myApi.put(
          `/api/recipes/${recipeId}`,
          formState
        );
        navigate(`/recipes/${updateRecipeResponse.data._id}`);
      }
    } catch (error) {
      console.error("Error whilst creating recipe", error);
    }
  };

  return (
    <div className="RecipeFormPage">
      <h2>{type === "add" ? "Create" : "Update"} a new recipe 👩🏾‍🍳</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="name"
          onChange={handleChange}
          value={formState.name}
          placeholder="Recipe name"
          required
        />
        <input
          type="number"
          id="servings"
          onChange={handleChange}
          value={formState.servings}
          placeholder="For how many people?"
          required
        />
        <textarea
          id="ingredients"
          onChange={handleChange}
          value={formState.ingredients}
          placeholder="List of ingredients - do not hesitate to use bullet points to separate them."
          rows="20"
          cols="100"
          required
        />
        <textarea
          id="instructions"
          onChange={handleChange}
          value={formState.instructions}
          placeholder="List of ingredients - do not hesitate to use bullet points to separate them."
          rows="20"
          cols="100"
          required
        />
        <fieldset>
          <legend>Wanna share you recipe with your family/families?</legend>
          {families.map((family) => (
            <label key={family._id}>
              <input
                type="checkbox"
                id={family._id}
                value={family._id}
                checked={formState.familyId.includes(family._id)}
                onChange={handleToggleFamily}
              />
              {family.name}
            </label>
          ))}
        </fieldset>
        <button type="submit">
          {type === "add" ? "Create" : "Update"} Recipe
        </button>
      </form>
    </div>
  );
};

export default RecipeFormPage;
