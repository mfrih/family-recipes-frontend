import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
import myApi from "../../api/apiHandler";
import "./UserMainPage.css";
import OneFamilyCard from "../../components/OneFamilyCard/OneFamilyCard";
import OneRecipeCard from "../../components/OneRecipeCard/OneRecipeCard";

const UserMainPage = () => {
  const [families, setFamilies] = useState(null);
  const [recipes, setRecipes] = useState(null);
  const { user } = useContext(AuthContext);

  const fetchFamilies = async () => {
    try {
      const familyResponse = await myApi.get(`/api/families/my-families`);
      setFamilies(familyResponse.data);
    } catch (error) {
      console.log("Error fetching families", error);
    }
  };

  const fetchRecipes = async () => {
    try {
      const recipeResponse = await myApi.get(`/api/recipes/my-recipes`);
      setRecipes(recipeResponse.data);
    } catch (error) {
      console.log("Error fetching recipes", error);
    }
  };

  useEffect(() => {
    fetchFamilies();
    fetchRecipes();
  }, []);

  if (!families || !recipes) {
    return <p>Loading...</p>;
  }

  return (
    <div className="UserMainPage">
      <div className="welcome-user">
        <h2>
          <img src="/cooking-pot.png" />
          {"  "}Welcome {user.username}
        </h2>
      </div>
      <div className="my-families-wrapper">
        <div className="section-header">
          <h3>Your family Recipe Books</h3>
          <button className="add-button">
            <Link to={`/my-families/add`}> ⊕ Add Family</Link>
          </button>
        </div>
        <div className="section-content">
          {families.length === 0 ? (
            <p>You don't belong to any family. Consider creating your own.</p>
          ) : (
            families.map((family) => (
              <OneFamilyCard key={family._id} family={family} />
            ))
          )}
        </div>
      </div>
      <div className="my-recipes-wrapper">
        <div className="section-header">
          <h3>Your added recipes</h3>
          <button className="add-button">
            <Link to={`/recipes/add`}> ⊕ Add Recipe</Link>
          </button>
        </div>
        <div className="section-content">
          {recipes.length === 0 ? (
            <p>
              You haven't created any recipes yet. Why don't you add one and
              share it with your family?
            </p>
          ) : (
            recipes.map((recipe) => (
              <OneRecipeCard key={recipe._id} recipe={recipe} />
            ))
          )}
        </div>
      </div>
      {/* <div>
        <h2>Signature recipes from your families</h2>
      </div>
      <div>
        <h2>Recently added recipes</h2>
      </div> */}
    </div>
  );
};

export default UserMainPage;
