import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editLoginId } from "../actions/loginInIdsAction";
import styles from "../css/loginIdComponent.module.css";
import modalStyles from "../css/modal.module.css";
import { deleteLoginId } from "../actions/loginInIdsAction";
import LoginIdLogo from "./LoginIdLogo";
import { loginIdFavToggle } from "../actions/loginInIdsAction";
import { CircleSpinner } from "react-spinners-kit";
import { motion } from "framer-motion";

// icons set
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Icon, InlineIcon } from "@iconify/react";
import { BsBookmarkPlus, BsBookmarkFill } from "react-icons/bs";
const variants = {
  start: {
    scaleX: 0,
  },
  end: {
    // opacity: 0,
    scaleY: 1,
  },
};
const LoginId = ({
  loginId,
  formMode,
  setFormMode,
  setEditButton,
  showEditButton,
  setCurrEditId,
  currEditId,
  index,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [oldData, setOldData] = useState(null);
  const [inEditMode, setInEditMode] = useState(false);
  const [oldLoginIdData, setOldLoginIdData] = useState();
  const [loginData, setLoginData] = useState({
    website: "",
    username: "",
    password: "",
  });
  const loginIdDataToEdit = useSelector((state) =>
    editId ? state.logins.loginIds.find((l) => l._id === editId) : null
  );

  const [currLoginIdData, setCurrLoginIdData] = useState();
  const loadState = useSelector((state) => state.loading);
  const { itemId, place, isLoading, process, success } = loadState;
  const searchResultArray = useSelector(
    (state) => state.searchResults.searchResults
  );

  useEffect(() => {
    if (loginIdDataToEdit) {
      setLoginData(loginIdDataToEdit);
    }
  }, [loginIdDataToEdit]);

  useEffect(() => {
    setCurrLoginIdData(loginId);
    setOldData(loginId);
    setOldLoginIdData(loginId);
  }, [loginId]);

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user._id);
  const crud = useSelector((state) => state.crud);

  const handleFavToggle = (loginCardId) => {
    // currLoginIdData
    var favValue = currLoginIdData.isFavourite;
    let isFav;
    if (favValue === false) {
      isFav = true;
    } else {
      isFav = false;
    }
    setCurrLoginIdData({ ...currLoginIdData, isFavourite: isFav });
    dispatch(loginIdFavToggle(loginCardId, isFav));
  };
  const save = (id) => {
    dispatch(
      editLoginId(
        id,
        oldLoginIdData,
        loginData,
        userId,
        searchResultArray.length
      )
    );
  };

  const confirmDelete = (loginCardId) => {
    //NOTE : We are also sending deleteCard data as an argument to add to activityAction
    dispatch(deleteLoginId(loginId, loginCardId, userId));
    setModalShow(!modalShow);
    setEditId(null);
  };
  const handleDeleteClick = () => {
    setModalShow(!modalShow);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1],
      }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={`${styles.loginIdContainer} ${
        inEditMode ? styles.loginIdContainerInEditMode : null
      }`}
    >
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
              {isLoading === true &&
              place === "loginId" &&
              itemId === loginId._id &&
              process === "delete" ? (
                <CircleSpinner size={15} color="#1072f1" loading={true} />
              ) : (
                <p>Sure, Delete ! </p>
              )}
            </div>
          </div>
        </div>
      ) : null}

      <div className={styles.logoWrapper}>
        <div className={styles.logoDiv}>
          <LoginIdLogo website={loginId.website} />
        </div>
      </div>
      <div className={styles.websiteWrapper}>
        <div className={styles.websiteDiv}>
          {inEditMode ? (
            <>
              <input
                list="websites"
                className={styles.inputField}
                value={loginData.website}
                onChange={(e) =>
                  setLoginData({ ...loginData, website: e.target.value })
                }
              />
              <datalist id="websites">
                <option value="Amazon" />
                <option value="Apple" />
                <option value="Apple Music" />
                <option value="Apple Pay" />
                <option value="Adobe" />
                <option value="AWS" />
                <option value="Airbnb" />
                <option value="Dribble" />
                <option value="Dell" />
                <option value="Dropbox" />
                <option value="Facebook" />
                <option value="Flipkart" />
                <option value="Google" />
                <option value="Gmail" />
                <option value="Google Pay" />
                <option value="Google Photos" />
                <option value="GeeksforGeeks" />
                <option value="Google Drive" />
                <option value="Github" />
                <option value="Heroku" />
                <option value="Hp" />
                <option value="Instagram" />
                <option value="Imdb" />
                <option value="LinkedIn" />
                <option value="Medium" />
                <option value="Microsoft" />
                <option value="Netflix" />
                <option value="Netlify" />
                <option value="Oracle" />
                <option value="PayPal" />
                <option value="Pinterest" />
                <option value="Phonepe" />
                <option value="Paytm" />
                <option value="Playstore" />
                <option value="Quora" />
                <option value="Samsung" />
                <option value="Slack" />
                <option value="Snapchat" />
                <option value="Spotify" />
                <option value="Stackoverflow" />
                <option value="Twitter" />
                <option value="Youtube" />
              </datalist>
            </>
          ) : (
            <p>{loginId.website}</p>
          )}
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        {(currEditId === loginId._id && inEditMode) || currEditId === null ? (
          <div className={styles.editBtnContainer}>
            {inEditMode ? (
              <>
                <div
                  className={styles.cancelIconDiv}
                  onClick={() => {
                    setInEditMode(false);
                    setCurrEditId(null);
                    setEditId(null);
                  }}
                >
                  <Icon
                    icon="heroicons-solid:x"
                    color="#9baece"
                    className={styles.cancelIcon}
                  />
                </div>
                <div
                  className={styles.checkIconDiv}
                  onClick={() => {
                    save(loginId._id);
                    setInEditMode(false);
                    setCurrEditId(null);
                  }}
                >
                  <Icon
                    icon="heroicons-solid:check"
                    color="#9baece"
                    className={styles.checkIcon}
                  />
                </div>
              </>
            ) : (
              <>
                <div
                  className={styles.editIconDiv}
                  onClick={() => {
                    setEditId(loginId._id);
                    setInEditMode(true);
                    setCurrEditId(loginId._id);
                  }}
                >
                  {isLoading === true &&
                  place === "loginId" &&
                  itemId === loginId._id &&
                  process === "edit" ? (
                    <CircleSpinner size={15} color="#1072f1" loading={true} />
                  ) : (
                    <Icon
                      icon="akar-icons:pencil"
                      className={styles.pencilIcon}
                      color="#9baece"
                    />
                  )}
                </div>
                <div
                  className={styles.deleteIconDiv}
                  onClick={() => {
                    handleDeleteClick();
                    setEditId(loginId._id);
                  }}
                >
                  {isLoading === true &&
                  place === "loginId" &&
                  itemId === loginId._id &&
                  process === "delete" ? (
                    <CircleSpinner size={15} color="#1072f1" loading={true} />
                  ) : (
                    <Icon
                      icon="feather:trash"
                      className={styles.trashIcon}
                      color="#9baece"
                    />
                  )}
                </div>
              </>
            )}
          </div>
        ) : null}

        <button
          className={styles.favBtn}
          onClick={() => {
            handleFavToggle(loginId._id, loginId.isFavourite);
          }}
        >
          {(
            currLoginIdData ? currLoginIdData.isFavourite : loginId.isFavourite
          ) ? (
            <BsBookmarkFill className={styles.favIcon} color="#00b7fd" />
          ) : (
            <BsBookmarkPlus className={styles.favIcon} color="#9baece" />
          )}
        </button>
      </div>
      <div className={styles.userNameWrapper}>
        <div className={styles.iconDiv}>
          <FaUserAlt />
        </div>
        <div className={styles.textDiv}>
          {inEditMode ? (
            <input
              className={styles.inputField}
              value={loginData.username}
              onChange={(e) =>
                setLoginData({ ...loginData, username: e.target.value })
              }
            ></input>
          ) : (
            <p>{loginId.username}</p>
          )}
        </div>
      </div>

      <div className={styles.passwordWrapper}>
        <div className={styles.iconDiv}>
          <FaLock />
        </div>
        <div className={styles.textDiv}>
          {inEditMode ? (
            <input
              className={styles.inputField}
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            ></input>
          ) : (
            <p>{loginId.password}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
export default LoginId;

// {inEditMode === true ? (
//   <div className={styles.saveCancelContainer}>
//     <div
//       className={styles.cancelIconDiv}
//       onClick={() => {
//         setEditId(null);
//         setInEditMode(false);
//         setEditButton(true);
//       }}
//     >
//       <HiX color="#9baece" className={styles.cancelIcon} />
//     </div>
//     <div
//       className={styles.saveIconDiv}
//       onClick={() => {
//         save(loginId._id);
//         setInEditMode(false);
//         setEditId(null);
//         setEditButton(true);
//       }}
//     >
//       <HiCheck color="#9baece" className={styles.checkIcon} />
//     </div>
//   </div>
// ) : (
//   <>
//     {showEditButton && inEditMode === false ? (
//       <div className={styles.editDeleteContainer}>
//         <div
//           className={styles.editIconDiv}
//           onClick={() => {
//             setEditButton(null);
//             setEditId(loginId._id);
//             setInEditMode(true);
//           }}
//         >
//           {crud.inProcess &&
//           crud.itemId === loginId._id &&
//           crud.operation === "edit" ? (
//             <CircleSpinner size={10} color="gray" loading={true} />
//           ) : (
//             <Icon
//               icon={pencilIcon}
//               className={styles.pencilIcon}
//               color="#9baece"
//             />
//           )}
//         </div>
//         <div
//           className={styles.deleteIconDiv}
//           onClick={() => {
//             handleDeleteClick();
//             setEditId(loginId._id);
//           }}
//         >
//           {crud.inProcess &&
//           crud.itemId === loginId._id &&
//           crud.operation === "delete" ? (
//             <CircleSpinner size={10} color="gray" loading={true} />
//           ) : (
//             <Icon
//               icon={trashEmpty}
//               className={styles.trashIcon}
//               color="#9baece"
//             />
//           )}
//         </div>
//       </div>
//     ) : null}
//   </>
// )}

// {modalShow === true ? (
//   <div className={modalStyles.modalContainer}>
//     <div className={modalStyles.dialogDiv}>
//       <p>Are you sure you want to delete this item permanently ?</p>
//     </div>
//     <div className={modalStyles.modalBtnDiv}>
//       <div
//         className={modalStyles.modalCancelBtn}
//         onClick={() => {
//           setModalShow(!modalShow);
//         }}
//       >
//         <p>Cancel</p>
//       </div>
//       <div
//         className={modalStyles.modalConfirmBtn}
//         onClick={() => {
//           confirmDelete(loginId._id);
//         }}
//       >
//         {crud.inProcess && crud.itemId === loginId._id ? (
//           <CircleSpinner size={12} color="white" loading={true} />
//         ) : (
//           <p>Sure, Delete ! </p>
//         )}
//       </div>
//     </div>
//   </div>
// ) : null}

// <div className={styles.logoDiv}>
//   <LoginIdLogo website={loginId.website} />
// </div>

// <div className={styles.infoDiv}>
//   <div className={styles.websiteDiv}>
//     {inEditMode && loginId._id === editId ? (
//       <>
//         <input
//           className={styles.websiteEditInput}
//           list="websites"
//           value={loginData.website}
//           onChange={(e) =>
//             setLoginData({ ...loginData, website: e.target.value })
//           }
//         />
//         <datalist id="websites">
//           <option value="Amazon" />
//           <option value="Apple" />
//           <option value="Apple Music" />
//           <option value="Apple Pay" />
//           <option value="Adobe" />
//           <option value="AWS" />
//           <option value="Airbnb" />
//           <option value="Dribble" />
//           <option value="Dell" />
//           <option value="Dropbox" />
//           <option value="Facebook" />
//           <option value="Flipkart" />
//           <option value="Google" />
//           <option value="Gmail" />
//           <option value="Google Pay" />
//           <option value="Google Photos" />
//           <option value="GeeksforGeeks" />
//           <option value="Google Drive" />
//           <option value="Github" />
//           <option value="Heroku" />
//           <option value="Hp" />
//           <option value="Instagram" />
//           <option value="Imdb" />
//           <option value="LinkedIn" />
//           <option value="Medium" />
//           <option value="Microsoft" />
//           <option value="Netflix" />
//           <option value="Netlify" />
//           <option value="Oracle" />
//           <option value="PayPal" />
//           <option value="Pinterest" />
//           <option value="Phonepe" />
//           <option value="Paytm" />
//           <option value="Playstore" />
//           <option value="Quora" />
//           <option value="Samsung" />
//           <option value="Slack" />
//           <option value="Snapchat" />
//           <option value="Spotify" />
//           <option value="Stackoverflow" />
//           <option value="Twitter" />
//           <option value="Youtube" />
//         </datalist>
//       </>
//     ) : (
//       <p className={styles.websiteText} color="gray">
//         {loginId.website}
//       </p>
//     )}
//   </div>

//   <div className={styles.usernameDiv}>
//     <div className={styles.iconDiv}>
//       <FaUserAlt />
//     </div>
//     <div className={styles.textDiv}>
//       {inEditMode && loginId._id === editId ? (
//         <input
//           className={styles.editInput}
//           value={loginData.username}
//           onChange={(e) =>
//             setLoginData({ ...loginData, username: e.target.value })
//           }
//         ></input>
//       ) : (
//         <p className={styles.passwordText}>{loginId.username}</p>
//       )}
//     </div>
//   </div>
//   <div className={styles.passwordDiv}>
//     <div className={styles.iconDiv}>
//       <FaLock />
//     </div>
//     <div className={styles.textDiv}>
//       {inEditMode && loginId._id === editId ? (
//         <input
//           className={styles.editInput}
//           value={loginData.password}
//           onChange={(e) =>
//             setLoginData({ ...loginData, password: e.target.value })
//           }
//         ></input>
//       ) : (
//         <p className={styles.passwordText}>{loginId.password}</p>
//       )}
//     </div>
//   </div>
// </div>
// {/* FAV TOGGLE_________________________________________ */}
// <button
//   className={styles.favBtn}
//   onClick={() => {
//     handleFavToggle(loginId._id, loginId.isFavourite);
//   }}
// >
//   {(
//     currLoginIdData ? currLoginIdData.isFavourite : loginId.isFavourite
//   ) ? (
//     <BsBookmarkFill className={styles.favIcon} color="#00b7fd" />
//   ) : (
//     <BsBookmarkPlus className={styles.favIcon} color="#9baece" />
//   )}
// </button>

// _____________________________________________________________________________________

// <HiStar className={styles.favIcon} fontSize="18px" color="#4CD7F6" />
{
  /* <HiOutlineStar
className={styles.favIcon}
fontSize="16px"
color="#9baece"
/> */
}
