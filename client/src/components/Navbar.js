import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { HiSearch, HiX, HiChevronDown, HiChevronUp } from "react-icons/hi";
import { RiSettings3Fill, RiSearch2Line } from "react-icons/ri";
import { CgCloseO } from "react-icons/cg";
import styles from "../css/navbar.module.css";
import { logout } from "../actions/auth";
import { search } from "../actions/searchAction";
const Navbar = ({ fieldLength, setFieldLength }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSearch = (val) => {
    dispatch(search(val));
  };

  if (user.firstName) {
    console.log(user.firstName.charAt(0));
  }

  const [searchQuery, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleDownArrowClick = () => {
    setShowPopup(!showPopup);
  };
  const switchSearchMode = () => {
    setSearchMode(!searchMode);
    setFieldLength(null);
    setQuery("");
  };

  useEffect(() => {
    handleSearch(searchQuery);
    setFieldLength(searchQuery.length);
  }, [searchQuery]);

  useEffect(() => {}, [user.firstName]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    dispatch(logout());
    history.push("/login");
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.leftPortion}>
        <div className={styles.logoContainer}>
          <p className={styles.logoText}>
            <span>e</span>Crypt
          </p>
        </div>
      </div>
      <div className={styles.rightPortion}>
        <div
          className={
            searchMode ? styles.inputContainer : styles.inputContainerSmall
          }
        >
          {searchMode ? (
            <div className={styles.inputDiv}>
              <input
                value={searchQuery}
                placeholder="Search"
                onChange={(e) => setQuery(e.target.value)}
              ></input>
            </div>
          ) : null}

          {searchMode ? (
            <div onClick={switchSearchMode} className={styles.searchIconDiv}>
              <HiX fontSize="16px" color="black" />
            </div>
          ) : (
            <div onClick={switchSearchMode} className={styles.searchIconDiv}>
              <RiSearch2Line fontSize="16px" color="#4CD7F6" />
            </div>
          )}
        </div>
        <div className={styles.usernameDiv}>
          <div className={styles.nameLetterDiv}>
            {user.firstName ? <p>{user.firstName.charAt(0)}</p> : null}
          </div>
          <div className={styles.nameDiv}>
            <p>{user.firstName}</p>
          </div>
          {/* {showPopup ? (
            <HiChevronUp
              className={styles.downBtn}
              onClick={handleDownArrowClick}
              fontSize="18px"
              color="slategray"
            />
          ) : (
            <HiChevronDown
              className={styles.downBtn}
              onClick={handleDownArrowClick}
              fontSize="18px"
              color="slategray"
            />
          )} */}
        </div>
        {/* {showPopup ? (
          <div
            className={styles.userPopupDiv}
          >
            <button className={styles.logOutBtn} onClick={handleLogout}>
              <FiLogOut fontSize="15px" color="b3bac3" />
              <p>Logout</p>
            </button>
          </div>
        ) : null} */}
      </div>
    </div>
  );
};
export default Navbar;
