import React, { useContext, useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import "./SideBar.css";
import myApi from "../../api/apiHandler";

function SideBar() {
  const [families, setFamilies] = useState([]);

  useEffect(() => {
    const fetchFamilies = async () => {
      try {
        const response = await myApi.get(`/api/families/my-families`);
        setFamilies(response.data);
      } catch (error) {
        console.error("Error fetching families", error);
      }
    };

    fetchFamilies();
  }, []);

  return (
    <div className="SideBar">
      <aside>
        <Link to={"/welcome"}>
          <h4>
            <img src="/iconmonstr-home-1-16.png" /> Home
          </h4>
        </Link>
        <Link to={"/recipes/search"}>
          <h4>
            <img src="/iconmonstr-magnifier-3-16.png" /> Search for recipes
          </h4>
        </Link>
        <hr />
        <div>
          <h4>
            <img src="/iconmonstr-book-28-16.png" /> Your Family Recipe Books
          </h4>
          {families.length > 0 ? (
            families.map((family) => (
              <Link to={`/my-families/${family._id}`} key={family._id}>
                <p>{family.name}</p>
              </Link>
            ))
          ) : (
            <div>
              <p>You're not part of any family yet</p>
              <Link className="family-add-link" to="/my-families/add">
                <p> ＋ Create your own family</p>
              </Link>
            </div>
          )}
        </div>

        <hr />
        <Link to={"/recipes/generated-by-MametteAI"}>
          <h4>
            <img src="/iconmonstr-magic-1-16.png" /> Need Inspiration, let
            Mamette<sup>AI</sup> help you!
          </h4>
        </Link>
        <hr />
        <Link to={"/my-recipes"}>
          <h4>
            {" "}
            <img src="/iconmonstr-cook-1-16.png" /> My Recipes, coming soon...
          </h4>
        </Link>
      </aside>
    </div>
  );
}

export default SideBar;
