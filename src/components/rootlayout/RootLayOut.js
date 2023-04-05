import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../navbar/NavBar";

function RootLayout() {
  return (
    <div>
      {/* Header */}
      <NavBar />
      {/* Main Content */}
      <div style={{ minHeight: "75vh" }} className="container mt-5">
        {" "}
        <Outlet />
      </div>
    </div>
  );
}
//export RootLayout
export default RootLayout;