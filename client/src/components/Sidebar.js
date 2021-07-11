import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../actions/auth";
import {
  IoCard,
  IoGrid,
  IoDocumentTextOutline,
  IoGridOutline,
} from "react-icons/io5";
import { IoMdKey, IoMdDocument } from "react-icons/io";
import { FiKey } from "react-icons/fi";
import { CgCreditCard } from "react-icons/cg";
import { RiSettings3Fill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import {
  HiStar,
  HiOutlineDocumentText,
  HiAdjustments,
  HiOutlineLogout,
} from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";

import styles from "../css/sidebar.module.css";

const Sidebar = () => {
  const [sidebarShow, setSidebarShow] = useState(false);
  const [active, setActive] = useState(false);
  const toggleActive = () => {
    setActive(!active);
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const cardsArray = useSelector((state) => state.cards.cards);
  const loginIdsArray = useSelector((state) => state.logins.loginIds);
  const cardsCount = cardsArray.length;
  const loginIdsCount = loginIdsArray.length;
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    dispatch(logout());
    history.push("/login");
  };

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
          activeStyle={{
            color: "white",
            // border: "1px solid #0177fb",
            boxShadow:
              "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
            backgroundColor: "white",
          }}
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
                color={window.location.pathname === "/" ? "#9baece" : "#9baece"}
                fontSize="18px"
              />
            </div>
          ) : (
            <div className={styles.linkDivOpen}>
              <IoGrid
                color={window.location.pathname === "/" ? "#9baece" : "#9baece"}
                fontSize="20px"
              />
              <span className={styles.text}>Dashboard</span>
            </div>
          )}
        </NavLink>

        <NavLink
          activeStyle={{
            color: "white",
            // border: "1px solid #0177fb",
            boxShadow:
              "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
            backgroundColor: "white",

          }}
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
                    ? "#9baece"
                    : "#9baece"
                }
                fontSize="20px"
              />
            </div>
          ) : (
            <div className={styles.linkDivOpen}>
              <IoCard
                color={
                  window.location.pathname === "/displayCards"
                    ? "#9baece"
                    : "#9baece"
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
          activeStyle={{
            color: "white",
            // border: "1px solid #0177fb",
            boxShadow:
              "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
            backgroundColor: "white",
          }}
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
                fontSize="19px"
                name="key"
                color={
                  window.location.pathname === "/displayLogins"
                    ? "#9baece"
                    : "#9baece"
                }
              />
            </div>
          ) : (
            <div className={styles.linkDivOpen}>
              <IoMdKey
                fontSize="19px"
                name="key"
                color={
                  window.location.pathname === "/displayLogins"
                    ? "#9baece"
                    : "#9baece"
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
          activeStyle={{
            color: "white",
            // border: "1px solid #0177fb",
            boxShadow:
              "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
            backgroundColor: "white",
          }}
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
                fontSize="24px"
                fontWeight="750"
                name="key"
                color={
                  window.location.pathname === "/documents"
                    ? "#9baece"
                    : "#9baece"
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
                    ? "#9baece"
                    : "#9baece"
                }
              />
              <span className={styles.text}>LoginIds</span>
            </div>
          )}
        </NavLink>

        <NavLink
          activeStyle={{
            color: "black",
            // border: "1px solid #0177fb",
            boxShadow:
              "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
            backgroundColor: "white",
          }}
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
                    ? "#9baece"
                    : "#9baece"
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
                    ? "#9baece"
                    : "#9baece"
                }
              />
              <span className={styles.text}>LoginIds</span>
            </div>
          )}
        </NavLink>

        <NavLink
          activeStyle={{
            color: "white",
            // border: "1px solid cyan",
            backgroundColor: "white",
            boxShadow:
              "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
          }}
          className={
            sidebarShow === false ? styles.NavLinkClose : styles.NavLink
          }
          exact
          to="/settings"
          onClick={toggleActive}
        >
          {sidebarShow === false ? (
            <div className={styles.linkDivClose}>
              <HiAdjustments
                fontSize="20px"
                name="key"
                color={
                  window.location.pathname === "/settings"
                    ? "#9baece"
                    : "#9baece"
                }
              />
            </div>
          ) : (
            <div className={styles.linkDivOpen}>
              <HiAdjustments
                fontSize="20px"
                name="key"
                color={
                  window.location.pathname === "/settings"
                    ? "#9baece"
                    : "#9baece"
                }
              />
              <span className={styles.text}>LoginIds</span>
            </div>
          )}
        </NavLink>
        
      </div>
      <div className={styles.logoutBtnDiv}>
          <button className={styles.logOutBtn} onClick={handleLogout}>
            <HiOutlineLogout fontSize="21px" color="black" />
          <p className={styles.logoutText}>Log Out</p>
          </button>
        </div>
    </div>
  );
};
export default Sidebar;
