import React from "react";
import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
// import LoginIdForm from "./LoginIdForm";
import LoginId from "./LoginId";
import LoginIdSkeleton from "../skeletons/LoginIdSkeleton";
import styles from "../../css/loginId/loginList.module.css";
import noContentStyles from "../../css/document/noContentMessage.module.css";
import btnStyles from "../../css/add_button/buttons.module.css";
import { FiPlusCircle } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import { FixedSizeList as List } from "react-window";
import { CircleSpinner } from "react-spinners-kit";
const LoginIdForm = lazy(() => import("./LoginIdForm"));

const LoginIdsList = ({ loginIds, currentId, setCurrentId, setHeading }) => {
  const [formMode, setFormMode] = useState(false);
  const [showEditButton, setEditButton] = useState(true);
  const [currEditId, setCurrEditId] = useState(null);
  const loadState = useSelector((state) => state.loading);
  const { place, isLoading, loginsFetching } = loadState;

  useEffect(() => {
    setHeading("LoginIds");
  }, []);

  // SCROLLING BUTTON HIDE__
  const node = useRef();
  var timeOut = null;
  const [isScrolling, setIsScrolling] = useState(false);
  useEffect(() => {
    if (node.current != null) {
      node.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (node.current != null) {
        node.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handleScroll = (e) => {
    setIsScrolling(true);
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      setIsScrolling(false);
    }, 200);
  };

  const formToggle = () => {
    setFormMode(!formMode);
  };

  return (
    <div className={styles.loginsList}>
      <div className={styles.contentContainer} ref={node}>
        {/* <LoginIdSkeleton /> */}

        {loginsFetching === true && loginIds.length < 1 ? (
          <>
            <LoginIdSkeleton />
            <LoginIdSkeleton />
            <LoginIdSkeleton />
            <LoginIdSkeleton />
            <LoginIdSkeleton />
          </>
        ) : loginsFetching === false && loginIds.length < 1 ? (
          <div className={noContentStyles.messageContainer}>
            <p>No Logins Added</p>

            <div className={noContentStyles.footerDIv}>
              Click
              <FiPlusCircle className={noContentStyles.icon} fontSize="19px" />
              to add
            </div>
          </div>
        ) : (
          loginsFetching === false &&
          loginIds.length > 1 && (
            <>
              {loginIds.map((loginId, index) => (
                <React.Fragment key={loginId._id}>
                  <LoginId
                    index={index}
                    loginId={loginId}
                    setCurrentId={setCurrentId}
                    formMode={formMode}
                    setFormMode={setFormMode}
                    setEditButton={setEditButton}
                    showEditButton={showEditButton}
                    setCurrEditId={setCurrEditId}
                    currEditId={currEditId}
                  />
                </React.Fragment>
              ))}
            </>
          )
        )}
        <Suspense
          fallback={
            <div>
              <CircleSpinner size={12} color="gray" loading={true} />
            </div>
          }
        >
          <LoginIdForm
            currentId={currentId}
            setCurrentId={setCurrentId}
            formMode={formMode}
            setFormMode={setFormMode}
          />
        </Suspense>

        {formMode === false ? (
          <div
            className={
              isScrolling === false
                ? btnStyles.addBtnWrapper
                : btnStyles.addBtnWrapperHidden
            }
            onClick={formToggle}
          >
            <div className={btnStyles.addBtnIconDIv}>
              <HiPlus />
            </div>
            <div className={btnStyles.addBtnTextDiv}>
              <p>Add</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LoginIdsList;
