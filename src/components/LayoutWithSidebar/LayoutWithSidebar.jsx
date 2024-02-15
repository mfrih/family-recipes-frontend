import React from "react";
import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";
import "./LayoutWithSidebar.css";

function LayoutWithSidebar() {
  return (
    <div className="layoutWithSidebar">
      <SideBar />
      <Outlet />
    </div>
  );
}

export default LayoutWithSidebar;
