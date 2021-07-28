import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import { useSelector } from "react-redux";
import tabStyles from "../css/tabBar.module.css";

const TabBar = ({ fieldLength }) => {
  const searchResultArray = useSelector((state) => state.search.searchResults);
  const { pathname } = useLocation();

  // useEffect(() => {

  // }, [filedLength])
  return (
    <>
      {fieldLength > 0 && searchResultArray.length > 0 ? (
        <div className={tabStyles.searchHeadingContainer}>
          <p>Search Results</p>
          <div className={tabStyles.bottomBorderDivSearch}></div>
        </div>
      ) : (
        <div className={tabStyles.tabBarContainer}>
          <NavLink
            to="/dashboard"
            className={`${tabStyles.navLink}`}
            activeStyle={{
              fontSize: "28px",
              color: "#15192c",
              fontWeight: "700",
            }}
          >
            Dashboard
            <div
              className={
                window.location.pathname === "/dashboard"
                  ? tabStyles.bottomBorderDiv
                  : tabStyles.bottomBorderDivNone
              }
            ></div>
          </NavLink>
          <NavLink
            to="/displayCards"
            className={`${tabStyles.navLink}`}
            activeStyle={{
              fontSize: "28px",
              color: "#15192c",
              fontWeight: "700",
            }}
          >
            Cards
            <div
              className={
                window.location.pathname === "/displayCards"
                  ? tabStyles.bottomBorderDiv
                  : tabStyles.bottomBorderDivNone
              }
            ></div>
          </NavLink>
          <NavLink
            to="/displayLogins"
            className={`${tabStyles.navLink}`}
            activeStyle={{
              fontSize: "28px",
              color: "#15192c",
              fontWeight: "700",
            }}
          >
            Logins
            <div
              className={
                window.location.pathname === "/displayLogins"
                  ? tabStyles.bottomBorderDiv
                  : tabStyles.bottomBorderDivNone
              }
            ></div>
          </NavLink>
          <NavLink
            to="/documents"
            className={`${tabStyles.navLink}`}
            activeStyle={{
              fontSize: "28px",
              color: "#15192c",
              fontWeight: "700",
            }}
          >
            Documents
            <div
              className={
                window.location.pathname === "/documents"
                  ? tabStyles.bottomBorderDiv
                  : tabStyles.bottomBorderDivNone
              }
            ></div>
          </NavLink>
          <NavLink
            to="/favorites/favoritesLogins"
            isActive={() =>
              [
                "/favorites",
                "/favorites/favoritesLogins",
                "/favorites/favoritesCards",
                "/favorites/favoritesDocs",
              ].includes(pathname)
            }
            className={`${tabStyles.navLink}`}
            activeStyle={{
              fontSize: "28px",
              color: "#15192c",
              fontWeight: "700",
            }}
          >
            Favorites
            <div
              className={
                window.location.pathname === "/favorites" ||
                window.location.pathname === "/favorites/favoritesCards" ||
                window.location.pathname === "/favorites/favoritesLogins" ||
                window.location.pathname === "/favorites/favoritesDocs"
                  ? tabStyles.bottomBorderDiv
                  : tabStyles.bottomBorderDivNone
              }
            ></div>
          </NavLink>
        </div>
      )}
    </>
  );
};

export default TabBar;
