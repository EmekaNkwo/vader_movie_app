import React from "react";
import { Logo } from "../../shared/assets";
import { Link } from "react-router-dom";
import "./topbar.scss";
import { SearchInputField } from "../../shared/ui/InputField/inputField";

function Topbar() {
  return (
    <div className="topbar">
      <div className="topbar_logo">
        <Link to="/">
          <img src={Logo} alt="company logo" />
        </Link>
      </div>
      <div className="search_field">
        <SearchInputField placeholder="Search" />
      </div>
    </div>
  );
}

export default Topbar;
