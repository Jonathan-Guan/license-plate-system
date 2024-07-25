import React from "react";
import { Outlet } from "react-router-dom";
import Navibar from "../components/layout-components/NaviBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  return (
    <>
      <Navibar />
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default MainLayout;
