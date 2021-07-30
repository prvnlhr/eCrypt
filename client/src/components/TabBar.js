import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

import { useSelector } from "react-redux";
import tabStyles from "../css/tabBar.module.css";

const TabBar = ({ fieldLength }) => {
  const searchResultArray = useSelector((state) => state.search.searchResults);
  const location = useLocation();
  const indicatorRef = useRef(null);
  const nav1 = useRef(null);
  const nav2 = useRef(null);
  const nav3 = useRef(null);
  const nav4 = useRef(null);
  const nav5 = useRef(null);
  const tabBarRef = useRef(null);

  // const [currActiveLink, setCurrActiveLink] = useState();

  useEffect(() => {
    console.log(location.pathname);
    // console.log(nav1.current);
    // console.log(nav2.current);
    // console.log(nav3.current);
    // console.log(nav4.current);
    // console.log(nav5.current);

    if (tabBarRef.current !== null) {
      // tabBarRef.current.scrollLeft = 150 + "px";
      if (location.pathname === "/dashboard" || "/") {
        // tabBarRef.current.scrollLeft = nav1.current.offsetLeft + "px";
        indicatorRef.current.style.left = nav1.current.offsetLeft + "px";
        nav1.current.scrollIntoView({ behavior: "smooth", inline: "center" });
      }

      if (location.pathname === "/displayCards") {
        // console.log(nav2.current.offsetLeft);
        // tabBarRef.current.scrollLeft = nav2.current.offsetLeft + "px";
        indicatorRef.current.style.left = nav2.current.offsetLeft + "px";
        nav2.current.scrollIntoView({ behavior: "smooth", inline: "center" });
      }
      if (location.pathname === "/displayLogins") {
        // tabBarRef.current.scrollLeft = nav3.current.offsetLeft + "px";
        indicatorRef.current.style.left = nav3.current.offsetLeft + "px";
        nav3.current.scrollIntoView({ behavior: "smooth", inline: "center" });
      }
      if (location.pathname === "/documents") {
        // tabBarRef.current.scrollLeft = nav4.current.offsetLeft + "px";
        indicatorRef.current.style.left = nav4.current.offsetLeft + "px";
        nav4.current.scrollIntoView({ behavior: "smooth", inline: "center" });
      }
      if (
        [
          "/favorites",
          "/favorites/favoritesLogins",
          "/favorites/favoritesCards",
          "/favorites/favoritesDocs",
        ].includes(location.pathname)
      ) {
        // tabBarRef.current.scrollLeft = nav5.current.offsetLeft + "px";
        indicatorRef.current.style.left = nav5.current.offsetLeft + "px";
        nav5.current.scrollIntoView({ behavior: "smooth", inline: "center" });
      }
    }
  }, [tabBarRef.current]);

  const handleNavClick = (e) => {
    var pos = e.target.offsetLeft;
    // var indicator = document.get("indicator");
    console.log(e.target.offsetLeft);
    var newPos = pos + "px";
    indicatorRef.current.style.left = newPos;
    indicatorRef.current.style.width = e.target.offsetWidth / 2 + "px";

    // console.log(e.target, pos ,e.target.offsetWidth);
    // setCurrActiveLink(pos);
  };
  return (
    <>
      {fieldLength > 0 && searchResultArray.length > 0 ? (
        <div className={tabStyles.searchHeadingContainer}>
          <p>Search Results</p>
          <div className={tabStyles.bottomBorderDivSearch}></div>
        </div>
      ) : (
        <div className={tabStyles.tabBarContainer} ref={tabBarRef}>
          <div
            ref={indicatorRef}
            className={tabStyles.indicator}
            // style={{ left: currActiveLink + "px", position: "absolute" }}
          ></div>

          <div
            className={tabStyles.navLinkDiv}
            onClick={handleNavClick}
            ref={nav1}
          >
            <NavLink
              to="/dashboard"
              isActive={() => ["/", "/dashboard"].includes(location.pathname)}
              className={`${tabStyles.navLink}`}
              activeStyle={{
                fontSize: "28px",
                color: "#15192c",
                fontWeight: "900",
                transition: "all 1s cubic-bezier(0.25, 0.8, 0.25, 1)",
              }}
              // onClick={handleNavClick}
            >
              Dashboard
              {/* <div
                className={
                  window.location.pathname === "/dashboard"
                    ? tabStyles.bottomBorderDiv
                    : tabStyles.bottomBorderDivNone
                }
              ></div> */}
            </NavLink>
          </div>
          <div
            className={tabStyles.navLinkDiv}
            onClick={handleNavClick}
            ref={nav2}
          >
            <NavLink
              to="/displayCards"
              className={`${tabStyles.navLink}`}
              activeStyle={{
                fontSize: "28px",
                color: "#15192c",
                fontWeight: "900",
                transition: "all 1s cubic-bezier(0.25, 0.8, 0.25, 1)",
              }}
              // onClick={handleNavClick}
            >
              Cards
              {/* <div
                className={
                  window.location.pathname === "/displayCards"
                    ? tabStyles.bottomBorderDiv
                    : tabStyles.bottomBorderDivNone
                }
              ></div> */}
            </NavLink>
          </div>
          <div
            className={tabStyles.navLinkDiv}
            onClick={handleNavClick}
            ref={nav3}
          >
            <NavLink
              to="/displayLogins"
              className={`${tabStyles.navLink}`}
              activeStyle={{
                fontSize: "28px",
                color: "#15192c",
                fontWeight: "900",
                transition: "all 1s cubic-bezier(0.25, 0.8, 0.25, 1)",
              }}
              // onClick={handleNavClick}
            >
              Logins
              {/* <div
                className={
                  window.location.pathname === "/displayLogins"
                    ? tabStyles.bottomBorderDiv
                    : tabStyles.bottomBorderDivNone
                }
              ></div> */}
            </NavLink>
          </div>
          <div
            className={tabStyles.navLinkDiv}
            onClick={handleNavClick}
            ref={nav4}
          >
            <NavLink
              to="/documents"
              className={`${tabStyles.navLink}`}
              activeStyle={{
                fontSize: "28px",
                color: "#15192c",
                fontWeight: "900",
                transition: "all 1s cubic-bezier(0.25, 0.8, 0.25, 1)",
              }}
              // onClick={handleNavClick}
            >
              Documents
              {/* <div
                className={
                  window.location.pathname === "/documents"
                    ? tabStyles.bottomBorderDiv
                    : tabStyles.bottomBorderDivNone
                }
              ></div> */}
            </NavLink>
          </div>
          <div
            className={tabStyles.navLinkDiv}
            onClick={handleNavClick}
            ref={nav5}
          >
            <NavLink
              to="/favorites/favoritesLogins"
              isActive={() =>
                [
                  "/favorites",
                  "/favorites/favoritesLogins",
                  "/favorites/favoritesCards",
                  "/favorites/favoritesDocs",
                ].includes(location.pathname)
              }
              className={`${tabStyles.navLink}`}
              activeStyle={{
                fontSize: "28px",
                color: "#15192c",
                fontWeight: "900",
                transition: "all 1s cubic-bezier(0.25, 0.8, 0.25, 1)",
              }}
              // onClick={handleNavClick}
            >
              Favorites
              {/* <div
                className={
                  window.location.pathname === "/favorites" ||
                  window.location.pathname === "/favorites/favoritesCards" ||
                  window.location.pathname === "/favorites/favoritesLogins" ||
                  window.location.pathname === "/favorites/favoritesDocs"
                    ? tabStyles.bottomBorderDiv
                    : tabStyles.bottomBorderDivNone
                }
              ></div> */}
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default TabBar;
