import React, { useState } from "react";
import { Logo } from "../../shared/assets";
import { BsSearch } from "react-icons/bs";
import "./mobileNavbar.scss";
import { SearchInputField } from "../../shared/ui/InputField/inputField";
import { MdOutlineCancel } from "react-icons/md";
import { Link } from "react-router-dom";

function MobileNavbar() {
  const [openSearch, setOpenSearch] = useState(false);

  function handleOpenSearch() {
    setOpenSearch(!openSearch);
  }
  return (
    <div className="mobile">
      <div className="mobile_nav">
        <div className="mobile_nav_logo">
          <Link to="/">
            <img src={Logo} alt="company logo" />
          </Link>
        </div>
        <div className="search_icon">
          {openSearch ? (
            <MdOutlineCancel
              className="search_icon"
              onClick={handleOpenSearch}
            />
          ) : (
            <BsSearch onClick={handleOpenSearch} className="search_icon" />
          )}
        </div>
      </div>
      {openSearch && (
        <div className="search_field">
          <div className="search">
            <SearchInputField placeholder="Search" />
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileNavbar;
