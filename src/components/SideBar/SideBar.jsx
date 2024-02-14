import React from "react";
import { Outlet } from "react-router-dom";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="SideBar">
      <aside>SideBar</aside>
      <Outlet />
    </div>
  );
}

export default SideBar;
