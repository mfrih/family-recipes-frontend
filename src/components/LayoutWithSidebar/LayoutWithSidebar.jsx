import React from "react";
import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";
import "./LayoutWithSidebar.css";

function LayoutWithSidebar() {
  return (
    <div className="LayoutWithSidebar">
      <SideBar />
      <Outlet className="outlet" />
    </div>
  );
}

export default LayoutWithSidebar;
