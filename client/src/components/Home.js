import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

import homeStyles from "../css/home.module.css";
import ContentDisplay from "./ContentDisplay";
import SidebarStyles from "../css/sidebar.module.css";
import { HiMenuAlt2, HiX } from "react-icons/hi";
import Sidebar from "./Sidebar";

import Navbar from "./Navbar";

const Home = () => {
  const [sidebarShow, setSidebarShow] = useState(true);
  const [heading, setHeading] = useState();
  const [fieldLength, setFieldLength] = useState(null);

  const searchResultArray = useSelector((state) => state.search.searchResults);

  const toggleSidebar = () => {
    setSidebarShow(!sidebarShow);
  };

  return (
    <div
      className={
        sidebarShow === true
          ? `${homeStyles.homeComponent} ${homeStyles.homeComponentExpand}`
          : `${homeStyles.homeComponent}`
      }
    >
      <Sidebar />
      <Navbar fieldLength={fieldLength} setFieldLength={setFieldLength} />

      <div className={homeStyles.hamburgerContainer} onClick={toggleSidebar}>
        {sidebarShow === true ? (
          <HiX className={SidebarStyles.hamXIcon} />
        ) : (
          <HiMenuAlt2 className={SidebarStyles.hamMenuIcon} />
        )}
      </div>
      <div className={homeStyles.headingDiv}>
        <div className={homeStyles.headingTextWrapper}>
          {fieldLength > 0 && searchResultArray.length > 0 ? (
            <p className={homeStyles.headingText}>Search Results</p>
          ) : (
            <p className={homeStyles.headingText}>{heading}</p>
          )}
        </div>
      </div>

      <ContentDisplay
        heading={heading}
        setHeading={setHeading}
        fieldLength={fieldLength}
        setFieldLength={setFieldLength}
      />
    </div>
  );
};

export default Home;
