import React from "react";
import { useState, useRef, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import homeStyles from "../../css/app_layout/home.module.css";
import ContentDisplay from "./ContentDisplay";
import navStyles from "../../css/app_layout/navbar.module.css";
import contentDisplayStyles from "../../css/app_layout/contentDisplay.module.css";

import { logout } from "../../actions/auth";
import Navbar from "./Navbar";
import TabBar from "./TabBar";
import MaximizeDoc from "../document/MaximizeDoc";
import { CircleSpinner } from "react-spinners-kit";
// const MaximizeDoc = lazy(() => import("../document/MaximizeDoc"));

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
  const loadState = useSelector((state) => state.loading);
  const { place, isLoading } = loadState;

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
              {place === "logout" && isLoading === true ? (
                <CircleSpinner size={15} color="white" loading={true} />
              ) : (
                <p>Log Out</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* <Suspense
        fallback={
          <div className={contentDisplayStyles.lazySuspenseFallDocMaxMizeDiv}>
            <CircleSpinner size={12} color="gray" loading={true} />
          </div>
        }
      >
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
      </Suspense> */}
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
