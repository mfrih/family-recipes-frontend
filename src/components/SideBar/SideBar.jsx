import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="SideBar">
      <aside>
        <Link to={"/recipes/search"}>
          <h4>🔎 Search for recipes</h4>
        </Link>
      </aside>
      <Outlet />
    </div>
  );
}

export default SideBar;
