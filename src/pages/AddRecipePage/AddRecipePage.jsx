import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import myApi from "../../api/apiHandler";

const AddRecipePage = () => {
  const [formState, setFormstate] = useState({
    name: "",
    servings: "",
    ingredients: "",
    instructions: "",
  });

  // const [families, setFamilies] = useState([]);

  const navigate = useNavigate();

  // const fetchFamilies = async () => {
  //   try {
  //     const response = await myApi.get("/api/my-families");
  //     setFamilies(response.data);
  //   } catch (error) {
  //     console.error("Error fetching families", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchFamilies();
  // }, []);

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;
    setFormstate({ ...formState, [key]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await myApi.post("/api/recipes", formState);
      // TODO FAUDRA CREER CETTE ROUTE ET CETTE PAGE EN FRONT
      navigate(`/my-recipes/${response.data._id}`);
    } catch (error) {
      console.error("Error whilst creating recipe", error);
    }
  };

  return (
    <div>
      <h2>Create a new recipe 👩🏾‍🍳</h2>
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
        <button type="submit">Create Recipe</button>
      </form>

      {/* TODO REVOIR POURQUOI JE N'ARRIVE PAS A FETCH LES FAMILLES ET ENSUITE VOIR COMMENT GERER LEUR SELECTION AVEC L'ETAT DE LA CHECKBOX */}

      {/* <form>
        <fieldset>
          <legend>Wanna share you recipe with your family/families?</legend>
          {families.map((family) => (
            <label key={family._id}>
              <input type="checkbox" id={family._id} value={family._id} />
              {family.name}
            </label>
          ))}
        </fieldset>
      </form> */}
    </div>
  );
};

export default AddRecipePage;
