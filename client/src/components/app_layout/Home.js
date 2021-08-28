import React from "react";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import homeStyles from "../../css/app_layout/home.module.css";
import ContentDisplay from "./ContentDisplay";
import navStyles from "../../css/app_layout/navbar.module.css";
import { logout } from "../../actions/auth";
import Navbar from "./Navbar";
import TabBar from "./TabBar";
import MaximizeDoc from "../document/MaximizeDoc";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const node = useRef();
  const user = useSelector((state) => state.user.user);
  const [open, setOpen] = useState(false);
  const [heading, setHeading] = useState();
  const [fieldLength, setFieldLength] = useState();

  const [maximizeOrNot, setMaximizeOrNot] = useState(false);
  const [imageData, setImageData] = useState("");
  const [showHeaderFooter, setShowHeaderFooter] = useState(false);

  // for spinner while deleting document
  const [currDeletingDocId, setCurrentDeletingDocId] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("firstLogin");
    dispatch(logout(history));
    // history.push("/login");
  };

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

      {/* {maximizeOrNot && ( */}
      <MaximizeDoc
        maximizeOrNot={maximizeOrNot}
        setMaximizeOrNot={setMaximizeOrNot}
        imageData={imageData}
        setImageData={setImageData}
        showHeaderFooter={showHeaderFooter}
        setShowHeaderFooter={setShowHeaderFooter}
        fieldLength={fieldLength}
        setCurrentDeletingDocId={setCurrentDeletingDocId}
      />
      {/* )} */}

      {/* <Sidebar /> */}
      <Navbar
        fieldLength={fieldLength}
        setFieldLength={setFieldLength}
        open={open}
        setOpen={setOpen}
        node={node}
      />

      <TabBar fieldLength={fieldLength} />

      <ContentDisplay
        heading={heading}
        setHeading={setHeading}
        fieldLength={fieldLength}
        setFieldLength={setFieldLength}
        imageData={imageData}
        setImageData={setImageData}
        maximizeOrNot={maximizeOrNot}
        setMaximizeOrNot={setMaximizeOrNot}
        showHeaderFooter={showHeaderFooter}
        setShowHeaderFooter={setShowHeaderFooter}
        currDeletingDocId={currDeletingDocId}
      />
    </div>
  );
};

export default Home;
