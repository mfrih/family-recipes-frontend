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
      // fetch families with a checked status set to false
      const familiesWithCheckStatus = response.data.map((family) => ({
        ...family,
        checked: false,
      }));
      setFamilies(familiesWithCheckStatus);
    } catch (error) {
      console.error("Error fetching families", error);
    }
  };

  const fetchRecipe = async () => {
    try {
      const response = await myApi.get(`api/recipes/${recipeId}`);
      const recipeData = response.data;
      console.log(recipeData);
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

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setFormState({ ...formState, [key]: value });
  };

  const handleCheckFamily = (id) => {
    // Deep clone the families array so we are not mutating the state
    const familiesCopy = structuredClone(families);
    // find the family we need to toggle by finding its index
    const familyIndex = familiesCopy.findIndex((family) => family._id === id);
    // toggle the checked property if family is found in the array
    if (familyIndex !== -1) {
      familiesCopy[familyIndex].checked = !familiesCopy[familyIndex].checked;
    }

    setFamilies(familiesCopy);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // filter on families that are checked  to get every id
    const checkedFamilies = families.filter((family) => family.checked);
    // get a new array with only ids of the filtered families
    const checkedFamiliesIds = checkedFamilies.map((family) => family._id);
    // append the familyIds array to the formState
    const data = { ...formState, familyId: checkedFamiliesIds };
    try {
      if (type === "add") {
        const addRecipeResponse = await myApi.post("/api/recipes", data);
        navigate(`/recipes/${addRecipeResponse.data._id}`);
      } else {
        const updateRecipeResponse = await myApi.put(
          `/api/recipes/${recipeId}`,
          data
        );
        navigate(`/recipes/${updateRecipeResponse.data._id}`);
      }
    } catch (error) {
      console.error("Error whilst creating recipe", error);
    }
  };

  const displayedFamilies = families.map((oneFamily) => {
    const clone = { ...oneFamily };
    if (formState.familyId.includes(clone._id)) {
      clone.checked = true;
    }
    return clone;
  });

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
          {displayedFamilies.map((family) => (
            <label key={family._id}>
              <input
                type="checkbox"
                id={family._id}
                value={family._id}
                checked={family.checked}
                onChange={() => handleCheckFamily(family._id)}
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
