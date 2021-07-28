import React from "react";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import homeStyles from "../css/home.module.css";
import ContentDisplay from "./ContentDisplay";
import SidebarStyles from "../css/sidebar.module.css";
import navStyles from "../css/navbar.module.css";
import docStyles from "../css/document.module.css";
import { HiMenuAlt2, HiX } from "react-icons/hi";
import Sidebar from "./Sidebar";
import { logout } from "../actions/auth";

import Navbar from "./Navbar";
import TabBar from "./TabBar";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const node = useRef();
  const [maxImg, setMaxImg] = useState(null);
  const [open, setOpen] = useState(false);
  const [sidebarShow, setSidebarShow] = useState(true);
  const [heading, setHeading] = useState();
  const [fieldLength, setFieldLength] = useState(null);
  const user = useSelector((state) => state.user.user);


  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    dispatch(logout());
    history.push("/login");
  };

  const minimizeImg = () => {
    setMaxImg(null);
  };
  useEffect(() => {
    console.log(maxImg);
  }, [maxImg]);
  // useEffect(() => {
  //   // add when mounted
  //   document.addEventListener("mousedown", handleClick);
  //   // return function to be called when unmounted
  //   return () => {
  //     document.removeEventListener("mousedown", handleClick);
  //   };
  // }, []);

  // const handleClick = (e) => {
  //   if (node.current.contains(e.target)) {
  //     return;
  //   }
  //   setOpen(false);
  // };

  const toggleSidebar = () => {
    setSidebarShow(!sidebarShow);
  };
  console.log(open);
  return (
    <div className={homeStyles.homeComponent}>
      <div className={navStyles.popupWrapper} ref={node}>
        {open && (
          <div className={`${navStyles.popUp}`}>
            <div className={navStyles.nameDiv}>
              <p>{user.firstName + " " + user.lastName}</p>
            </div>
            <div className={navStyles.lgOutBtnDiv} onClick={handleLogout}>
              <p>Log Out</p>
            </div>
          </div>
        )}
      </div>

      {maxImg !== null ? (
        <div className={docStyles.maximizeImgDiv} onClick={minimizeImg}>
          <img className={docStyles.maxImage} src={maxImg}></img>
        </div>
      ) : null}

      {/* <Sidebar /> */}
      <Navbar
        fieldLength={fieldLength}
        setFieldLength={setFieldLength}
        open={open}
        setOpen={setOpen}
        node={node}
      />

      {/* <div className={homeStyles.hamburgerContainer} onClick={toggleSidebar}>
        {sidebarShow === true ? (
          <HiX className={SidebarStyles.hamXIcon} />
        ) : (
          <HiMenuAlt2 className={SidebarStyles.hamMenuIcon} />
        )}
      </div> */}

      {/* <div className={homeStyles.headingDiv}>
        <div className={homeStyles.headingTextWrapper}>
          {fieldLength > 0 && searchResultArray.length > 0 ? (
            <p className={homeStyles.headingText}>Search Results</p>
          ) : (
            <p className={homeStyles.headingText}>{heading}</p>
          )}
        </div>
      </div> */}
      <TabBar fieldLength={fieldLength} />

      <ContentDisplay
        heading={heading}
        setHeading={setHeading}
        fieldLength={fieldLength}
        setFieldLength={setFieldLength}
        maxImg={maxImg}
        setMaxImg={setMaxImg}
      />
    </div>
  );
};

export default Home;
