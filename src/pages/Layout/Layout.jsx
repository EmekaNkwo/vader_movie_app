import React from "react";
import useMediaQuery from "../../shared/hooks/useMediaQuery";
import { Outlet } from "react-router-dom";
import { Footer, MobileNavbar, Topbar } from "../../components";
import "./layout.scss";

export default function Layout() {
  const isSmallScreen = useMediaQuery("(max-width: 1023px)");
  const navbar = isSmallScreen ? <MobileNavbar /> : <Topbar />;

  return (
    <div className="layout_container">
      {navbar}
      <div className="outlet_container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
