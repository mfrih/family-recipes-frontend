import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
import myApi from "../../api/apiHandler";
import "./UserMainPage.css";

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
      <div className="my-families-wrapper">
        <h2>Your families</h2>
        <Link to={`/my-families/add`}>Create a new family</Link>
        {families.length === 0 ? (
          <p>
            You don't belong to any family. Si tu ne veux pas être un·e Rémi
            sans famille, crée ta propre famille
          </p>
        ) : (
          families.map((oneFamily) => {
            return (
              <article key={oneFamily._id}>
                <p>{oneFamily.name}</p>
                <Link to={`/my-families/${oneFamily._id}`}>
                  Access your family recipes and members...
                </Link>
              </article>
            );
          })
        )}
      </div>

      <div className="my-recipes-wrapper">
        <h2>Your added recipes</h2>
        <Link to={`/my-recipes/add`}>Create a new recipe</Link>
        {recipes.length === 0 ? (
          <p>
            You haven't created any recipe yet. That would be nice to create one
            and share it, as we say "sharing is caring"!
          </p>
        ) : (
          recipes.map((oneRecipe) => {
            return (
              <Link to={`/my-recipes/${oneRecipe._id}`}>
                <article key={oneRecipe._id} className="recipe-card">
                  <p>{oneRecipe.name}</p>
                  <p>Servings: {oneRecipe.servings}</p>
                </article>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default UserMainPage;
