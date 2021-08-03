import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { HiSearch, HiX, HiChevronDown, HiChevronUp } from "react-icons/hi";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import OutsideClickHandler from "react-outside-click-handler";

import { RiSettings3Fill, RiSearch2Line } from "react-icons/ri";
import { CgCloseO } from "react-icons/cg";
import styles from "../css/navbar.module.css";
import { logout } from "../actions/auth";
import { search } from "../actions/searchAction";
const Navbar = ({ fieldLength, setFieldLength, open, setOpen, node }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSearch = (val) => {
    dispatch(search(val));
  };

  // if (user.firstName) {
  //   console.log(user.firstName.charAt(0));
  // }

  const [searchQuery, setQuery] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // const node = useRef();

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
  // Logout Button Outside click functionality_____________________________
  // const [open, setOpen] = useState(false);

  // const handleClick=()=>{
  //   if(open){
  //     document.addEventListener('click',handleClickOutside,false)
  //   }else{
  //     document.addEventListener('click',handleClickOutside,false)

  //   }
  //   setOpen(!open)
  // }
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
