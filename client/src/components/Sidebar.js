import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { IoCard, IoGrid } from "react-icons/io5";
import { IoMdKey, IoMdDocument } from "react-icons/io";
import { RiSettings3Fill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { HiStar } from "react-icons/hi";

import styles from "../css/sidebar.module.css";

const Sidebar = () => {
  const [sidebarShow, setSidebarShow] = useState(false);
  const [active, setActive] = useState(false);
  const toggleActive = () => {
    setActive(!active);
  };
  const cardsArray = useSelector((state) => state.cards.cards);
  const loginIdsArray = useSelector((state) => state.logins.loginIds);
  const cardsCount = cardsArray.length;
  const loginIdsCount = loginIdsArray.length;

  return (
    <div
      className={
        sidebarShow === false ? styles.sidebarCollapse : styles.sidebar
      }
    >
      <div
        className={
          sidebarShow === false
            ? styles.burgerBtnContainerClose
            : styles.burgerBtnContainer
        }
      ></div>
      <div className={styles.linksContainer}>
        <NavLink
          activeStyle={{ color: "black" }}
          className={
            sidebarShow === false ? styles.NavLinkClose : styles.NavLink
          }
          exact
          to="/"
          onClick={toggleActive}
        >
          {sidebarShow === false ? (
            <div className={styles.linkDivClose}>
              <IoGrid
                color={window.location.pathname === "/" ? "#001a38" : "#b3bac3"}
                fontSize="18px"
              />
            </div>
          ) : (
            <div className={styles.linkDivOpen}>
              <IoGrid
                color={window.location.pathname === "/" ? "#001a38" : "#b3bac3"}
                fontSize="18px"
              />
              <span className={styles.text}>Dashboard</span>
            </div>
          )}
        </NavLink>

        <NavLink
          activeStyle={{ color: "white" }}
          className={
            sidebarShow === false ? styles.NavLinkClose : styles.NavLink
          }
          exact
          to="/displayCards"
          onClick={toggleActive}
        >
          {sidebarShow === false ? (
            <div className={styles.linkDivClose}>
              <IoCard
                color={
                  window.location.pathname === "/displayCards"
                    ? "#001a38"
                    : "#b3bac3"
                }
                fontSize="20px"
              />
            </div>
          ) : (
            <div className={styles.linkDivOpen}>
              <IoCard
                color={
                  window.location.pathname === "/displayCards"
                    ? "#b3bac3"
                    : "#001a38"
                }
                fontSize="20px"
              />
              <span className={styles.text}>
                Cards<span className={styles.cardCount}>{cardsCount}</span>
              </span>
            </div>
          )}
        </NavLink>

        <NavLink
          activeStyle={{ color: "white" }}
          className={
            sidebarShow === false ? styles.NavLinkClose : styles.NavLink
          }
          exact
          to="/displayLogins"
          onClick={toggleActive}
        >
          {sidebarShow === false ? (
            <div className={styles.linkDivClose}>
              <IoMdKey
                fontSize="20px"
                name="key"
                color={
                  window.location.pathname === "/displayLogins"
                    ? "#001a38"
                    : "#b3bac3"
                }
              />
            </div>
          ) : (
            <div className={styles.linkDivOpen}>
              <IoMdKey
                fontSize="20px"
                name="key"
                color={
                  window.location.pathname === "/displayLogins"
                    ? "#001a38"
                    : "#b3bac3"
                }
              />
              <span className={styles.text}>
                LoginIds
                <span className={styles.cardCount}>{loginIdsCount}</span>
              </span>
            </div>
          )}
        </NavLink>
        <NavLink
          activeStyle={{ color: "white" }}
          className={
            sidebarShow === false ? styles.NavLinkClose : styles.NavLink
          }
          exact
          to="/documents"
          onClick={toggleActive}
        >
          {sidebarShow === false ? (
            <div className={styles.linkDivClose}>
              <IoMdDocument
                fontSize="20px"
                name="key"
                color={
                  window.location.pathname === "/documents"
                    ? "#001a38"
                    : "#b3bac3"
                }
              />
            </div>
          ) : (
            <div className={styles.linkDivOpen}>
              <IoMdDocument
                fontSize="20px"
                name="key"
                color={
                  window.location.pathname === "/documents"
                    ? "#001a38"
                    : "#b3bac3"
                }
              />
              <span className={styles.text}>LoginIds</span>
            </div>
          )}
        </NavLink>

        <NavLink
          activeStyle={{ color: "black" }}
          className={
            sidebarShow === false ? styles.NavLinkClose : styles.NavLink
          }
          exact
          to="/favorites/favoritesLogins"
          onClick={toggleActive}
        >
          {sidebarShow === false ? (
            <div className={styles.linkDivClose}>
              <HiStar
                fontSize="20px"
                name="key"
                color={
                  window.location.pathname === "/favorites/favoritesCards" ||
                  window.location.pathname === "/favorites/favoritesLogins" ||
                  window.location.pathname === "/favorites/favoritesDocs"
                    ? "#001a38"
                    : "#b3bac3"
                }
              />
            </div>
          ) : (
            <div className={styles.linkDivOpen}>
              <HiStar
                fontSize="20px"
                name="key"
                color={
                  window.location.pathname === "/favorites"
                    ? "#001a38"
                    : "#b3bac3"
                }
              />
              <span className={styles.text}>LoginIds</span>
            </div>
          )}
        </NavLink>

        <NavLink
          activeStyle={{ color: "white" }}
          className={
            sidebarShow === false ? styles.NavLinkClose : styles.NavLink
          }
          exact
          to="/settings"
          onClick={toggleActive}
        >
          {sidebarShow === false ? (
            <div className={styles.linkDivClose}>
              <RiSettings3Fill
                fontSize="20px"
                name="key"
                color={
                  window.location.pathname === "/settings"
                    ? "#001a38"
                    : "#b3bac3"
                }
              />
            </div>
          ) : (
            <div className={styles.linkDivOpen}>
              <RiSettings3Fill
                fontSize="20px"
                name="key"
                color={
                  window.location.pathname === "/settings"
                    ? "#001a38"
                    : "#b3bac3"
                }
              />
              <span className={styles.text}>LoginIds</span>
            </div>
          )}
        </NavLink>
      </div>
    </div>
  );
};
export default Sidebar;
