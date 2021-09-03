import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { HiX, HiChevronDown, HiChevronUp } from "react-icons/hi";
import logo from "../../img/ecryptLogo.svg";
import PencilIcon from "../icons/PencilIcon";


import { RiSearch2Line } from "react-icons/ri";
import styles from "../../css/app_layout/navbar.module.css";
import { logout } from "../../actions/auth";
import { search } from "../../actions/searchAction";
const Navbar = ({ fieldLength, setFieldLength, open, setOpen, node }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSearch = (val) => {
    dispatch(search(val));
  };
  const [searchQuery, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState(false);

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

  useEffect(() => {
    // add when mounted
    document.addEventListener("mousedown", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    // console.log(e.target,node.current);
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setOpen(false);
  };

  const chevronClicked = () => {
    setOpen(!open);
  };

  //________________________________________________________________________________________________

  return (
    <div className={styles.navbar}>
      {/* <Link to="/login">Login</Link> */}
      {/* <Link to="/register">Register</Link> */}

      <div className={styles.leftPortion}>
        <div className={styles.logoContainer}>
          <img src={logo} />
          {/* <p className={styles.logoText}>
            <span>e</span>
            rypt
          </p> */}
        </div>
      </div>
      <div className={styles.rightPortion}>
      {/* <PencilIcon
                      className={styles.pencilIcon}
                      primaryColor={"#9baece"}
                      secondaryColor={"#9baece"}
                    /> */}
        <div
          className={
            searchMode ? styles.inputContainer : styles.inputContainerSmall
          }
        >
          {searchMode ? (
            <div className={styles.inputDiv}>
              <input
                className={styles.searchInput}
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
              <RiSearch2Line fontSize="16px" color="#00b7fd" />
            </div>
          )}
        </div>

        <div className={styles.userNamePopupWrapper}>
          <div className={styles.usernameContainer}>
            <div className={styles.nameLetterDiv}>
              {user.firstName ? <p>{user.firstName.charAt(0)}</p> : null}
            </div>

            <div className={styles.lgBtn} onClick={chevronClicked}>
              {!open ? (
                <HiChevronDown className={styles.downChevron} />
              ) : (
                <HiChevronUp className={styles.downChevron} />
              )}
            </div>
          </div>

          {/* {open && (
            <div className={`${styles.popUp}`}>
              <div className={styles.nameDiv}>
                <p>{user.firstName + " " + user.lastName}</p>
              </div>
              <div className={styles.lgOutBtnDiv} onClick={handleLogout}>
                <p>Log Out</p>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
