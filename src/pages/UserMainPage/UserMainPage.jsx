import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
import myApi from "../../api/apiHandler";

const UserMainPage = () => {
  const [families, setFamilies] = useState([]);
  // const [recipes, setRecipes] = useState([]);
  const { user } = useContext(AuthContext);

  const fetchFamilies = async () => {
    try {
      const response = await myApi.get(`/api/families/my-families`);
      setFamilies(response.data);
    } catch (error) {
      console.log("Error fetching families", error);
    }
  };

  useEffect(() => {
    fetchFamilies();
    [];
  });

  // if (families.length === 0) {
  //   return (
  //     <>
  //       <h2>Your Families</h2>
  //       <p>No families to display</p>
  //     </>
  //   );
  // }

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
                  Access your family recipes...
                </Link>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};

export default UserMainPage;
