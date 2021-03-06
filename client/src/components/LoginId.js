import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteLoginId } from "../actions/loginInIdsAction";
import { loginIdFavToggle } from "../actions/loginInIdsAction";

import { CgTrashEmpty } from "react-icons/cg";
import { CircleSpinner } from "react-spinners-kit";

import {
  HiOutlinePencil,
  HiCheck,
  HiX,
  HiStar,
  HiOutlineStar,
} from "react-icons/hi";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { editLoginId } from "../actions/loginInIdsAction";

import LoginIdLogo from "./LoginIdLogo";
import styles from "../css/loginId.module.css";
import modalStyles from "../css/modal.module.css";

const LoginId = ({
  loginId,
  formMode,
  setFormMode,
  setEditButton,
  showEditButton,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [inEditMode, setInEditMode] = useState(false);
  const [loginData, setLoginData] = useState({
    website: "",
    username: "",
    password: "",
  });
  const loginIdDataToEdit = useSelector((state) =>
    editId ? state.logins.loginIds.find((l) => l._id === editId) : null
  );

  useEffect(() => {
    if (loginIdDataToEdit) {
      setLoginData(loginIdDataToEdit);
    }
  }, [loginIdDataToEdit]);

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user._id);
  const crud = useSelector((state) => state.crud);

  const handleFavToggle = (loginCardId, favValue) => {
    let isFav;
    if (favValue === false) {
      isFav = true;
    } else {
      isFav = false;
    }

    dispatch(loginIdFavToggle(loginCardId, isFav));
  };
  const save = (id) => {
    dispatch(editLoginId(id, loginData, userId));
  };

  const confirmDelete = (loginCardId) => {
    //NOTE : we are also sending deleteCard data as argument to add to activityAction
    dispatch(deleteLoginId(loginId, loginCardId, userId));
    setModalShow(!modalShow);
  };
  const handleDeleteClick = () => {
    setModalShow(!modalShow);
  };

  return (
    <div className={styles.cardContainer}>
      {/* ___C_R_U_D_____________________BUTTONS */}

      {inEditMode === true ? (
        <div className={styles.saveCancelDiv}>
          <div
            className={styles.cancelIcon}
            onClick={() => {
              setEditId(null);
              setInEditMode(false);
              setEditButton(true);
            }}
          >
            <HiX />
          </div>
          <div
            className={styles.saveIcon}
            onClick={() => {
              save(loginId._id);
              setInEditMode(false);
              setEditId(null);
              setEditButton(true);
            }}
          >
            <HiCheck />
          </div>
        </div>
      ) : (
        <>
          {showEditButton && inEditMode === false ? (
            <div className={styles.editDeleteDiv}>
              <div
                className={styles.editIcon}
                onClick={() => {
                  setEditButton(null);
                  setEditId(loginId._id);
                  setInEditMode(true);
                }}
              >
                {crud.inProcess &&
                crud.itemId === loginId._id &&
                crud.operation === "edit" ? (
                  <CircleSpinner size={10} color="gray" loading={true} />
                ) : (
                  <HiOutlinePencil />
                )}
              </div>
              <div
                className={styles.deleteIcon}
                onClick={() => {
                  handleDeleteClick();
                  setEditId(loginId._id);
                }}
              >
                {crud.inProcess &&
                crud.itemId === loginId._id &&
                crud.operation === "delete" ? (
                  <CircleSpinner size={10} color="gray" loading={true} />
                ) : (
                  <CgTrashEmpty />
                )}
              </div>
            </div>
          ) : null}
        </>
      )}

      {modalShow === true ? (
        <div className={modalStyles.modalContainer}>
          <div className={modalStyles.dialogDiv}>
            <p>Are you sure you want to delete this item permanently ?</p>
          </div>
          <div className={modalStyles.modalBtnDiv}>
            <div
              className={modalStyles.modalCancelBtn}
              onClick={() => {
                setModalShow(!modalShow);
              }}
            >
              <p>Cancel</p>
            </div>
            <div
              className={modalStyles.modalConfirmBtn}
              onClick={() => {
                confirmDelete(loginId._id);
              }}
            >
              {crud.inProcess && crud.itemId === loginId._id ? (
                <CircleSpinner size={12} color="white" loading={true} />
              ) : (
                <p>Sure, Delete ! </p>
              )}
            </div>
          </div>
        </div>
      ) : null}

      <div className={styles.logoDiv}>
        <LoginIdLogo website={loginId.website} />
      </div>

      <div className={styles.infoDiv}>
        <div className={styles.websiteDiv}>
          {inEditMode && loginId._id === editId ? (
            <input
              className={styles.editInput}
              value={loginData.website}
              onChange={(e) =>
                setLoginData({ ...loginData, website: e.target.value })
              }
            ></input>
          ) : (
            <p className={styles.websiteText} color="gray">
              {loginId.website}
            </p>
          )}
        </div>

        <div className={styles.usernameDiv}>
          <FaUserAlt fontSize="12px" color="gray" />

          {inEditMode && loginId._id === editId ? (
            <input
              className={styles.editInput}
              value={loginData.username}
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
            ></input>
          ) : (
            <p className={styles.passwordText}>{loginId.username}</p>
          )}
        </div>
        <div className={styles.passwordDiv}>
          <FaLock fontSize="12px" color="gray" />
          {inEditMode && loginId._id === editId ? (
            <input
              className={styles.editInput}
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            ></input>
          ) : (
            <p className={styles.passwordText}>{loginId.password}</p>
          )}
        </div>
      </div>
      {/* FAV TOGGLE_________________________________________ */}
      <button
        className={styles.favBtn}
        onClick={() => {
          handleFavToggle(loginId._id, loginId.isFavourite);
        }}
      >
        {loginId.isFavourite ? (
          <HiStar className={styles.favIcon} fontSize="18px" color="#2f89fc" />
        ) : (
          <HiOutlineStar className={styles.favIcon} fontSize="16px" />
        )}
      </button>
    </div>
  );
};
export default LoginId;
